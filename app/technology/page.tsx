import Navbar from "@/components/layout/Navbar";
import Technology from "@/components/technology/Technology";
import Footer from "@/components/footer/Footer";

export default function TechnologyPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32">
        <Technology />
      </div>
      <Footer />
    </>
  );
}