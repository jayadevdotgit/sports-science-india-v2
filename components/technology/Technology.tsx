"use client";

import { useState } from "react";
import Reveal from "@/components/animations/Reveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

import { technology } from "./technologyData";
import TechnologyDisplay from "./TechnologyDisplay";
import TechnologyTabs from "./TechnologyTabs";

export default function Technology() {
  const [activeTechnology, setActiveTechnology] = useState(0);

  return (
    <section
      id="technology"
      className="relative overflow-hidden bg-[#050505] py-14"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-20 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[180px] pointer-events-none" />

      <Reveal>
      <Container>

        <SectionHeading
          eyebrow="Technology & Equipment"
          title={<>Powered by Science. <span className="text-gradient">Driven by Precision.</span></>}
          description="Discover the advanced sports science technology used to assess, optimize and elevate athletic performance."
        />

        <div className="mt-4 sm:mt-6 lg:mt-8">

          <TechnologyDisplay
            technology={technology[activeTechnology]}
          />

          <TechnologyTabs
            items={technology}
            active={activeTechnology}
            setActive={setActiveTechnology}
          />

        </div>

      </Container>
      </Reveal>
    </section>
  );
}
