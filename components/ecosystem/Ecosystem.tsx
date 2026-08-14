"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import HumanBody from "./HumanBody";
import Reveal from "@/components/animations/Reveal";

export default function Ecosystem() {
  const [selected, setSelected] = useState("brain");

  return (
    <section
      id="ecosystem"
      className="relative overflow-hidden bg-[#050505] py-14 scroll-mt-32"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      </div>

      {/* Animated Scanline Effect */}
      <div className="absolute left-1/2 top-0 h-full w-1/3 -translate-x-1/2 pointer-events-none animate-scanline-flow">
        <div className="h-1/3 w-full bg-gradient-to-b from-transparent via-orange-500/10 to-transparent" />
      </div>

      {/* Primary Background Glow with Holo Pulse */}
      <div className="absolute left-1/2 top-24 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500/15 via-orange-400/10 to-transparent blur-[180px] animate-holo-pulse" />

      {/* Secondary Glow with Particle Float */}
      <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[150px] animate-particle-float" />

      {/* Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12),transparent_60%)]" />

      <Reveal>
      <Container>

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
            HUMAN PERFORMANCE
          </p>

          <h2 className="mt-6 text-4xl md:text-6xl font-black leading-tight text-white tracking-tight">
            THE SPORTS SCIENCE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 animate-gradient-x bg-[length:200%_100%]">
              BIO-ECOSYSTEM
            </span>
          </h2>

          <div className="relative mx-auto mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent">
             <div className="absolute inset-0 bg-orange-500 blur-sm animate-pulse" />
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-300 font-light leading-relaxed">
            Integrating advanced physiological data, precision biomechanics, and neurological optimization to <span className="text-orange-400 font-medium">redefine human potential</span>.
          </p>

          <div className="mt-6 inline-flex max-w-full items-center gap-2 rounded-full border border-orange-500/40 bg-black/80 px-3 py-2 text-xs font-semibold text-white shadow-[0_0_24px_rgba(249,115,22,0.12)] hover:shadow-[0_0_40px_rgba(249,115,22,0.25)] transition-all duration-300 sm:mt-7 sm:gap-3 sm:px-4 sm:text-sm">
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

        <div className="mt-6 flex justify-center sm:mt-10 lg:mt-12 animate-float-in">

            {/* Human Body */}

            <div className="relative w-full">

              <HumanBody
                selected={selected}
                onSelect={setSelected}
              />

            </div>


          </div>


      </Container>
      </Reveal>
    </section>
  );
}
