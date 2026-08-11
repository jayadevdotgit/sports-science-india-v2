import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32">
        <Contact />
      </div>
      <Footer />
    </>
  );
}