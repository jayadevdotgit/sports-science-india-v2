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
        border
        border-orange-500/20
        bg-black/60
        backdrop-blur-md
        hover:border-orange-500/60
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]
        active:scale-[0.97]
        `}
      >
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
            duration-700
            ease-out
            group-hover:scale-105
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
            group-hover:opacity-90
          "
        />

        {/* Orange Accent Glow on Hover */}
        <div
          className="
            absolute
            -inset-1
            bg-gradient-to-r
            from-orange-500/0
            via-orange-500/10
            to-orange-500/0
            opacity-0
            blur-xl
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

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
            justify-between
            p-5
            sm:p-6
          "
        >
          {/* Top Section: Category & Title */}
          <div>
            <span
              className={`
                inline-block
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
                transition-transform
                duration-300
                group-hover:scale-105
                ${
                  badgeColor === "orange"
                    ? "bg-orange-500/20 border-orange-500/40 text-orange-300"
                    : badgeColor === "blue"
                    ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                    : badgeColor === "gold"
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                    : badgeColor === "purple"
                    ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                    : badgeColor === "cyan"
                    ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                    : badgeColor === "green"
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                    : badgeColor === "amber"
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                    : badgeColor === "rose"
                    ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                    : "bg-orange-500/20 border-orange-500/40 text-orange-300"
                }
              `}
            >
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
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div>
                  <p className="text-lg sm:text-xl font-semibold text-white leading-tight">
                    {stats1}
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400">
                    {label1}
                  </p>
                </div>

                <div className="h-8 w-px bg-white/10" />

                <div>
                  <p className="text-lg sm:text-xl font-semibold text-white leading-tight">
                    {stats2}
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400">
                    {label2}
                  </p>
                </div>
              </div>

              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  text-sm
                  font-bold
                  text-orange-400
                  transition-all
                  duration-300
                  group-hover:text-orange-300
                  group-hover:translate-x-1
                "
              >
                {button}
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
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