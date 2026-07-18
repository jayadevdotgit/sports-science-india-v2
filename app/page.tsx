import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Services from "@/components/services/services";
import WhyChooseUs from "@/components/why/WhyChooseUs";
import Assessment from "@/components/assessment/Assessment";
import Stats from "@/components/stats/Stats";
import Testimonials from "@/components/testimonials/Testimonials";
import FAQ from "@/components/faq/faq";
import CTA from "@/components/cta/CTA";
import Footer from "@/components/footer/Footer";
import Booking from "@/components/booking/Booking";
import Contact from "@/components/contact/Contact";
import Network from "@/components/network/Network";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Network />
      <Assessment />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
      <Booking />
      <Contact />
      <Footer />
    </>
  );
}