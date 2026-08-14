import PlatformPage from "@/components/network/PlatformPage";

export default function SportsConnectPage() {
  return <PlatformPage id="connect" btnClassName="border-2 border-black !text-black [text-shadow:none]" cta={{ label: "Contact Us", href: "/contact" }} />;
}