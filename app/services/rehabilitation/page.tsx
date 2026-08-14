import HumanPerformancePage from "@/components/humanPerformance/HumanPerformancePage";
import { serviceMetadata } from "@/lib/seo";

export const metadata = serviceMetadata("rehabilitation", "/services/rehabilitation");

export default function RehabilitationPage() {
  return <HumanPerformancePage slug="rehabilitation" />;
}