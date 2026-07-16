import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Services from "@/components/services/services";
import WhyChooseUs from "@/components/why/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
    </>
  );
}