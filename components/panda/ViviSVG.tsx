"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Props = {
  blinking: boolean;
  thinking: boolean;
  idle: boolean;
  waving: boolean;
  bouncing: boolean;
  walking: boolean;
  hovering: boolean;
};

function qs(root: Element | null, sel: string): HTMLElement | SVGElement | null {
  return (root?.querySelector(sel) as HTMLElement | SVGElement | null) ?? null;
}

export default function ViviSVG({ blinking, thinking, idle, waving, bouncing, walking, hovering }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/mascot/vivi.svg")
      .then((r) => r.text())
      .then((m) => { if (active) setSvgMarkup(m); })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  // Wait until SVG is in the DOM, then run all setups
  const initialisedRef = useRef(false);
  useLayoutEffect(() => {
    if (!svgMarkup || initialisedRef.current) return;
    initialisedRef.current = true;
  }, [svgMarkup]);

  // Blinking
  useEffect(() => {
    const svg = qs(hostRef.current, "svg");
    const eyelids = qs(svg, "#eyelids");
    if (!eyelids) return;
    eyelids.style.opacity = blinking ? "1" : "0";
    eyelids.style.transition = "opacity 70ms ease";
  }, [blinking, svgMarkup]);

  // Waving + idle tail + paws
  useEffect(() => {
    const svg = qs(hostRef.current, "svg");
    const tail = qs(svg, "#tail");
    const leftPaw = qs(svg, "#left-paw");
    const rightPaw = qs(svg, "#right-paw");

    if (tail) {
      tail.style.transformBox = "fill-box";
      tail.style.transformOrigin = "right center";
      tail.style.animation = "";
      if (waving) {
        tail.style.animation = "vivi-tail-wave 0.35s ease-in-out 4";
      } else if (idle) {
        tail.style.animation = "vivi-tail-idle 2.8s ease-in-out infinite";
      }
    }
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
  }, [waving, idle, svgMarkup]);

  // Thinking → ear twitch
  useEffect(() => {
    const svg = qs(hostRef.current, "svg");
    const ears = qs(svg, "#ears");
    if (!ears) return;
    ears.style.transformBox = "fill-box";
    ears.style.transformOrigin = "center bottom";
    ears.style.animation = thinking ? "vivi-ears-twitch 0.25s ease-in-out 3" : "";
  }, [thinking, svgMarkup]);

  // Bouncing
  useEffect(() => {
    const svg = qs(hostRef.current, "svg");
    const face = qs(svg, "#face");
    if (!face) return;
    face.style.transformBox = "fill-box";
    face.style.transformOrigin = "center";
    face.style.animation = bouncing ? "vivi-bounce 0.4s ease" : "";
  }, [bouncing, svgMarkup]);

  // Mouth expression
  useEffect(() => {
    const svg = qs(hostRef.current, "svg");
    const neutral = qs(svg, "#mouth-neutral");
    const happy = qs(svg, "#mouth-happy");
    const thinkingMouth = qs(svg, "#mouth-thinking");
    if (!neutral || !happy || !thinkingMouth) return;
    neutral.style.display = "none";
    happy.style.display = "none";
    thinkingMouth.style.display = "none";
    if (thinking) thinkingMouth.style.display = "inline";
    else if (hovering) happy.style.display = "inline";
    else neutral.style.display = "inline";
  }, [thinking, hovering, svgMarkup]);

  // Walking legs
  useEffect(() => {
    const svg = qs(hostRef.current, "svg");
    const legLeft = qs(svg, "#leg-left");
    const legRight = qs(svg, "#leg-right");
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
  }, [walking, svgMarkup]);

  // Idle breathing
  useEffect(() => {
    const svg = qs(hostRef.current, "svg");
    if (!svg) return;
    svg.style.animation = idle && !walking ? "vivi-idle-breathe 4s ease-in-out infinite" : "";
  }, [idle, walking, svgMarkup]);

  // Eye tracking (follows pointer) + idle look-around
  useEffect(() => {
    const svg = qs(hostRef.current, "svg");
    const leftPupil = qs(svg, "#left-eye");
    const rightPupil = qs(svg, "#right-eye");
    if (!leftPupil || !rightPupil) return;
    const lp = leftPupil;
    const rp = rightPupil;

    const rect = svg!.getBoundingClientRect();
    const vw = rect.width;
    const vh = rect.height;
    if (vw === 0 || vh === 0) return;

    const cxL = rect.left + vw * (138 / 360);
    const cyL = rect.top + vh * (148 / 380);
    const cxR = rect.left + vw * (222 / 360);
    const cyR = rect.top + vh * (148 / 380);
    const cxC = (cxL + cxR) / 2;
    const cyC = (cyL + cyR) / 2;

    const maxMove = 4;
    const scale = (d: number) => Math.min(Math.sqrt(d * d), 200) / 200;
    const clamp = (v: number) => Math.max(-maxMove, Math.min(maxMove, v));

    let rafId = 0;
    let mx = 0, my = 0;
    let lookX = 0, lookY = 0;
    let curX = 0, curY = 0;
    let lookTimer: ReturnType<typeof setTimeout> | null = null;

    function apply(px: number, py: number) {
      const sL = scale(px - cxL) * 0.3, sR = scale(px - cxR) * 0.3;
      lp.style.transform = `translate(${clamp((px - cxL) * sL)}px,${clamp((py - cyL) * sL)}px)`;
      rp.style.transform = `translate(${clamp((px - cxR) * sR)}px,${clamp((py - cyR) * sR)}px)`;
    }

    function lookAround() {
      lookX = cxC + (Math.random() * 2 - 1) * 90;
      lookY = cyC + (Math.random() * 2 - 1) * 60;
      curX = lookX; curY = lookY;
    }

    function update() {
      rafId = 0;
      if (idle) {
        curX += (lookX - curX) * 0.12;
        curY += (lookY - curY) * 0.12;
        apply(curX, curY);
        if (Math.abs(lookX - curX) > 0.5 || Math.abs(lookY - curY) > 0.5) {
          rafId = requestAnimationFrame(update);
        }
      } else {
        apply(mx, my);
      }
    }

    function onMove(e: PointerEvent) {
      mx = e.clientX; my = e.clientY;
      if (!idle && !rafId) rafId = requestAnimationFrame(() => { rafId = 0; update(); });
    }

    if (idle) {
      lookAround();
      lookTimer = setInterval(() => {
        lookAround();
        if (!rafId) rafId = requestAnimationFrame(() => { rafId = 0; update(); });
      }, 2600);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
      if (lookTimer) clearInterval(lookTimer);
    };
  }, [idle, svgMarkup]);

  if (!svgMarkup) return <div className="w-full h-full" />;

  return (
    <div
      ref={hostRef}
      className={`${waving && !walking ? "animate-vivi-wave" : ""} ${walking ? "animate-vivi-walk-cycle" : ""} w-full h-full`}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
