import HumanPerformancePage from "@/components/humanPerformance/HumanPerformancePage";
import { serviceMetadata } from "@/lib/seo";

export const metadata = serviceMetadata("neck-care", "/services/neck-care");

export default function NeckCarePage() {
  return <HumanPerformancePage slug="neck-care" />;
}