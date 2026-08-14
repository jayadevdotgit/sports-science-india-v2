import PlatformPage from "@/components/network/PlatformPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SSI Fanzine | Sports Science Publication",
  description:
    "India's sports science publication featuring research, athlete stories and expert insights from Sports Science India.",
  path: "/fanzine",
});

export default function FanzinePage() {
  return <PlatformPage id="fanzine" cta={{ label: "Contact Us", href: "/contact" }} />;
}