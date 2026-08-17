import PlatformPage from "@/components/network/PlatformPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SSI Foundation",
  description:
    "Promoting sports education, youth development and community wellness across Odisha through the SSI Foundation.",
  path: "/foundation",
});

export default function FoundationPage() {
  return (
    <PlatformPage
      id="foundation"
      btnClassName="border-2 border-black !text-black [text-shadow:none]"
      cta={{ label: "Contact Us", href: "/contact" }}
      specialCta={{
        label: "Visit Foundation Website",
        href: "https://ssifoundation.org/",
        color: "emerald",
        textClass: "!text-black [text-shadow:none]",
      }}
    />
  );
}