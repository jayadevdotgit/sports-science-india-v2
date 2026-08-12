import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Network from "@/components/network/Network";
import Ecosystem from "@/components/ecosystem/Ecosystem";
import Services from "@/components/services/services";
import JourneyTimeline from "@/components/journey/JourneyTimeline";
import Testimonials from "@/components/testimonials/Testimonials";
import CTASection from "@/components/cta/CTASection";
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
      <CTASection />
      <Testimonials />

      <Footer />
    </>
  );
}
