import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Network from "@/components/network/Network";
import Ecosystem from "@/components/ecosystem/Ecosystem";
import Services from "@/components/services/services";
import JourneyTimeline from "@/components/journey/JourneyTimeline";
import Stats from "@/components/stats/Stats";
import Testimonials from "@/components/testimonials/Testimonials";
import Gallery from "@/components/gallery/Gallery";
import CTASection from "@/components/cta/CTASection";
import YouTubeSection from "@/components/youtube/YouTubeSection";
import Footer from "@/components/footer/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sports Science India | Prevent Injury, Prolong Career",
  description:
    "Sports injury treatment, rehabilitation, performance analysis and athlete development in Bhubaneswar, Odisha. Book a sports science assessment today.",
  path: "/",
  keywords: [
    "sports medicine Bhubaneswar",
    "sports science India",
    "physiotherapy Bhubaneswar",
    "sports injury treatment",
    "athlete development Odisha",
    "rehabilitation",
  ],
});

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <JourneyTimeline />
      <Stats />
      <Network />
      <Ecosystem />
      <Services />
      <CTASection />
      <Testimonials />
      <YouTubeSection />
      <Gallery />

      <Footer />
    </>
  );
}
