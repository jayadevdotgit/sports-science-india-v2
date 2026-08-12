#!/usr/bin/env node
/**
 * collect-content.mjs
 *
 * Scrapes the running Sports Science India website and collects its content
 * into data/site-content.json so VIVI (the AI coach) can load the live site
 * content as reference data.
 *
 * Usage:
 *   node scripts/collect-content.mjs
 *   (optional) BASE_URL=http://localhost:3000 node scripts/collect-content.mjs
 *
 * Requires: the site dev/prod server running (default http://localhost:3000).
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/+$/, "");
const OUTPUT = join(ROOT, "data", "site-content.json");

// ---------------------------------------------------------------------------
// Routes to collect
// ---------------------------------------------------------------------------

const STATIC_ROUTES = ["", "technology", "experts", "booking", "contact", "admin"];

// Derive every live service page slug from the source files that define them.
const SERVICE_SOURCE_FILES = [
  "./components/services/services.tsx",
  "./components/ecosystem/bodyData.ts",
  "./components/services/servicePages.ts",
  "./components/ecosystem/serviceDetails.ts",
];

function collectServiceSlugs() {
  const slugs = new Set();
  for (const rel of SERVICE_SOURCE_FILES) {
    const src = readFileSync(join(ROOT, rel), "utf8");
    for (const m of src.matchAll(/link:\s*["'`]\/services\/([^"'`]+)["'`]/g)) {
      slugs.add(m[1]);
    }
    for (const m of src.matchAll(/slug:\s*["']([^"']+)["']/g)) {
      slugs.add(m[1]);
    }
  }
  return [...slugs].sort();
}

function buildRoutes() {
  const routes = STATIC_ROUTES.map((r) => ({ path: r, name: r || "home" }));
  for (const slug of collectServiceSlugs()) {
    routes.push({ path: `services/${slug}`, name: `service-${slug}` });
  }
  return routes;
}

// ---------------------------------------------------------------------------
// HTML -> structured content
// ---------------------------------------------------------------------------

const ENTITIES = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
  "&#39;": "'", "&apos;": "'", "&nbsp;": " ", "&ndash;": "-", "&mdash;": "-",
};

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&(amp|lt|gt|quot|#39|apos|nbsp|ndash|mdash);/g, (m) => ENTITIES[m] ?? m);
}

const BLOCK_CLOSE = new RegExp(
  "<\\/(?:h[1-6]|p|li|div|section|article|header|footer|nav|main|aside|ul|ol|tr|table|figcaption|blockquote|dt|dd)>",
  "gi"
);

function toTextLines(html) {
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(BLOCK_CLOSE, "\n")
    .replace(/<[^>]*>/g, " ");
  const lines = decodeEntities(cleaned)
    .split(/\n+/)
    .map((l) => l.replace(/[\u00a0\t ]+/g, " ").trim())
    .filter((l) => l.length > 1);
  return lines;
}

function dedupeConsecutive(lines) {
  const out = [];
  for (const line of lines) {
    if (out[out.length - 1] !== line) out.push(line);
  }
  return out;
}

function firstAttr(html, name) {
  const m = html.match(new RegExp(`<meta[^>]+name=["']\\s*${name}\\s*["'][^>]*>`, "i")) ||
           html.match(new RegExp(`<meta[^>]+property=["']\\s*${name}\\s*["'][^>]*>`, "i"));
  if (!m) return "";
  return decodeEntities(m[0].match(/content=["']([^"']*)["']/i)?.[1] ?? "").trim();
}

function extractContent(html) {
  const title = decodeEntities(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "")
    .trim();

  const headings = [];
  for (const m of html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    const text = decodeEntities(m[2].replace(/<[^>]*>/g, " "))
      .replace(/\s+/g, " ")
      .trim();
    if (text) headings.push({ level: Number(m[1]), text });
  }

  const paragraphs = [];
  for (const m of html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const text = decodeEntities(m[1].replace(/<[^>]*>/g, " "))
      .replace(/\s+/g, " ")
      .trim();
    if (text) paragraphs.push(text);
  }

  const links = [];
  const seenLinks = new Set();
  for (const m of html.matchAll(/<a[^>]+href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = m[1];
    const text = decodeEntities(m[2].replace(/<[^>]*>/g, " "))
      .replace(/\s+/g, " ")
      .trim();
    if (text && !seenLinks.has(`${text}|${href}`)) {
      seenLinks.add(`${text}|${href}`);
      const isInternal = href.startsWith("/") || href.startsWith("#");
      links.push({ text, href, internal: isInternal });
    }
  }

  const images = [...html.matchAll(/<img[^>]+alt=["']([^"']*)["']/gi)]
    .map((m) => decodeEntities(m[1]).trim())
    .filter(Boolean);

  const bodyLines = dedupeConsecutive(toTextLines(html));

  return {
    title,
    metaDescription: firstAttr(html, "description"),
    ogTitle: firstAttr(html, "og:title") || firstAttr(html, "og:title"),
    headings,
    paragraphs,
    links,
    images,
    bodyText: bodyLines.join("\n"),
  };
}

// ---------------------------------------------------------------------------
// Fetching
// ---------------------------------------------------------------------------

async function fetchPage(route) {
  const url = `${BASE_URL}/${route.path}`;
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "vivi-site-content-collector/1.0" },
      redirect: "follow",
    });
    const status = res.status;
    const html = await res.text();
    if (status !== 200) {
      return { route: route.path, name: route.name, status, error: `HTTP ${status}` };
    }
    return { route: route.path, name: route.name, status, ...extractContent(html) };
  } catch (err) {
    return { route: route.path, name: route.name, status: 0, error: String(err?.message ?? err) };
  }
}

async function run() {
  const routes = buildRoutes();
  console.log(`Collecting ${routes.length} pages from ${BASE_URL} ...`);

  const concurrency = 6;
  const results = [];
  for (let i = 0; i < routes.length; i += concurrency) {
    const batch = routes.slice(i, i + concurrency);
    const settled = await Promise.all(batch.map(fetchPage));
    for (const r of settled) {
      results.push(r);
      if (r.error) console.warn(`  [warn] /${r.route}: ${r.error}`);
      else console.log(`  [ok]   /${r.route}: ${r.title || "(no title)"}`);
    }
  }

  const okPages = results.filter((r) => !r.error);
  const dataset = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalPages: okPages.length,
    pages: okPages,
  };

  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, JSON.stringify(dataset, null, 2), "utf8");

  console.log(`\nDone. ${okPages.length}/${routes.length} pages -> ${OUTPUT}`);
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});