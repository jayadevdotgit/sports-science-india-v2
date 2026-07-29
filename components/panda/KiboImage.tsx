"use client";

import Image from "next/image";

const SIZE = 250;

type Props = {
  blinking: boolean;
  thinking: boolean;
  idle: boolean;
  waving: boolean;
  bouncing: boolean;
};

export default function KiboImage({
  blinking,
  thinking,
  idle,
  waving,
  bouncing,
}: Props) {
  const motionClass = bouncing
    ? "animate-[kibo-bounce_0.45s_ease-out]"
    : waving
      ? "animate-[kibo-wave_0.7s_ease-in-out_2]"
      : idle
        ? "animate-[kibo-breathe_3.8s_ease-in-out_infinite]"
        : "";

  return (
    <div className={`relative h-[250px] w-[250px] origin-bottom transition-transform duration-300 group-hover:scale-[1.06] group-hover:brightness-110 ${motionClass}`}>
      <Image
        src="/mascot/kibo.png"
        alt="Kibo"
        width={SIZE}
        height={SIZE}
        sizes={`${SIZE}px`}
        priority
        draggable={false}
        className="h-auto w-24 select-none pointer-events-none"
      />

      {/* A lightweight eyelid treatment until Kibo moves to an animatable SVG. */}
      <div
        aria-hidden="true"
        className={`absolute left-[29%] top-[34%] h-[13%] w-[16%] rounded-full bg-[#8c330f] transition-transform duration-75 ${
          blinking ? "scale-y-100" : "scale-y-0"
        }`}
      />
      <div
        aria-hidden="true"
        className={`absolute left-[56%] top-[34%] h-[13%] w-[16%] rounded-full bg-[#8c330f] transition-transform duration-75 ${
          blinking ? "scale-y-100" : "scale-y-0"
        }`}
      />

      {thinking && (
        <span
          aria-label="Kibo is thinking"
          className="absolute -right-1 -top-2 rounded-full bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white shadow-[0_0_12px_rgba(249,115,22,0.7)] animate-pulse"
        >
          ···
        </span>
      )}
    </div>
  );
}
