"use client";

import Link from "next/link";
import Image from "next/image";

type Props = {
  height?: string;
  category: string;
  title: string;
  description: string;
  image: string;
  link: string;
  button: string;

  stats1: string;
  label1: string;

  stats2: string;
  label2: string;

  badgeColor: string;
};

const colorMap: Record<
  string,
  {
    text: string;
    border: string;
    bg: string;
    glow: string;
    btn: string;
    rgba: string;
  }
> = {
  orange: {
    text: "text-orange-300",
    border: "border-orange-500/40",
    bg: "bg-orange-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(249,115,22,0.35)]",
    btn: "border-orange-500/40 bg-orange-500/10 text-orange-400 group-hover:border-orange-500/70 group-hover:bg-orange-500/20 group-hover:text-orange-300 group-hover:shadow-orange-500/25",
    rgba: "249,115,22",
  },
  blue: {
    text: "text-blue-300",
    border: "border-blue-500/40",
    bg: "bg-blue-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(59,130,246,0.35)]",
    btn: "border-blue-500/40 bg-blue-500/10 text-blue-400 group-hover:border-blue-500/70 group-hover:bg-blue-500/20 group-hover:text-blue-300 group-hover:shadow-blue-500/25",
    rgba: "59,130,246",
  },
  gold: {
    text: "text-amber-300",
    border: "border-amber-500/40",
    bg: "bg-amber-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(245,158,11,0.35)]",
    btn: "border-amber-400/40 bg-amber-400/10 text-amber-400 group-hover:border-amber-400/70 group-hover:bg-amber-400/20 group-hover:text-amber-300 group-hover:shadow-amber-500/25",
    rgba: "245,158,11",
  },
  purple: {
    text: "text-purple-300",
    border: "border-purple-500/40",
    bg: "bg-purple-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(168,85,247,0.35)]",
    btn: "border-purple-500/40 bg-purple-500/10 text-purple-400 group-hover:border-purple-500/70 group-hover:bg-purple-500/20 group-hover:text-purple-300 group-hover:shadow-purple-500/25",
    rgba: "168,85,247",
  },
  cyan: {
    text: "text-cyan-300",
    border: "border-cyan-500/40",
    bg: "bg-cyan-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(6,182,212,0.35)]",
    btn: "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 group-hover:border-cyan-500/70 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 group-hover:shadow-cyan-500/25",
    rgba: "6,182,212",
  },
  green: {
    text: "text-emerald-300",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(16,185,129,0.35)]",
    btn: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 group-hover:border-emerald-500/70 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 group-hover:shadow-emerald-500/25",
    rgba: "16,185,129",
  },
  emerald: {
    text: "text-emerald-300",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(16,185,129,0.35)]",
    btn: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 group-hover:border-emerald-500/70 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 group-hover:shadow-emerald-500/25",
    rgba: "16,185,129",
  },
  amber: {
    text: "text-amber-300",
    border: "border-amber-500/40",
    bg: "bg-amber-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(245,158,11,0.35)]",
    btn: "border-amber-400/40 bg-amber-400/10 text-amber-400 group-hover:border-amber-400/70 group-hover:bg-amber-400/20 group-hover:text-amber-300 group-hover:shadow-amber-500/25",
    rgba: "245,158,11",
  },
  rose: {
    text: "text-rose-300",
    border: "border-rose-500/40",
    bg: "bg-rose-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(244,63,94,0.35)]",
    btn: "border-rose-500/40 bg-rose-500/10 text-rose-400 group-hover:border-rose-500/70 group-hover:bg-rose-500/20 group-hover:text-rose-300 group-hover:shadow-rose-500/25",
    rgba: "244,63,94",
  },
};

const defaultColor = colorMap.orange;

export default function PlatformCard({
  category,
  title,
  description,
  image,
  link,
  button,
  stats1,
  label1,
  stats2,
  label2,
  badgeColor,
  height = "h-[235px]",
}: Props) {
  const c = colorMap[badgeColor] ?? defaultColor;

  return (
    <Link href={link} prefetch={false}>
      <div
        className={`
        group
        relative
        ${height}
        cursor-pointer
        p-[2.5px]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:scale-[1.01]
        active:scale-[0.97]
        ${c.glow}
        `}
      >
        {/* Gradient Frame - follows rounded corners exactly */}
        <div
          className="absolute inset-0 rounded-3xl transition-opacity duration-500 opacity-90 group-hover:opacity-100"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(${c.rgba},0.95),
              rgba(${c.rgba},0.6) 40%,
              rgba(${c.rgba},0.25) 75%,
              rgba(${c.rgba},0.08) 100%
            )`,
          }}
        />

        {/* Card Body */}
        <div className="relative h-full overflow-hidden rounded-[22px] bg-black/60 backdrop-blur-md">
          {/* Background Image */}
          <Image
            src={image}
            alt={title}
            fill
            unoptimized
            className="
              absolute
              inset-0
              object-cover
              object-center
              transition-transform
              duration-[1200ms]
              ease-out
              group-hover:scale-110
            "
          />

          {/* Dynamic Multi-layer Dark Gradient Overlay for Maximum Readability */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/95
              via-black/75
              to-black/40
              transition-opacity
              duration-500
              group-hover:opacity-80
            "
          />

          {/* Color-matched Radial Glow on Hover */}
          <div
            className="absolute -inset-1 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 20%, rgba(${c.rgba},0.18), transparent 70%)`,
            }}
          />

          {/* Shine Sweep on Hover */}
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="animate-shine-sweep absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Active Badge Tag */}
          <div className="absolute top-5 right-5 z-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 border border-emerald-500/40 px-3 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              ACTIVE
            </span>
          </div>

          {/* Content Container */}
          <div
            className="
              relative
              z-10
              flex
              h-full
              flex-col
              p-5
              sm:p-6
            "
          >
            {/* Top Section: Category & Title */}
            <div className="flex-1">
              <span
                className={`
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  px-3.5
                  py-1
                  text-xs
                  font-bold
                  tracking-widest
                  uppercase
                  backdrop-blur-md
                  border
                  shadow-sm
                  transition-all
                  duration-300
                  group-hover:scale-105
                  ${c.bg}
                  ${c.border}
                  ${c.text}
                `}
              >
                <span className={`h-1.5 w-1.5 rounded-full bg-current ${c.text}`} />
                {category}
              </span>

              <h3
                className="
                  mt-3
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-white
                  tracking-tight
                  transition-colors
                  duration-300
                  group-hover:text-orange-400
                "
              >
                {title}
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  text-gray-300
                  leading-relaxed
                  line-clamp-2
                  sm:line-clamp-3
                "
              >
                {description}
              </p>
            </div>

            {/* Bottom Section: Metrics & Action Link */}
            <div className="mt-auto pt-3 border-t border-white/10">
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <div className="flex min-w-0 items-center gap-3 sm:gap-5">
                  <div className="min-w-0">
                    <p className="text-lg sm:text-xl font-semibold text-white leading-tight">
                      {stats1}
                    </p>
                    <p className="truncate text-[11px] uppercase tracking-wider text-gray-400">
                      {label1}
                    </p>
                  </div>

                  <div className="h-8 w-px bg-white/10 shrink-0" />

                  <div className="min-w-0">
                    <p className="text-lg sm:text-xl font-semibold text-white leading-tight">
                      {stats2}
                    </p>
                    <p className="truncate text-[11px] uppercase tracking-wider text-gray-400">
                      {label2}
                    </p>
                  </div>
                </div>

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border-2
                    px-3
                    py-1.5
                    text-xs
                    font-bold
                    backdrop-blur-md
                    whitespace-nowrap
                    shrink-0
                    shadow-lg
                    transition-all
                    duration-300
                    group-hover:translate-x-0.5
                    ${c.btn}
                  `}
                >
                  {button}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}