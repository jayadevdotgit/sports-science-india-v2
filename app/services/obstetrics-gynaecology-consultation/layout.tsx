import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Obstetrics & Gynaecology Consultation",
  description:
    "Specialist obstetrics and gynaecology consultation with Dr. Nisha Kaushik Patnaik at Sports Science India, Bhubaneswar.",
  path: "/services/obstetrics-gynaecology-consultation",
  keywords: [
    "obstetrician Bhubaneswar",
    "gynaecologist Odisha",
    "pregnancy consultation",
    "women's health",
    "pre-post natal",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
