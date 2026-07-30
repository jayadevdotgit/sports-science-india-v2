"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  blinking: boolean;
  thinking: boolean;
  idle: boolean;
  waving: boolean;
  bouncing: boolean;
  walking: boolean;
  hovering: boolean;
  mouseX: number;
  mouseY: number;
};

export default function ViviSVG({ blinking, thinking, idle, waving, bouncing, walking, hovering, mouseX, mouseY }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/mascot/vivi.svg")
      .then((response) => response.text())
      .then((markup) => {
        if (active) setSvgMarkup(markup);
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  const prevRef = useRef({ blinking: false, thinking: false, idle: false, waving: false, bouncing: false, walking: false, hovering: false });

  const apply = useCallback(() => {
    const svg = hostRef.current?.querySelector("svg");
    if (!svg) return;

    const p = prevRef.current;
    const n = { blinking, thinking, idle, waving, bouncing, walking, hovering };

    if (p.blinking !== n.blinking) {
      const eyelids = svg.querySelector<SVGGElement>("#eyelids");
      if (eyelids) {
        eyelids.style.opacity = blinking ? "1" : "0";
        eyelids.style.transition = "opacity 70ms ease";
      }
    }

    if (p.waving !== n.waving || p.idle !== n.idle) {
      const tail = svg.querySelector<SVGGElement>("#tail");
      if (tail) {
        tail.style.transformBox = "fill-box";
        tail.style.transformOrigin = "right center";
        tail.style.animation = "";
        void (tail as unknown as HTMLElement).offsetWidth;
        if (waving) {
          tail.style.animation = "vivi-tail-wave 0.35s ease-in-out 4";
        } else if (idle) {
          tail.style.animation = "vivi-tail-idle 2.8s ease-in-out infinite";
        } else {
          tail.style.animation = "";
        }
      }

      const leftPaw = svg.querySelector<SVGGElement>("#left-paw");
      const rightPaw = svg.querySelector<SVGGElement>("#right-paw");
      if (leftPaw) {
        leftPaw.style.transformBox = "fill-box";
        leftPaw.style.transformOrigin = "center bottom";
        leftPaw.style.animation = waving ? "vivi-paw-raise-left 0.35s ease-in-out 4" : "";
      }
      if (rightPaw) {
        rightPaw.style.transformBox = "fill-box";
        rightPaw.style.transformOrigin = "center bottom";
        rightPaw.style.animation = waving ? "vivi-paw-raise-right 0.35s ease-in-out 4" : "";
      }
    }

    if (p.thinking !== n.thinking) {
      const ears = svg.querySelector<SVGGElement>("#ears");
      if (ears) {
        ears.style.transformBox = "fill-box";
        ears.style.transformOrigin = "center bottom";
        ears.style.animation = thinking ? "vivi-ears-twitch 0.25s ease-in-out 3" : "";
      }
    }

    if (p.bouncing !== n.bouncing) {
      const face = svg.querySelector<SVGGElement>("#face");
      if (face) {
        face.style.transformBox = "fill-box";
        face.style.transformOrigin = "center";
        face.style.animation = bouncing ? "vivi-bounce 0.4s ease" : "";
      }
    }

    if (p.thinking !== n.thinking || p.hovering !== n.hovering) {
      const neutral = svg.querySelector<SVGGElement>("#mouth-neutral");
      const happy = svg.querySelector<SVGGElement>("#mouth-happy");
      const thinkingMouth = svg.querySelector<SVGGElement>("#mouth-thinking");
      if (neutral) neutral.style.display = "none";
      if (happy) happy.style.display = "none";
      if (thinkingMouth) thinkingMouth.style.display = "none";
      if (thinking) {
        if (thinkingMouth) thinkingMouth.style.display = "inline";
      } else if (hovering) {
        if (happy) happy.style.display = "inline";
      } else {
        if (neutral) neutral.style.display = "inline";
      }
    }

    if (p.walking !== n.walking) {
      const legs = svg.querySelector<SVGGElement>("#legs");
      if (legs) {
        legs.style.transformBox = "fill-box";
        legs.style.transformOrigin = "center top";
        legs.style.animation = walking ? "vivi-walk 0.5s ease-in-out infinite" : "";
      }
      const legLeft = svg.querySelector<SVGGElement>("#leg-left");
      const legRight = svg.querySelector<SVGGElement>("#leg-right");
      if (legLeft) {
        legLeft.style.transformBox = "fill-box";
        legLeft.style.transformOrigin = "center top";
        legLeft.style.animation = walking ? "vivi-walk-left 0.5s ease-in-out infinite" : "";
      }
      if (legRight) {
        legRight.style.transformBox = "fill-box";
        legRight.style.transformOrigin = "center top";
        legRight.style.animation = walking ? "vivi-walk-right 0.5s ease-in-out infinite" : "";
      }
    }

    if (p.idle !== n.idle) {
      const svgEl = svg;
      svgEl.style.animation = idle && !walking ? "vivi-idle-breathe 4s ease-in-out infinite" : "";
    }

    prevRef.current = n;
  }, [blinking, thinking, idle, waving, bouncing, walking, hovering]);

  useEffect(() => {
    apply();
  }, [apply]);

  useEffect(() => {
    const svg = hostRef.current?.querySelector("svg");
    if (!svg) return;
    const leftPupil = svg.querySelector<SVGGElement>("#left-eye");
    const rightPupil = svg.querySelector<SVGGElement>("#right-eye");
    if (!leftPupil || !rightPupil) return;

    const rect = svg.getBoundingClientRect();
    const vw = rect.width;
    const vh = rect.height;
    if (vw === 0 || vh === 0) return;

    // Pupil centers in SVG coordinate space (viewBox 360x380)
    const pupilCxL = 138;
    const pupilCyL = 148;
    const pupilCxR = 222;
    const pupilCyR = 148;

    const cxL = rect.left + vw * (pupilCxL / 360);
    const cyL = rect.top + vh * (pupilCyL / 380);
    const cxR = rect.left + vw * (pupilCxR / 360);
    const cyR = rect.top + vh * (pupilCyR / 380);

    const maxMove = 4;

    const calcOffset = (cx: number, cy: number) => {
      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 200;
      const factor = Math.min(dist, maxDist) / maxDist;
      return {
        x: Math.max(-maxMove, Math.min(maxMove, dx * factor * 0.3)),
        y: Math.max(-maxMove, Math.min(maxMove, dy * factor * 0.3)),
      };
    };

    const offL = calcOffset(cxL, cyL);
    const offR = calcOffset(cxR, cyR);

    leftPupil.style.transform = `translate(${offL.x}px, ${offL.y}px)`;
    rightPupil.style.transform = `translate(${offR.x}px, ${offR.y}px)`;
  }, [mouseX, mouseY]);

  if (!svgMarkup) return <div style={{ width: 96, height: 96 }} />;

  return (
    <div
      ref={hostRef}
      className={`${waving && !walking ? "animate-vivi-wave" : ""} ${walking ? "animate-vivi-walk-cycle" : ""}`}
      style={{ width: 96, height: 96 }}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
