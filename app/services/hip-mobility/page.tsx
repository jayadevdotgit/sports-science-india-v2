import HumanPerformancePage from "@/components/humanPerformance/HumanPerformancePage";
import { serviceMetadata } from "@/lib/seo";

export const metadata = serviceMetadata("hip-mobility", "/services/hip-mobility");

export default function HipMobilityPage() {
  return <HumanPerformancePage slug="hip-mobility" />;
}