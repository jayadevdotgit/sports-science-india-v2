"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  blinking: boolean;
  thinking: boolean;
  idle: boolean;
  waving: boolean;
  bouncing: boolean;
  walking: boolean;
  hovering: boolean;
};

export default function ViviSVG({ blinking, thinking, idle, waving, bouncing, walking, hovering }: Props) {
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

  // Blinking
  useEffect(() => {
    const svg = hostRef.current?.querySelector("svg");
    if (!svg) return;
    const eyelids = svg.querySelector<SVGGElement>("#eyelids");
    if (!eyelids) return;
    eyelids.style.opacity = blinking ? "1" : "0";
    eyelids.style.transition = "opacity 70ms ease";
  }, [blinking, svgMarkup]);

  // Waving + idle tail + paws
  useEffect(() => {
    const svg = hostRef.current?.querySelector("svg");
    if (!svg) return;
    const tail = svg.querySelector<SVGGElement>("#tail");
    const leftPaw = svg.querySelector<SVGGElement>("#left-paw");
    const rightPaw = svg.querySelector<SVGGElement>("#right-paw");

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
    const svg = hostRef.current?.querySelector("svg");
    if (!svg) return;
    const ears = svg.querySelector<SVGGElement>("#ears");
    if (!ears) return;
    ears.style.transformBox = "fill-box";
    ears.style.transformOrigin = "center bottom";
    ears.style.animation = thinking ? "vivi-ears-twitch 0.25s ease-in-out 3" : "";
  }, [thinking, svgMarkup]);

  // Bouncing
  useEffect(() => {
    const svg = hostRef.current?.querySelector("svg");
    if (!svg) return;
    const face = svg.querySelector<SVGGElement>("#face");
    if (!face) return;
    face.style.transformBox = "fill-box";
    face.style.transformOrigin = "center";
    face.style.animation = bouncing ? "vivi-bounce 0.4s ease" : "";
  }, [bouncing, svgMarkup]);

  // Mouth: thinking / hover / neutral
  useEffect(() => {
    const svg = hostRef.current?.querySelector("svg");
    if (!svg) return;
    const neutral = svg.querySelector<SVGGElement>("#mouth-neutral");
    const happy = svg.querySelector<SVGGElement>("#mouth-happy");
    const thinkingMouth = svg.querySelector<SVGGElement>("#mouth-thinking");
    if (!neutral || !happy || !thinkingMouth) return;
    neutral.style.display = "none";
    happy.style.display = "none";
    thinkingMouth.style.display = "none";
    if (thinking) {
      thinkingMouth.style.display = "inline";
    } else if (hovering) {
      happy.style.display = "inline";
    } else {
      neutral.style.display = "inline";
    }
  }, [thinking, hovering, svgMarkup]);

  // Walking legs
  useEffect(() => {
    const svg = hostRef.current?.querySelector("svg");
    if (!svg) return;
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
  }, [walking, svgMarkup]);

  // Idle breathing
  useEffect(() => {
    const svg = hostRef.current?.querySelector("svg");
    if (!svg) return;
    svg.style.animation = idle && !walking ? "vivi-idle-breathe 4s ease-in-out infinite" : "";
  }, [idle, walking, svgMarkup]);

  // Eye tracking: own mousemove listener + rAF throttle
  useEffect(() => {
    const svg = hostRef.current?.querySelector("svg");
    if (!svg) return;
    const leftPupil = svg.querySelector<SVGGElement>("#left-eye");
    const rightPupil = svg.querySelector<SVGGElement>("#right-eye");
    if (!leftPupil || !rightPupil) return;
    const lp = leftPupil;
    const rp = rightPupil;

    const rect = svg.getBoundingClientRect();
    const vw = rect.width;
    const vh = rect.height;
    if (vw === 0 || vh === 0) return;

    const cxL = rect.left + vw * (138 / 360);
    const cyL = rect.top + vh * (148 / 380);
    const cxR = rect.left + vw * (222 / 360);
    const cyR = rect.top + vh * (148 / 380);

    const maxMove = 4;
    let rafId = 0;
    let mx = 0;
    let my = 0;

    function update() {
      const dxL = mx - cxL, dyL = my - cyL;
      const dxR = mx - cxR, dyR = my - cyR;
      const distL = Math.sqrt(dxL * dxL + dyL * dyL);
      const distR = Math.sqrt(dxR * dxR + dyR * dyR);
      const factorL = Math.min(distL, 200) / 200;
      const factorR = Math.min(distR, 200) / 200;
      lp.style.transform = `translate(${Math.max(-maxMove, Math.min(maxMove, dxL * factorL * 0.3))}px, ${Math.max(-maxMove, Math.min(maxMove, dyL * factorL * 0.3))}px)`;
      rp.style.transform = `translate(${Math.max(-maxMove, Math.min(maxMove, dxR * factorR * 0.3))}px, ${Math.max(-maxMove, Math.min(maxMove, dyR * factorR * 0.3))}px)`;
    }

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(() => { rafId = 0; update(); });
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [svgMarkup]);

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
