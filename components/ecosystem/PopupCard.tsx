"use client";

import { bodyData } from "./bodyData";

type Props = {
  selected: string;
  mobile?: boolean;
  anchor?: {
    top: string;
    left: string;
    cardSide: "left" | "right";
    cardVertical?: "above";
  };
};

export default function PopupCard({ selected, mobile = false, anchor }: Props) {
  const data = bodyData.find((item) => item.id === selected);

  if (!data) return null;

  return (
    <div
      className={`
        ${mobile ? "relative" : "absolute"}
        z-40
        w-full
        max-w-[340px]
        rounded-3xl
        border
        border-orange-500/20
        bg-black/80
        backdrop-blur-2xl
        p-5 sm:p-6
        shadow-[0_20px_80px_rgba(249,115,22,0.25)]
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
        top: `calc(${anchor.top} - 2.5rem)`,
        left: anchor.left,
        transform: anchor.cardSide === "left"
          ? "translateX(calc(-100% - 10rem))"
          : "translateX(10rem)",
      }}
    >

      {/* Connector Line */}
      {!mobile && anchor && (anchor.cardSide === "left" ? (
        <>
            <div className={`absolute -right-40 h-[2px] w-40 bg-orange-500/60 ${anchor.cardVertical === "above" ? "bottom-10" : "top-10"}`} />
            <div className={`absolute -right-2 h-4 w-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,1)] ${anchor.cardVertical === "above" ? "bottom-8" : "top-8"}`} />
        </>
        ) : (
        <>
            <div className={`absolute -left-40 h-[2px] w-40 bg-orange-500/60 ${anchor.cardVertical === "above" ? "bottom-10" : "top-10"}`} />
            <div className={`absolute -left-2 h-4 w-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,1)] ${anchor.cardVertical === "above" ? "bottom-8" : "top-8"}`} />
        </>
        ))}

      {/* Icon */}
      <div className="text-4xl">{data.icon}</div>

      {/* Title */}
      <h3 className="mt-4 text-2xl font-bold text-white">
        {data.title}
      </h3>

      {/* Subtitle */}
      <p className="mt-1 text-sm uppercase tracking-[0.3em] text-orange-500">
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
            <div className="h-2 w-2 rounded-full bg-orange-500" />

            <span className="text-white">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <button
        className="
          mt-8
          w-full
          rounded-xl
          border
          border-orange-500
          bg-orange-500/10
          py-3
          font-semibold
          text-orange-400
          transition-all
          hover:bg-orange-500
          hover:text-white
        "
      >
        Learn More
      </button>
    </div>
  );
}
