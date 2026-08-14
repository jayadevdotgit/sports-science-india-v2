import HumanPerformancePage from "@/components/humanPerformance/HumanPerformancePage";
import { serviceMetadata } from "@/lib/seo";

export const metadata = serviceMetadata("biomechanics", "/services/biomechanics");

export default function BiomechanicsPage() {
  return <HumanPerformancePage slug="biomechanics" />;
}