import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

import { platforms } from "@/data/platforms";
import PlatformCard from "./PlatformCard";
import Reveal from "@/components/animations/Reveal";

export default function Network() {
  return (
    <section
      id="network"
      className="
        relative
        overflow-hidden
        [content-visibility:auto]
        [contain-intrinsic-size:1200px]
        py-14
        bg-gradient-to-b
        from-black
        via-[#080808]
        to-black
        "
    >
      <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[90px]" />

      <div className="absolute inset-0 overflow-hidden">

      <div className="absolute bottom-20 left-20 h-56 w-56 rounded-full bg-orange-500/10 blur-[90px]" />

      <div className="absolute top-10 right-20 h-48 w-48 rounded-full bg-orange-500/10 blur-[80px]" />

      <div className="absolute bottom-20 right-20 h-56 w-56 rounded-full bg-orange-500/10 blur-[90px]" />

      </div>

      <Container>
        <Reveal>

        <SectionHeading
          eyebrow="The Sports Science India Ecosystem"
          title={<>One Organization. <span className="text-orange-500">Endless</span> Possibilities.</>}
          description="A data-driven ecosystem uniting sports medicine, biomechanics, rehabilitation, research and education to advance Indian sport through evidence-based performance science."
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-3">

  {/* Row 1 */}

            <div className="lg:col-span-8 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
                <PlatformCard {...platforms[0]} />
            </div>

            <div className="lg:col-span-4 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
                <PlatformCard {...platforms[2]} />
            </div>

            {/* Row 2 */}

            <div className="lg:col-span-4 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
                <PlatformCard {...platforms[1]} />
            </div>

            <div className="lg:col-span-8 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
                <PlatformCard {...platforms[3]} />
            </div>

            {/* Row 3 */}

            <div className="lg:col-span-6 animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
                <PlatformCard
                {...platforms[7]}
                height="h-[250px]"
                />
            </div>

            <div className="lg:col-span-6 animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
                <PlatformCard
                {...platforms[8]}
                height="h-[250px]"
                />
            </div>

            {/* Row 4 */}

            <div className="lg:col-span-4 animate-[fadeInUp_0.6s_ease-out_0.7s_both]">
                <PlatformCard
                {...platforms[4]}
                height="h-[250px]"
                />
            </div>

            <div className="lg:col-span-4 animate-[fadeInUp_0.6s_ease-out_0.8s_both]">
                <PlatformCard
                {...platforms[5]}
                height="h-[250px]"
                />
            </div>

            <div className="lg:col-span-4 animate-[fadeInUp_0.6s_ease-out_0.9s_both]">
                <PlatformCard
                {...platforms[6]}
                height="h-[250px]"
                />
            </div>

            </div>

        </Reveal>
      </Container>
    </section>
  );
}
