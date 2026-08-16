"use client";

import { bodyData } from "./bodyData";
import { bodyColorMap, defaultBodyColor } from "./bodyColors";
import Link from "next/link";

type Props = {
  selected: string;
  mobile?: boolean;
  anchor?: {
    top: string;
    left: string;
    cardSide: "left" | "right";
    cardVertical?: "above";
    cardUp?: string;
  };
};

export default function PopupCard({ selected, mobile = false, anchor }: Props) {
  const data = bodyData.find((item) => item.id === selected);

  if (!data) return null;

  const c = bodyColorMap[data.badgeColor] ?? defaultBodyColor;

  return (
    <>
      {/* Connector Line (container-coordinate sibling so it stays pinned to the
          hotspot regardless of cardUp vertical shifts) */}
      {!mobile && anchor && anchor.cardUp && (
        <>
          <div
            className="absolute z-30 h-[2px] w-40"
            style={{
              top: `calc(${anchor.top} - 1px)`,
              left: anchor.cardSide === "left"
                ? `calc(${anchor.left} - 10rem)`
                : anchor.left,
            }}
          >
            <div className={`h-full w-full ${c.line}`} />
          </div>
          <div
            className={`absolute z-50 h-4 w-4 rounded-full ${c.dot} ${c.glow}`}
            style={{
              top: `calc(${anchor.top} - 0.5rem)`,
              left: anchor.cardSide === "left"
                ? `calc(${anchor.left} - 10rem - 0.5rem)`
                : `calc(${anchor.left} + 10rem - 0.5rem)`,
            }}
          />
        </>
      )}

      <div
        className={`
        ${mobile ? "relative" : "absolute"}
        z-40
        w-full
        max-w-[340px]
        ${mobile ? "mx-auto" : ""}
        rounded-3xl
        border
        ${c.border}
        bg-black/80
        backdrop-blur-2xl
        p-5 sm:p-6
        ${c.shadow}
        transition-all
        duration-500
        ease-out
      `}
        style={mobile || !anchor ? undefined : anchor.cardVertical === "above" ? {
          bottom: `calc(100% - ${anchor.top} - 2.5rem)`,
          left: anchor.left,
          transform: anchor.cardSide === "left"
            ? "translateX(calc(-100% - 10rem))"
            : "translateX(10rem)",
        } : {
          top: `calc(${anchor.top} - 2.5rem${anchor.cardUp ? ` - ${anchor.cardUp}` : ""})`,
          left: anchor.left,
          transform: anchor.cardSide === "left"
            ? "translateX(calc(-100% - 10rem))"
            : "translateX(10rem)",
        }}
      >

      {/* Connector Line */}
      {!mobile && anchor && !anchor.cardUp && (anchor.cardSide === "left" ? (
        <>
            <div className={`absolute -right-40 h-[2px] w-40 ${c.line} ${anchor.cardVertical === "above" ? "bottom-10" : "top-10"}`} />
            <div className={`absolute -right-2 h-4 w-4 rounded-full ${c.dot} ${c.glow} ${anchor.cardVertical === "above" ? "bottom-8" : "top-8"}`} />
        </>
        ) : (
        <>
            <div className={`absolute -left-40 h-[2px] w-40 ${c.line} ${anchor.cardVertical === "above" ? "bottom-10" : "top-10"}`} />
            <div className={`absolute -left-2 h-4 w-4 rounded-full ${c.dot} ${c.glow} ${anchor.cardVertical === "above" ? "bottom-8" : "top-8"}`} />
        </>
        ))}

      {/* Icon */}
      <div className="text-4xl">{data.icon}</div>

      {/* Title */}
      <h3 className="mt-4 text-2xl font-bold text-white">
        {data.title}
      </h3>

      {/* Subtitle */}
      <p className={`mt-1 text-sm uppercase tracking-[0.3em] ${c.text}`}>
        {data.subtitle}
      </p>

      {/* Description */}
      <p className="mt-5 leading-7 text-gray-400">
        {data.description}
      </p>

      {/* Features */}
      <div className="mt-6 space-y-3">
        {data.features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-3"
          >
            <div className={`h-2 w-2 rounded-full ${c.dot}`} />

            <span className="text-white">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <Link
        href={data.link}
        className={`
          mt-8
          block
          w-full
          rounded-xl
          border
          py-3
          text-center
          font-semibold
          transition-all
          ${c.btn}
        `}
      >
        Learn More
      </Link>
    </div>
    </>
  );
}
