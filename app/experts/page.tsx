import Navbar from "@/components/layout/Navbar";
import Experts from "@/components/experts/Experts";
import Footer from "@/components/footer/Footer";
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
      <div className="pt-32">
        <Experts />
      </div>
      <Footer />
    </>
  );
}
