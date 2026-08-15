"use client";

import { useState, useRef } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import TechnologyHero from "./TechnologyHero";
import TechnologyDisplay from "./TechnologyDisplay";
import TechnologyCard from "./TechnologyCard";
import { technology } from "./technologyData";

export default function Technology() {
  const [activeTechnology, setActiveTechnology] = useState(0);
  const selected = technology[activeTechnology];
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleSelect = (index: number) => {
    setActiveTechnology(index);
    // Smooth-scroll the spotlight into view so the user sees the update.
    spotlightRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <TechnologyHero />

      <section
        id="technology"
        className="relative overflow-hidden bg-[#050505] pb-20 pt-4 text-white scroll-mt-32"
      >
        {/* Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-20 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[180px]" />

        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="The Technology Lab"
              title={<>Seven Systems. <span className="text-orange-500">One Complete Picture.</span></>}
              description="Every technology is integrated into a single athlete profile — so data from force, movement, metabolic and recovery testing paints one complete, actionable picture."
            />
          </Reveal>

          {/* Spotlight */}
          <div ref={spotlightRef} className="scroll-mt-28">
            <TechnologyDisplay technology={selected} />
          </div>

          {/* Grid selector */}
          <Reveal delay={0.1}>
            <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {technology.map((item, index) => (
                <TechnologyCard
                  key={item.id}
                  technology={item}
                  active={index === activeTechnology}
                  onSelect={() => handleSelect(index)}
                  className={
                    index === technology.length - 1 ? "lg:col-start-2" : ""
                  }
                />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
