import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Services from "@/components/services/services";
import WhyChooseUs from "@/components/why/WhyChooseUs";
import Assessment from "@/components/assessment/Assessment";
import Stats from "@/components/stats/Stats";
import Testimonials from "@/components/testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Assessment/>
      <Stats/>
      <Testimonials/>
    </>
  );
}