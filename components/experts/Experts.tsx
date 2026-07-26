"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ExpertCard from "./ExpertCard";
import { experts } from "./expertsData";
import Reveal from "@/components/animations/Reveal";

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
      className="relative overflow-hidden bg-[#050505] py-14"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-8">

        <Reveal>

          <div className="text-center max-w-4xl mx-auto mb-14">

            <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
              Meet Our Experts
            </p>

            <h2 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-white">
              The Minds Behind{" "}
              <span className="text-orange-500">
                Athletic Excellence
              </span>
            </h2>

            <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />

            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-400">
              Our multidisciplinary team combines sports science,
              physiotherapy, biomechanics and performance coaching
              to help athletes unlock their highest potential.
            </p>

          </div>

        </Reveal>

        {/* Carousel */}

        <div className="relative mt-8 sm:mt-10">

          <div className="overflow-hidden" ref={emblaRef}>

            <div className="flex items-stretch">

              {experts.map((expert) => (

                <div
                  key={expert.id}
                  className="
                    min-w-0
                    flex-[0_0_100%]
                    px-3
                    sm:flex-[0_0_50%] sm:px-3
                    md:flex-[0_0_33.333%]
                    lg:flex-[0_0_20%]
                    flex
                    py-2
                  "
                >
                  <ExpertCard {...expert} />
                </div>

              ))}

            </div>

          </div>

          <div className="absolute inset-x-0 top-[45%] flex -translate-y-1/2 justify-between pointer-events-none">
            <button
              onClick={scrollPrev}
              aria-label="Previous expert"
              className="pointer-events-auto -ml-6 rounded-full border border-orange-500/30 bg-[#111111] p-3 text-white transition hover:border-orange-500 hover:bg-orange-500 md:-ml-16"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next expert"
              className="pointer-events-auto -mr-6 rounded-full border border-orange-500/30 bg-[#111111] p-3 text-white transition hover:border-orange-500 hover:bg-orange-500 md:-mr-16"
            >
              <ChevronRight />
            </button>
          </div>

        </div>

        {/* Dots */}

        <div className="mt-8 flex justify-center gap-2">

          {experts.map((_, index) => (

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

    </section>
  );
}
