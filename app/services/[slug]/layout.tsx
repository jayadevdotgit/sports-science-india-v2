import type { Metadata } from "next";
import { serviceMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return serviceMetadata(slug, `/services/${slug}`);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
