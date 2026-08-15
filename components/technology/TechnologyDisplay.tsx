"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, CalendarClock, PhoneCall } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import type { Technology } from "./technologyData";

type Props = {
  technology: Technology;
};

export default function TechnologyDisplay({ technology }: Props) {
  const isDynamo = technology.title === "DynaMo";

  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl shadow-2xl shadow-black/60">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-orange-500/10 blur-[100px]" />

        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={technology.image}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative h-[260px] bg-black/40 sm:h-[320px] lg:h-full lg:min-h-[520px]"
            >
              <Image
                src={technology.image}
                alt={technology.title}
                fill
                priority={isDynamo}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`
                  object-cover
                  object-center
                  transition-all
                  duration-700
                  hover:scale-105
                `}
              />

              {!isDynamo && (
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/40" />
              )}

              {/* Floating tag pill */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-discover-ping rounded-full bg-orange-400/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)]" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                  {technology.tag}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Content */}
          <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={technology.title}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="relative flex flex-col justify-center p-5 sm:p-8 lg:absolute lg:inset-0 lg:p-14"
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                  Featured Technology
                </span>

                <h3 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {technology.title}
                </h3>

                <p className="mt-1 text-sm font-medium text-orange-400 sm:text-base">
                  {technology.short}
                </p>

                <p className="mt-3 text-sm leading-6 text-gray-400 sm:text-base">
                  {technology.description}
                </p>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-3 gap-2.5 sm:mt-7 sm:gap-3">
                  {technology.stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.3 }}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3 text-center transition-colors duration-300 hover:border-orange-500/30 sm:p-4"
                    >
                      <p className="text-sm font-black tracking-tight text-white sm:text-base">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-gray-500 sm:text-[11px]">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Features */}
                <div className="mt-5 space-y-1.5 sm:mt-7 sm:space-y-2.5">
                  {technology.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 size={18} className="shrink-0 text-orange-500" />
                      <span className="text-sm text-gray-300 sm:text-base">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                  <Link href="/booking">
                    <button className="group inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:bg-orange-400">
                      <CalendarClock size={16} />
                      Book This Assessment
                    </button>
                  </Link>
                  <a
                    href="tel:+917381380010"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-gray-300 transition-all duration-300 hover:border-orange-500/40 hover:text-orange-400"
                  >
                    <PhoneCall size={16} className="transition-transform duration-300 group-hover:scale-110" />
                    Call Now
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
