import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pre & Post Natal Rehab",
  description:
    "Safe exercise and recovery during and after pregnancy at Sports Science India, Bhubaneswar — core and pelvic health specialists.",
  path: "/services/pre-post-natal-rehab",
  keywords: [
    "postnatal physiotherapy",
    "antenatal exercise",
    "pregnancy rehab",
    "pelvic health Bhubaneswar",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
