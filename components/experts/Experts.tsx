"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ExpertCard from "./ExpertCard";
import { founders, physios } from "./expertsData";
import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experts() {
  const autoplay = Autoplay({
    delay: 5000,
    stopOnInteraction: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [autoplay]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="experts"
      className="relative overflow-hidden bg-[#050505] pt-32 pb-14 sm:pt-36"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-8">

        <Reveal>

          <SectionHeading
            as="h1"
            eyebrow="Meet Our Experts"
            title={<>The Minds Behind <span className="text-orange-500">Athletic Excellence</span></>}
            description="Our multidisciplinary team combines sports science, physiotherapy, biomechanics and performance coaching to help athletes unlock their highest potential."
          />

        </Reveal>

        {/* Founders */}
        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2 lg:gap-8 mx-auto max-w-[42.75rem]">
          {founders.map((founder) => (
            <ExpertCard key={founder.id} {...founder} featured />
          ))}
        </div>

        {/* Physio carousel */}
        <div className="relative mt-12 sm:mt-16">

          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold sm:text-xl text-white">
              Our <span className="text-orange-500">Team</span>
            </h3>
            <div className="flex items-center gap-2.5">
              <button
                onClick={scrollPrev}
                aria-label="Previous physiotherapist"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-[#111111] text-white transition-all duration-300 hover:border-orange-500 hover:bg-orange-600"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next physiotherapist"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-[#111111] text-white transition-all duration-300 hover:border-orange-500 hover:bg-orange-600"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>

            <div className="flex items-stretch">

              {physios.map((physio) => (

                <div
                  key={physio.id}
                  className="
                    min-w-0
                    flex-[0_0_100%]
                    px-3
                    sm:flex-[0_0_50%] sm:px-3
                    md:flex-[0_0_33.333%]
                    lg:flex-[0_0_25%]
                    flex
                    py-2
                  "
                >
                  <ExpertCard {...physio} />
                </div>

              ))}

            </div>

          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">

            {physios.map((_, index) => (

              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? "w-6 bg-orange-500"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}