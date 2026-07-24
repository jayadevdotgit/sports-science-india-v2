"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import HumanBody from "./HumanBody";

export default function Ecosystem() {
  const [selected, setSelected] = useState("brain");

  return (
    <section
      id="ecosystem"
      className="relative overflow-hidden bg-[#050505] py-14"
    >

  {/* Background Glow */}
      <div className="absolute left-1/2 top-24 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[180px]" />      

  {/* Radial Glow */}
  <div
    className="
      absolute
      inset-0
      pointer-events-none
      bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12),transparent_60%)]
    "
  />  

      <Container>

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
            HUMAN PERFORMANCE
          </p>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-white">
            Every Athlete.{" "}
            <span className="text-orange-500">Every Body Part.</span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-400">
            Explore how every part of the human body contributes to athletic
            performance, injury prevention and long-term development.
          </p>

          <div className="mt-6 inline-flex max-w-full items-center gap-2 rounded-full border border-orange-500/40 bg-black/80 px-3 py-2 text-xs font-semibold text-white shadow-[0_0_24px_rgba(249,115,22,0.12)] sm:mt-7 sm:gap-3 sm:px-4 sm:text-sm">
            <span className="relative flex h-3 w-3" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-discover-ping rounded-full bg-orange-400/70" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)]" />
            </span>
            <span>
              Click a highlighted point to explore each body area
            </span>
          </div>

        </div>

        {/* Main Layout */}

        <div className="mt-6 flex justify-center sm:mt-10 lg:mt-12">

            {/* Human Body */}

            <div className="relative w-full">

              <HumanBody
                selected={selected}
                onSelect={setSelected}
              />

            </div>

          
          </div>
        

      </Container>

    </section>
  );
}
