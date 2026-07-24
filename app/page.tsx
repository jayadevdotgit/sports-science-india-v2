import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Network from "@/components/network/Network";
import Ecosystem from "@/components/ecosystem/Ecosystem";
import Services from "@/components/services/services";
import JourneyTimeline from "@/components/journey/JourneyTimeline";
import Assessment from "@/components/assessment/Assessment";
import WhyChooseUs from "@/components/why/WhyChooseUs";
import Stats from "@/components/stats/Stats";
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
      <Network />
      <Ecosystem />
      <Services />
      <JourneyTimeline />
      <Assessment />
      <WhyChooseUs />
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
