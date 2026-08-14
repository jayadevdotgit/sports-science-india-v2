import PlatformPage from "@/components/network/PlatformPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sports Injury Medicine Centre | SSI Clinic",
  description:
    "Advanced diagnosis, physiotherapy, rehabilitation and return-to-play programs for athletes at the Sports Injury Medicine Centre in Bhubaneswar.",
  path: "/clinic",
});

export default function ClinicPage() {
  return (
    <PlatformPage
      id="clinic"
      btnClassName="!text-black [text-shadow:none]"
      cta={{ label: "Contact Us", href: "/contact" }}
    />
  );
}