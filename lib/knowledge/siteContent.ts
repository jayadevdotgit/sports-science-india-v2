import siteContent from "../../data/site-content.json";

type CollectedPage = {
  route: string;
  name?: string;
  status: number;
  error?: string;
  title?: string;
  metaDescription?: string;
  headings?: { level: number; text: string }[];
  paragraphs?: string[];
  links?: { text: string; href: string; internal: boolean }[];
  images?: string[];
  bodyText?: string;
};

type Dataset = {
  generatedAt?: string;
  baseUrl?: string;
  totalPages?: number;
  pages: CollectedPage[];
};

const dataset = siteContent as Dataset;

const pages = (dataset.pages ?? []).filter((p) => !p.error);
const byRoute = new Map(pages.map((p) => [p.route, p]));

// Cross-page chrome (nav / footer / loader / buttons) that adds no unique
// meaning and only bloats the prompt if repeated on every page.
const BOILERPLATE = new Set([
  "home",
  "ecosystem",
  "services",
  "technology",
  "experts",
  "contact",
  "login",
  "logout",
  "book assessment",
  "explore ecosystem",
  "learn more",
  "read more",
  "view all reviews on google",
  "all rights reserved",
  "preparing your performance...",
]);

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "of", "to", "for", "on", "in", "with",
  "is", "are", "was", "were", "be", "been", "do", "does", "did", "can", "could",
  "would", "should", "will", "what", "when", "where", "which", "who", "how",
  "you", "your", "i", "my", "me", "we", "our", "us", "at", "by", "from", "have",
  "has", "had", "not", "about", "please", "tell", "show", "want", "need", "get",
]);

function tokenize(text: string): string[] {
  return text.toLowerCase().match(/[a-z0-9]{2,}/g) ?? [];
}

function keywords(text: string): Set<string> {
  return new Set(tokenize(text).filter((w) => !STOPWORDS.has(w)));
}

function cleanParagraphs(list: string[], cap: number): string {
  const meaningful = list.filter((t) => !BOILERPLATE.has(t.trim().toLowerCase()));
  return meaningful
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .slice(0, cap);
}

function formatPage(p: CollectedPage, includeBody: boolean, bodyCap: number): string {
  const out: string[] = [];
  out.push(`## Page: /${p.route}`);

  if (p.title) out.push(`Title: ${p.title}`);
  if (p.metaDescription) out.push(`Meta: ${p.metaDescription}`);
  if (p.error) return [...out, `(unavailable: ${p.error})`].join("\n");

  const headings = (p.headings ?? [])
    .filter((h) => h.level <= 2)
    .map((h) => `- ${h.text}`)
    .slice(0, 10);
  if (headings.length) out.push(`Headings:`, ...headings);

  if (includeBody) {
    const paras = cleanParagraphs(p.paragraphs ?? [], bodyCap);
    const body = (p.bodyText ?? "").replace(/\s+/g, " ").slice(0, bodyCap);
    const content = paras.length > 40 ? paras : body;
    if (content) out.push(`Content: ${content}`);
  }

  return out.join("\n");
}

// ---------------------------------------------------------------------------
// 1) Compact index included in VIVI's static system prompt.
// ---------------------------------------------------------------------------
export const SITE_CONTENT_INDEX =
  pages.length > 0
    ? [
        `LIVE WEBSITE CONTENT INDEX (collected ${dataset.generatedAt ?? "recently"} from ${dataset.baseUrl ?? "the site"}; ${pages.length} pages). More details are looked up on demand per question:`,
        "",
        ...pages.map((p) => formatPage(p, false, 0)),
      ].join("\n").slice(0, 16000)
    : "Live website content index unavailable.";

// Backwards-compatible alias (kept small so it never bloats the prompt).
export const SITE_CONTENT_INFO = SITE_CONTENT_INDEX;

// ---------------------------------------------------------------------------
// 2) On-demand retrieval used by the chat API: returns the most relevant
//    page excerpts for a user query, bounded so a single Groq request stays
//    within the 12k TPM limit of the free tier.
// ---------------------------------------------------------------------------
export function retrieveSiteContent(
  query: string,
  maxChars = 9000
): string {
  const qKeywords = keywords(query);
  if (qKeywords.size === 0) return "";

  const scored = pages
    .map((p) => {
      const title = (p.title ?? "").toLowerCase();
      const headings = (p.headings ?? []).map((h) => h.text.toLowerCase()).join(" ");
      const paras = (p.paragraphs ?? []).join(" ").toLowerCase();
      const haystack = `${title} ${headings} ${p.metaDescription ?? ""} ${paras}`;
      let score = 0;
      for (const kw of qKeywords) {
        let count = 0;
        for (let i = 0; i < haystack.length; i++) {
          const idx = haystack.indexOf(kw, i);
          if (idx === -1) break;
          count++;
          i = idx + kw.length - 1;
        }
        if (count > 0) {
          score += count + (title.includes(kw) ? 3 : 0);
        }
      }
      return { p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return "";

  const blocks: string[] = [];
  let used = 0;
  for (const { p, score } of scored) {
    const block = formatPage(p, true, Math.min(900, maxChars));
    const cost = block.length + 2;
    if (used + cost > maxChars) {
      if (blocks.length === 0 && used + cost > maxChars) {
        blocks.push(block.slice(0, Math.max(200, maxChars - used)));
      }
      break;
    }
    blocks.push(block);
    used += cost;
    if (score <= 1 && blocks.length >= 1) break;
    if (blocks.length >= 5) break;
  }

  if (blocks.length === 0) return "";

  return [
    `RELEVANT LIVE SITE CONTENT for the visitor's question:`,
    "",
    ...blocks,
  ].join("\n\n");
}

export function hasLiveContent(): boolean {
  return pages.length > 0;
}

export function getPage(route: string): CollectedPage | undefined {
  return byRoute.get(route);
}