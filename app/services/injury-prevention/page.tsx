import HumanPerformancePage from "@/components/humanPerformance/HumanPerformancePage";
import { serviceMetadata } from "@/lib/seo";

export const metadata = serviceMetadata("injury-prevention", "/services/injury-prevention");

export default function InjuryPreventionPage() {
  return <HumanPerformancePage slug="injury-prevention" />;
}