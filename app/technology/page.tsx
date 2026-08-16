import Navbar from "@/components/layout/Navbar";
import Technology from "@/components/technology/Technology";
import Footer from "@/components/footer/Footer";
import BackButton from "@/components/ui/BackButton";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sports Science Technology",
  description:
    "Handheld strength testing, recovery systems and body composition analysis at Sports Science India, Bhubaneswar.",
  path: "/technology",
});

export default function TechnologyPage() {
  return (
    <>
      <Navbar />
      <div className="relative">
        <div className="absolute inset-x-0 top-[136px] z-20 px-8">
          <div className="relative mx-auto max-w-7xl">
            <div className="absolute left-8">
              <BackButton />
            </div>
          </div>
        </div>
        <Technology />
      </div>
      <Footer />
    </>
  );
}