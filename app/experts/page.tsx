import Navbar from "@/components/layout/Navbar";
import Experts from "@/components/experts/Experts";
import Footer from "@/components/footer/Footer";
import BackButton from "@/components/ui/BackButton";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Experts",
  description:
    "Meet the specialists at Sports Science India — sports surgeons, physiotherapists and sports scientists trained internationally to keep athletes moving.",
  path: "/experts",
});

export default function ExpertsPage() {
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
        <Experts />
      </div>
      <Footer />
    </>
  );
}
