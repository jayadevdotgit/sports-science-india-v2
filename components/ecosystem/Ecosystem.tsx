"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Hotspot from "@/components/ecosystem/Hotspot";
import PopupCard from "@/components/ecosystem/PopupCard";
import MuscleScene from "@/components/ecosystem3d/MuscleScene";
import Reveal from "@/components/animations/Reveal";

// Same hotspot positions and popup anchors as the Human Performance section.
const hotspots = [
  { id: "brain", top: "7%", left: "50%", cardSide: "right" as const },
  { id: "neck", top: "20%", left: "50%", cardSide: "right" as const },
  { id: "shoulder", top: "22%", left: "40%", cardSide: "left" as const },
  { id: "lungs", top: "26%", left: "44%", cardSide: "left" as const },
  { id: "heart", top: "28%", left: "53%", cardSide: "right" as const },
  { id: "elbow", top: "35%", left: "38%", cardSide: "left" as const },
  { id: "core", top: "35%", left: "50%", cardSide: "right" as const },
  { id: "spine", top: "42%", left: "50%", cardSide: "left" as const },
  { id: "wrist", top: "44%", left: "35%", cardSide: "left" as const, cardUp: "15%" as const },
  { id: "hip", top: "47%", left: "42%", cardSide: "left" as const, cardUp: "15%" as const },
  { id: "knee", top: "76%", left: "55%", cardSide: "right" as const, cardVertical: "above" as const },
  { id: "ankle", top: "92%", left: "54%", cardSide: "left" as const, cardVertical: "above" as const },
];

export default function Ecosystem() {
  const [selected, setSelected] = useState("brain");
  const selectedHotspot = hotspots.find((hotspot) => hotspot.id === selected);

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

        <SectionHeading
          eyebrow="Human Performance"
          title={<>Every Athlete. <span className="text-orange-500">Every Body Part.</span></>}
          description="Explore how every part of the human body contributes to athletic performance, injury prevention and long-term development."
        >
          <div className="mt-6 inline-flex max-w-full items-center gap-2 rounded-full border border-orange-500/40 bg-black/80 px-3 py-2 text-xs font-semibold text-white shadow-[0_0_24px_rgba(249,115,22,0.12)] hover:shadow-[0_0_40px_rgba(249,115,22,0.25)] transition-all duration-300 sm:mt-7 sm:gap-3 sm:px-4 sm:text-sm">
            <span className="relative flex h-3 w-3" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-discover-ping rounded-full bg-orange-400/70" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)]" />
            </span>
            <span>
              Click a highlighted point to explore each body area
            </span>
          </div>
        </SectionHeading>

        {/* Main Layout */}

        <div className="mt-6 flex justify-center sm:mt-10 lg:mt-12 animate-float-in">

            {/* BODY CONTAINER: a centered square matching the hotspot overlay so
                popup cards can anchor to it without being clipped by the viewport. */}
            <div className="relative w-full max-w-[320px] sm:max-w-[520px] lg:max-w-[680px]">
              <div className="relative aspect-square w-full">

                {/* 3D Viewport (clipped, holds canvas + effects) */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-black/60 to-black/20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />
                  <div className="absolute left-1/2 top-1/2 h-[70%] aspect-square max-w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/15 pointer-events-none" />

                  {/* Rotating Cyber Ring (same style as Human Performance section) */}
                  <div className="absolute left-1/2 top-1/2 h-[95%] aspect-square max-w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-orange-500/20 animate-[spin_40s_linear_infinite] pointer-events-none" />

                  <MuscleScene selected={selected} onSelect={setSelected} />

                  <div className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-gray-400 backdrop-blur lg:block">
                    Auto-rotating
                  </div>
                </div>

                {/* Fixed hotspot overlay (same positions as Human Performance) */}
                <div className="pointer-events-none absolute inset-0">
                  {hotspots.map((hotspot) => (
                    <Hotspot
                      key={hotspot.id}
                      id={hotspot.id}
                      top={hotspot.top}
                      left={hotspot.left}
                      selected={selected}
                      onSelect={setSelected}
                    />
                  ))}
                </div>

                {/* POPUP (desktop, anchored to the selected dot) */}
                <div className="hidden lg:block">
                  <PopupCard selected={selected} anchor={selectedHotspot} />
                </div>

              </div>

              {/* POPUP (mobile, below the figure) */}
              <div className="mt-5 w-full sm:mt-6 lg:hidden">
                <PopupCard selected={selected} mobile />
              </div>
            </div>

          </div>


      </Container>
      </Reveal>
    </section>
  );
}
