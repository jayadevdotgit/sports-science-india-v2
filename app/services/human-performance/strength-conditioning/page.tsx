import HumanPerformancePage from "@/components/humanPerformance/HumanPerformancePage";
import { serviceMetadata } from "@/lib/seo";

export const metadata = serviceMetadata("strength-conditioning", "/services/human-performance/strength-conditioning");

export default function HPStrengthConditioningPage() {
  return <HumanPerformancePage slug="strength-conditioning" />;
}