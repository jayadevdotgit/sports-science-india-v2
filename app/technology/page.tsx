import Navbar from "@/components/layout/Navbar";
import Technology from "@/components/technology/Technology";
import Footer from "@/components/footer/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sports Science Technology",
  description:
    "VO2 Max testing, 3D motion capture, force plates, speed gates and body composition analysis at Sports Science India, Bhubaneswar.",
  path: "/technology",
});

export default function TechnologyPage() {
  return (
    <>
      <Navbar />
      <Technology />
      <Footer />
    </>
  );
}