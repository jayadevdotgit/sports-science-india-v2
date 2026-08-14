import PlatformPage from "@/components/network/PlatformPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SSI Sports Conclave",
  description:
    "India's premier sports science conference bringing together experts, athletes and thought leaders at the SSI Sports Conclave.",
  path: "/sports-conclave",
});

export default function SportsConclavePage() {
  return <PlatformPage id="conclave" btnClassName="border-2 border-black !text-black [text-shadow:none]" cta={{ label: "Contact Us", href: "/contact" }} />;
}