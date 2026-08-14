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
    ring: string;
    rgba: string;
  }
> = {
  orange: {
    text: "text-orange-300",
    border: "border-orange-500/40",
    bg: "bg-orange-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(249,115,22,0.35)] group-hover:border-orange-500/70",
    ring: "from-orange-500/80 via-orange-400/40 to-transparent",
    rgba: "249,115,22",
  },
  blue: {
    text: "text-blue-300",
    border: "border-blue-500/40",
    bg: "bg-blue-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(59,130,246,0.35)] group-hover:border-blue-500/70",
    ring: "from-blue-500/80 via-blue-400/40 to-transparent",
    rgba: "59,130,246",
  },
  gold: {
    text: "text-amber-300",
    border: "border-amber-500/40",
    bg: "bg-amber-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(245,158,11,0.35)] group-hover:border-amber-500/70",
    ring: "from-amber-400/80 via-amber-300/40 to-transparent",
    rgba: "245,158,11",
  },
  purple: {
    text: "text-purple-300",
    border: "border-purple-500/40",
    bg: "bg-purple-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(168,85,247,0.35)] group-hover:border-purple-500/70",
    ring: "from-purple-500/80 via-purple-400/40 to-transparent",
    rgba: "168,85,247",
  },
  cyan: {
    text: "text-cyan-300",
    border: "border-cyan-500/40",
    bg: "bg-cyan-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(6,182,212,0.35)] group-hover:border-cyan-500/70",
    ring: "from-cyan-500/80 via-cyan-400/40 to-transparent",
    rgba: "6,182,212",
  },
  green: {
    text: "text-emerald-300",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(16,185,129,0.35)] group-hover:border-emerald-500/70",
    ring: "from-emerald-500/80 via-emerald-400/40 to-transparent",
    rgba: "16,185,129",
  },
  emerald: {
    text: "text-emerald-300",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(16,185,129,0.35)] group-hover:border-emerald-500/70",
    ring: "from-emerald-500/80 via-emerald-400/40 to-transparent",
    rgba: "16,185,129",
  },
  amber: {
    text: "text-amber-300",
    border: "border-amber-500/40",
    bg: "bg-amber-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(245,158,11,0.35)] group-hover:border-amber-500/70",
    ring: "from-amber-400/80 via-amber-300/40 to-transparent",
    rgba: "245,158,11",
  },
  rose: {
    text: "text-rose-300",
    border: "border-rose-500/40",
    bg: "bg-rose-500/20",
    glow: "group-hover:shadow-[0_0_50px_rgba(244,63,94,0.35)] group-hover:border-rose-500/70",
    ring: "from-rose-500/80 via-rose-400/40 to-transparent",
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
        overflow-hidden
        rounded-3xl
        ${height}
        cursor-pointer
        border-2
        border-orange-500/20
        bg-black/60
        backdrop-blur-md
        transition-all
        duration-500
        hover:-translate-y-2
        hover:scale-[1.01]
        active:scale-[0.97]
        ${c.glow}
        `}
      >
        {/* Gradient Top Accent Line */}
        <div
          className={`
            absolute
            top-0
            left-0
            right-0
            z-30
            h-[3px]
            bg-gradient-to-r
            ${c.ring}
            opacity-70
            transition-opacity
            duration-500
            group-hover:opacity-100
          `}
        />

        {/* Gradient Left Accent Line (top to bottom) */}
        <div
          className={`
            absolute
            top-0
            left-0
            bottom-0
            z-30
            w-[3px]
            bg-gradient-to-b
            ${c.ring}
            opacity-70
            transition-opacity
            duration-500
            group-hover:opacity-100
          `}
        />

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
                  border-orange-500/40
                  bg-orange-500/10
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  text-orange-400
                  backdrop-blur-md
                  whitespace-nowrap
                  shrink-0
                  shadow-lg
                  shadow-orange-500/10
                  transition-all
                  duration-300
                  group-hover:border-orange-500/70
                  group-hover:bg-orange-500/20
                  group-hover:text-orange-300
                  group-hover:shadow-orange-500/25
                  group-hover:translate-x-0.5
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
    </Link>
  );
}