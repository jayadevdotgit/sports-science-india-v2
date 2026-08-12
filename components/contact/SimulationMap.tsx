"use client";

import { MapPin, Plus, Minus, Navigation } from "lucide-react";

// A stylized, self-contained map simulation (no external API/key needed).
// Purely decorative visual used alongside the real Google Maps embed.
export default function SimulationMap() {
  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-[28px] border border-gray-800 bg-[#0a0f13]">
      {/* Street grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:34px_34px]" />

      {/* Blocks */}
      <div className="absolute left-[8%] top-[12%] h-14 w-20 rounded-lg border border-white/5 bg-white/[0.03]" />
      <div className="absolute right-[10%] top-[10%] h-16 w-24 rounded-lg border border-white/5 bg-white/[0.03]" />
      <div className="absolute bottom-[14%] left-[14%] h-16 w-24 rounded-lg border border-white/5 bg-white/[0.03]" />
      <div className="absolute bottom-[12%] right-[16%] h-14 w-20 rounded-lg border border-white/5 bg-white/[0.03]" />
      <div className="absolute left-[30%] top-[6%] h-10 w-16 rounded-lg border border-white/5 bg-white/[0.03]" />
      <div className="absolute right-[30%] bottom-[32%] h-10 w-16 rounded-lg border border-white/5 bg-white/[0.03]" />

      {/* Park */}
      <div className="absolute left-[55%] top-[58%] h-16 w-24 rounded-2xl border border-green-500/20 bg-green-500/[0.07]" />

      {/* Water */}
      <div className="absolute -left-8 top-[6%] h-40 w-16 -rotate-12 rounded-full bg-cyan-500/10 blur-[2px]" />
      <div className="absolute -right-6 bottom-[4%] h-32 w-14 rotate-12 rounded-full bg-cyan-500/10 blur-[2px]" />

      {/* Main roads */}
      <div className="absolute left-0 top-1/2 h-3 w-full -translate-y-1/2 bg-white/[0.05]" />
      <div className="absolute left-1/2 top-0 h-full w-3 -translate-x-1/2 bg-white/[0.05]" />

      {/* Transit / arterial line */}
      <div className="absolute left-0 top-[26%] h-1.5 w-[120%] -rotate-[22deg] bg-orange-500/40" />
      <div className="absolute left-0 top-[64%] h-1.5 w-[120%] rotate-[14deg] bg-orange-500/30" />

      {/* Location pin */}
      <div className="absolute left-1/2 top-1/2 flex flex-col -translate-x-1/2 -translate-y-1/2 items-center">
        <span className="relative flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-60" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-orange-500/30" />
        </span>
        <div className="mt-2 flex h-9 w-9 items-center justify-center rounded-full border border-orange-500/40 bg-orange-500 text-white shadow-[0_0_24px_rgba(249,115,22,0.85)]">
          <MapPin size={16} />
        </div>
        <span className="mt-2 whitespace-nowrap rounded-full border border-orange-500/30 bg-black/80 px-3 py-1 text-xs font-semibold text-orange-300 backdrop-blur">
          Sports Science India
        </span>
      </div>

      {/* Zoom controls */}
      <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-xl border border-gray-700 bg-black/70 backdrop-blur">
        <button aria-label="Zoom in" type="button" className="flex h-8 w-8 items-center justify-center text-gray-300 transition-colors hover:bg-orange-500 hover:text-white">
          <Plus size={14} />
        </button>
        <div className="h-px bg-gray-700" />
        <button aria-label="Zoom out" type="button" className="flex h-8 w-8 items-center justify-center text-gray-300 transition-colors hover:bg-orange-500 hover:text-white">
          <Minus size={14} />
        </button>
      </div>

      {/* Locate / compass chip */}
      <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 bg-black/70 text-gray-300 backdrop-blur">
        <Navigation size={13} />
      </div>

      {/* Corner label */}
      <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 backdrop-blur">
        Surya Nagar · Bhubaneswar
      </div>
    </div>
  );
}