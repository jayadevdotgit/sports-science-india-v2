import PlatformPage from "@/components/network/PlatformPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Young Athlete Program (U10-U18)",
  description:
    "Developing tomorrow's champions with sports science and long-term athlete development at the SSI Young Athlete Program in Bhubaneswar.",
  path: "/young-athlete-program",
});

export default function YoungAthleteProgramPage() {
  return <PlatformPage id="yap" btnClassName="border-2 border-black !text-black [text-shadow:none]" cta={{ label: "Contact Us", href: "/contact" }} />;
}