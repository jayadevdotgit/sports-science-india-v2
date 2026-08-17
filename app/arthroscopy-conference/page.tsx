import PlatformPage from "@/components/network/PlatformPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SSI International Arthroscopy Conference",
  description:
    "Global platform for arthroscopy surgeons and sports medicine professionals to share the latest advances in surgical technique.",
  path: "/arthroscopy-conference",
});

export default function ArthroscopyConferencePage() {
  return (
    <PlatformPage
      id="arthroscopy"
      cta={{ label: "Contact Us", href: "/contact" }}
      specialCta={{
        label: "Visit Conference Website",
        href: "https://www.ssiarthroscopyconference.in/",
        color: "rose",
        textClass: "text-white [text-shadow:none]",
      }}
    />
  );
}