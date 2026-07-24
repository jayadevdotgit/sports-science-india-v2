import Container from "@/components/ui/Container";

import { platforms } from "@/data/platforms";
import PlatformCard from "./PlatformCard";

export default function Network() {
  return (
    <section
      id="network"
      className="
        relative
        overflow-hidden
        py-14
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

        <div className="text-center max-w-4xl mx-auto mb-14">

          <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
            THE SPORTS SCIENCE INDIA ECOSYSTEM
          </p>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-white">
            One Organization. <span className="text-orange-500">Endless</span> Possibilities.
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />

          <p className="mt-4 text-base text-gray-400 leading-7 max-w-3xl mx-auto">
            A unified ecosystem connecting healthcare, performance, education, research, media, recognition and community to advance Indian sport.
          </p>

        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-3">

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

            <div className="lg:col-span-6">
                <PlatformCard
                {...platforms[7]}
                height="h-[250px]"
                />
            </div>

            <div className="lg:col-span-6">
                <PlatformCard
                {...platforms[8]}
                height="h-[250px]"
                />
            </div>

            {/* Row 4 */}

            <div className="lg:col-span-4">
                <PlatformCard
                {...platforms[4]}
                height="h-[250px]"
                />
            </div>

            <div className="lg:col-span-4">
                <PlatformCard
                {...platforms[5]}
                height="h-[250px]"
                />
            </div>

            <div className="lg:col-span-4">
                <PlatformCard
                {...platforms[6]}
                height="h-[250px]"
                />
            </div>

            </div>

      </Container>
    </section>
  );
}