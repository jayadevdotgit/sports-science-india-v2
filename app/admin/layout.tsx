import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admin",
  description: "Admin dashboard for Sports Science India bookings.",
  path: "/admin",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
