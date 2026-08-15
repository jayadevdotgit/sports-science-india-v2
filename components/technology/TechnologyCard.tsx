"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import type { Technology } from "./technologyData";

type TechnologyCardProps = {
  technology: Technology;
  active: boolean;
  onSelect: () => void;
  className?: string;
};

export default function TechnologyCard({
  technology,
  active,
  onSelect,
  className = "",
}: TechnologyCardProps) {
  return (
    <Reveal className={className}>
      <div className="relative">
        {/* Animated traveling border glow for the active card */}
        {active && (
          <div className="pointer-events-none absolute -inset-px overflow-hidden rounded-3xl opacity-70">
            <div className="absolute -inset-[50%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(249,115,22,0.35)_80deg,rgba(251,146,60,0.2)_140deg,transparent_200deg)]" />
          </div>
        )}

      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        className={`
          group
          relative
          z-10
          w-full
          overflow-hidden
          rounded-3xl
          border
          backdrop-blur-xl
          text-left
          transition-all
          duration-500
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-orange-400
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[#050505]
          ${
            active
              ? "border-orange-500/60 bg-orange-500/[0.07] shadow-[0_20px_60px_rgba(249,115,22,0.25)]"
              : "border-white/10 bg-white/5 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_20px_60px_rgba(249,115,22,0.18)]"
          }
        `}
      >
        {/* Top accent */}
        <div
          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent ${
            active ? "opacity-100" : "opacity-40 group-hover:opacity-100"
          }`}
        />

        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-black/40">
          <Image
            src={technology.image}
            alt={technology.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-700 group-hover:scale-105"
          />

          {/* Active badge */}
          <span
            className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl border text-white transition-all duration-300 ${
              active
                ? "border-orange-400 bg-orange-500 shadow-lg shadow-orange-500/40"
                : "border-white/15 bg-black/60 opacity-0 backdrop-blur-xl group-hover:opacity-100"
            }`}
          >
            <ArrowUpRight size={16} />
          </span>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold transition-colors duration-300 text-white group-hover:text-white">
              {technology.title}
            </h3>
            <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
              0{technology.id}
            </span>
          </div>

          <p className="mt-1.5 text-sm font-medium text-orange-400">
            {technology.short}
          </p>

          {/* First stat as a quick spec */}
          <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2">
            <span className="text-sm font-black text-white">
              {technology.stats[0]?.value}
            </span>
            <span className="text-[11px] uppercase tracking-[0.12em] text-gray-500">
              {technology.stats[0]?.label}
            </span>
          </div>
        </div>
      </button>
      </div>
    </Reveal>
  );
}
