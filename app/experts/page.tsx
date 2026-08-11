import Navbar from "@/components/layout/Navbar";
import Experts from "@/components/experts/Experts";
import Footer from "@/components/footer/Footer";

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
