import type { MetadataRoute } from "next";
import { site } from "@/lib/seo";
import { platforms } from "@/data/platforms";
import { servicesList } from "@/components/services/services";
import { bodyData } from "@/components/ecosystem/bodyData";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/experts",
  "/technology",
  "/booking",
  "/clinic",
  "/ssi-sports",
  "/awards",
  "/fanzine",
  "/sports-connect",
  "/young-athlete-program",
  "/foundation",
  "/sports-conclave",
  "/arthroscopy-conference",
];

function slugOf(link: string): string {
  return link.split("/").filter(Boolean).pop() || "";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = new Set<string>(STATIC_ROUTES);

  platforms.forEach((p) => {
    if (p.link) routes.add(p.link);
  });

  servicesList.forEach((s) => {
    if (s.link) routes.add(s.link);
  });

  bodyData.forEach((b) => {
    if (b.link) routes.add(b.link);
  });

  return [...routes].map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
