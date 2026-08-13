import Navbar from "@/components/layout/Navbar";
import About from "@/components/about/About";
import Footer from "@/components/footer/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32">
        <About />
      </div>
      <Footer />
    </>
  );
}
