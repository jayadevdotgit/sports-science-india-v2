import type { Metadata } from "next";
import { bodyData } from "@/components/ecosystem/bodyData";
import { servicesList } from "@/components/services/services";

export const site = {
  name: "Sports Science India",
  url: "https://www.sportsscienceindia.org",
  description:
    "India's leading sports medicine and sports science centre in Bhubaneswar — sports injury treatment, rehabilitation, performance analysis and athlete development.",
  image: "/images/logo/ssi-logo.png",
  phone: "+91 73813 80010",
  phoneAlt: "+91 82803 81010",
  email: "sportsscienceindia.office@gmail.com",
  address: {
    street: "A17/1A, Surya Nagar",
    city: "Bhubaneswar",
    state: "Odisha",
    postalCode: "751003",
    country: "India",
  },
};

export function absoluteUrl(path: string): string {
  if (!path) return site.url;
  return path.startsWith("http") ? path : `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  keywords?: string[];
};

function slugOf(link: string): string {
  return link.split("/").filter(Boolean).pop() || "";
}

export function serviceSeo(slug: string): { title: string; description: string } {
  const body = bodyData.find((item) => slugOf(item.link) === slug);
  if (body) {
    return {
      title: body.title,
      description: body.description,
    };
  }
  const service = servicesList.find((item) => slugOf(item.link) === slug);
  if (service) {
    return {
      title: service.title,
      description: service.description,
    };
  }
  return { title: slug.replace(/-/g, " "), description: "Sports science service at Sports Science India, Bhubaneswar." };
}

export function serviceMetadata(slug: string, path: string): Metadata {
  const { title, description } = serviceSeo(slug);
  return buildMetadata({
    title,
    description: `${description} ${site.name}, Bhubaneswar.`,
    path,
    keywords: [title, "sports science", "sports medicine", "Bhubaneswar", "physiotherapy"],
  });
}

export function buildMetadata({
  title,
  description,
  path,
  image = site.image,
  noindex = false,
  keywords,
}: SeoOptions): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(site.url),
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: canonical,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
