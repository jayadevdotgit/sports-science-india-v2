import HumanPerformancePage from "@/components/humanPerformance/HumanPerformancePage";
import { serviceMetadata } from "@/lib/seo";

export const metadata = serviceMetadata("wrist-function", "/services/wrist-function");

export default function WristFunctionPage() {
  return <HumanPerformancePage slug="wrist-function" />;
}