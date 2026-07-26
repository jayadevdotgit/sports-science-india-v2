"use client";

import { useState } from "react";
import Reveal from "@/components/animations/Reveal";
import Container from "@/components/ui/Container";

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

        <div className="text-center max-w-4xl mx-auto mb-10">

          <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
            Technology & Equipment
          </p>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-white">
            Powered by Science.{" "}
            <span className="text-orange-500">
              Driven by Precision.
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-400">
            Discover the advanced sports science technology used to
            assess, optimize and elevate athletic performance.
          </p>

        </div>

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
