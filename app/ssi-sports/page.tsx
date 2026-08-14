import PlatformPage from "@/components/network/PlatformPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SSI Sports | Elite Athlete Development",
  description:
    "Athlete development, performance enhancement and elite sports training programs at SSI Sports by Sports Science India.",
  path: "/ssi-sports",
});

export default function SsiSportsPage() {
  return <PlatformPage id="sports" cta={{ label: "Contact Us", href: "/contact" }} />;
}