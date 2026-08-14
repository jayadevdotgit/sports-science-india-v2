import HumanPerformancePage from "@/components/humanPerformance/HumanPerformancePage";
import { serviceMetadata } from "@/lib/seo";

export const metadata = serviceMetadata("elbow-performance", "/services/elbow-performance");

export default function ElbowPerformancePage() {
  return <HumanPerformancePage slug="elbow-performance" />;
}