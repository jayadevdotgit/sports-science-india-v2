import PlatformPage from "@/components/network/PlatformPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SSI Awards",
  description:
    "Recognising excellence in sports through prestigious awards and annual celebrations by Sports Science India.",
  path: "/awards",
});

export default function AwardsPage() {
  return (
    <PlatformPage
      id="awards"
      btnClassName="border-2 border-black !text-black [text-shadow:none]"
      cta={{ label: "Contact Us", href: "/contact" }}
      specialCta={{ label: "Visit SSI Awards Website", href: "https://www.ssisportsawards.com/" }}
    />
  );
}