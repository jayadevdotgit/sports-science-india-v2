import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Ecosystem from "@/components/ecosystem/Ecosystem";
import Services from "@/components/services/services";
import Assessment from "@/components/assessment/Assessment";
import WhyChooseUs from "@/components/why/WhyChooseUs";
import Stats from "@/components/stats/Stats";
import Network from "@/components/network/Network";
import Testimonials from "@/components/testimonials/Testimonials";
import FAQ from "@/components/faq/faq";
import CTA from "@/components/cta/CTA";
import Booking from "@/components/booking/Booking";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";



export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Ecosystem />
      <Services />
      <Assessment />
      <WhyChooseUs />
      <Stats />
      <Network />
      <Testimonials />
      <FAQ />
      <CTA />
      <Booking />
      <Contact />
      <Footer />
    </>
  );
}
