import PlatformPage from "@/components/network/PlatformPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SSI Sports Connect",
  description:
    "Connecting athletes, coaches, academies and sports professionals across India through the SSI Sports Connect community.",
  path: "/sports-connect",
});

export default function SportsConnectPage() {
  return <PlatformPage id="connect" btnClassName="border-2 border-black !text-black [text-shadow:none]" cta={{ label: "Contact Us", href: "/contact" }} />;
}