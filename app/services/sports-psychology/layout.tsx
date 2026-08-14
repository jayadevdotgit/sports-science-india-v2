import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sports Psychology",
  description:
    "Improve focus, confidence, reaction time and decision making under pressure with sports psychology at Sports Science India, Bhubaneswar.",
  path: "/services/sports-psychology",
  keywords: [
    "sports psychologist Bhubaneswar",
    "mental performance training",
    "athlete mindset coaching",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
