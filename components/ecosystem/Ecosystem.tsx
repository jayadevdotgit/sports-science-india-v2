"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import HumanBody from "./HumanBody";

export default function Ecosystem() {
  const [selected, setSelected] = useState("brain");

  return (
    <section
      id="ecosystem"
      className="relative overflow-hidden bg-[#050505] py-12 sm:py-16 lg:py-20"
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

          <p className="text-xs uppercase tracking-[0.3em] text-orange-500 sm:text-sm sm:tracking-[0.35em]">
            SPORTS SCIENCE ECOSYSTEM
          </p>

          <h2 className="mt-3 text-2xl font-black text-white sm:mt-4 sm:text-3xl lg:text-4xl">
            Every Athlete.{" "}
            <span className="text-orange-500">Every Body Part.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:mt-4 sm:text-base sm:leading-7">
            Explore how every part of the human body contributes to athletic
            performance, injury prevention and long-term development.
          </p>

          <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-orange-500/40 bg-black/80 px-3 py-2 text-xs font-semibold text-white shadow-[0_0_24px_rgba(249,115,22,0.12)] sm:mt-5 sm:gap-3 sm:px-4 sm:text-sm">
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
