import HumanPerformancePage from "@/components/humanPerformance/HumanPerformancePage";
import { serviceMetadata } from "@/lib/seo";

export const metadata = serviceMetadata("sports-medicine", "/services/human-performance/sports-medicine");

export default function HPSportsMedicinePage() {
  return <HumanPerformancePage slug="sports-medicine" />;
}