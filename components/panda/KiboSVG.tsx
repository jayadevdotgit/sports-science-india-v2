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
      ears.style.transformOrigin = "center";
      ears.style.animation = thinking
        ? "kibo-ears-twitch 0.25s ease-in-out 3"
        : "";
    }

    const face = svg.querySelector<SVGGElement>("#face");
    if (face) {
      face.style.transformBox = "fill-box";
      face.style.transformOrigin = "center";
      face.style.animation = bouncing
        ? "kibo-bounce 0.4s ease"
        : "";
    }
  }, [blinking, thinking, idle, waving, bouncing]);

  if (!svgMarkup) return <div style={{ width: 96, height: 96 }} />;

  return (
    <div
      ref={hostRef}
      className={`${waving ? "animate-kibo-wave" : ""} ${idle ? "animate-float" : ""}`}
      style={{ width: 96, height: 96 }}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
