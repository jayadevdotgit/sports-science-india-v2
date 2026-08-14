import HumanPerformancePage from "@/components/humanPerformance/HumanPerformancePage";
import { serviceMetadata } from "@/lib/seo";

export const metadata = serviceMetadata("core-stability", "/services/core-stability");

export default function CoreStabilityPage() {
  return <HumanPerformancePage slug="core-stability" />;
}