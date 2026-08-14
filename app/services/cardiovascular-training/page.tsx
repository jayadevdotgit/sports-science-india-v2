import HumanPerformancePage from "@/components/humanPerformance/HumanPerformancePage";
import { serviceMetadata } from "@/lib/seo";

export const metadata = serviceMetadata("cardiovascular-training", "/services/cardiovascular-training");

export default function CardiovascularTrainingPage() {
  return <HumanPerformancePage slug="cardiovascular-training" />;
}