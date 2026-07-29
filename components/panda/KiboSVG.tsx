"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  blinking: boolean;
  thinking: boolean;
  idle: boolean;
  waving: boolean;
  bouncing: boolean;
};

export default function KiboSVG({ blinking, thinking, idle, waving, bouncing }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/mascot/kibo-red-panda.svg")
      .then((response) => response.text())
      .then((markup) => {
        if (active) setSvgMarkup(markup);
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const svg = hostRef.current?.querySelector("svg");
    if (!svg) return;

    const eyelids = svg.querySelector<SVGGElement>("#eyelids");
    if (eyelids) {
      eyelids.style.opacity = blinking ? "1" : "0";
      eyelids.style.transition = "opacity 70ms ease";
    }

    const tail = svg.querySelector<SVGGElement>("#tail");
    const ears = svg.querySelector<SVGGElement>("#ears");
    if (tail) {
      tail.style.transformBox = "fill-box";
      tail.style.transformOrigin = "center";
      tail.style.animation = waving
        ? "kibo-tail-wave 0.35s ease-in-out 4"
        : idle
          ? "kibo-tail-idle 2.8s ease-in-out infinite"
          : "";
    }
    if (ears) {
      ears.style.transformBox = "fill-box";
      ears.style.transformOrigin = "center top";
      ears.style.animation = idle ? "kibo-ear-twitch 4.6s ease-in-out infinite" : "";
    }
  }, [blinking, idle, waving, svgMarkup]);

  useEffect(() => {
    const followPointer = (event: PointerEvent) => {
      const svg = hostRef.current?.querySelector("svg");
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const x = Math.max(-3, Math.min(3, ((event.clientX - rect.left) / rect.width - 0.5) * 8));
      const y = Math.max(-2, Math.min(2, ((event.clientY - rect.top) / rect.height - 0.42) * 6));

      ["#left-eye", "#right-eye"].forEach((selector) => {
        const eye = svg.querySelector<SVGGElement>(selector);
        if (!eye) return;
        eye.style.transformBox = "fill-box";
        eye.style.transformOrigin = "center";
        eye.style.transform = `translate(${x}px, ${y}px)`;
        eye.style.transition = "transform 120ms ease-out";
      });
    };

    window.addEventListener("pointermove", followPointer, { passive: true });
    return () => window.removeEventListener("pointermove", followPointer);
  }, [svgMarkup]);

  const motionClass = bouncing
    ? "animate-[kibo-bounce_0.45s_ease-out]"
    : idle
      ? "animate-[kibo-breathe_3.8s_ease-in-out_infinite]"
      : "";

  return (
    <div className={`relative h-24 w-24 origin-bottom transition-transform duration-300 group-hover:scale-[1.06] ${motionClass}`}>
      <div
        ref={hostRef}
        aria-label="VIVI, your red panda AI assistant"
        className="h-24 w-24 [&_svg]:h-full [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
      {thinking && (
        <span className="absolute -right-2 -top-3 rounded-full bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white shadow-[0_0_12px_rgba(249,115,22,0.7)] animate-pulse">
          💭
        </span>
      )}
    </div>
  );
}
