import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

import { platforms } from "@/data/platforms";
import PlatformCard from "./PlatformCard";

export default function Network() {
  return (
    <section
      id="network"
      className="
        relative
        overflow-hidden
        py-32
        bg-gradient-to-b
        from-black
        via-[#080808]
        to-black
        "
    >
      <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[150px]" />

      <div className="absolute inset-0 overflow-hidden">

      <div className="absolute bottom-20 left-20 h-72 w-72 rounded-full bg-orange-500/10 blur-[150px]" />

      <div className="absolute top-10 right-20 h-60 w-60 rounded-full bg-orange-500/10 blur-[120px]" />

      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-orange-500/10 blur-[140px]" />

      </div>

      <Container>

        <SectionHeading
        eyebrow="THE SPORTS SCIENCE INDIA ECOSYSTEM"
        title="One Organization. Seven Specialized Platforms."
        description="Delivering healthcare, performance, education, media, networking and community initiatives through an integrated sports science ecosystem."
        />

        <div className="mt-28 grid grid-cols-1 lg:grid-cols-12 gap-6">

  {/* Row 1 */}

            <div className="lg:col-span-8">
                <PlatformCard {...platforms[0]} />
            </div>

            <div className="lg:col-span-4">
                <PlatformCard {...platforms[2]} />
            </div>

            {/* Row 2 */}

            <div className="lg:col-span-4">
                <PlatformCard {...platforms[1]} />
            </div>

            <div className="lg:col-span-8">
                <PlatformCard {...platforms[3]} />
            </div>

            {/* Row 3 */}

            <div className="lg:col-span-4">
                <PlatformCard
                {...platforms[4]}
                height="h-[360px]"
                />
            </div>

            <div className="lg:col-span-4">
                <PlatformCard
                {...platforms[5]}
                height="h-[360px]"
                />
            </div>

            <div className="lg:col-span-4">
                <PlatformCard
                {...platforms[6]}
                height="h-[360px]"
                />
            </div>

            </div>

      </Container>
    </section>
  );
}