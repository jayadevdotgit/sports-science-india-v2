import Image from "next/image";
import Hotspot from "./Hotspot";
import PopupCard from "./PopupCard";

type Props = {
  selected: string;
  onSelect: (id: string) => void;
};

const hotspots = [
  { id: "brain", top: "3%", left: "50%", cardSide: "right" as const },
  { id: "neck", top: "13%", left: "50%", cardSide: "right" as const },
  { id: "shoulder", top: "19%", left: "40%", cardSide: "right" as const },
  { id: "lungs", top: "26%", left: "44%", cardSide: "right" as const },
  { id: "heart", top: "28%", left: "53%", cardSide: "right" as const },
  { id: "elbow", top: "35%", left: "38%", cardSide: "right" as const },
  { id: "core", top: "35%", left: "50%", cardSide: "right" as const },
  { id: "spine", top: "42%", left: "50%", cardSide: "left" as const },
  { id: "wrist", top: "47%", left: "35%", cardSide: "left" as const, cardUp: "15%" as const },
  { id: "hip", top: "47%", left: "42%", cardSide: "right" as const, cardUp: "15%" as const },
  { id: "knee", top: "76%", left: "55%", cardSide: "right" as const, cardVertical: "above" as const },
  { id: "ankle", top: "92%", left: "54%", cardSide: "left" as const, cardVertical: "above" as const },
];

export default function HumanBody({
  selected,
  onSelect,
}: Props) {
  const selectedHotspot = hotspots.find((hotspot) => hotspot.id === selected);

  return (
    <div className="relative mx-auto flex w-full max-w-[320px] flex-col items-center justify-center sm:max-w-[520px] lg:max-w-[620px] xl:max-w-[680px]">

      {/* BODY CONTAINER */}
      {/* The SVG viewBox is square. This matching wrapper keeps percentage-based
          hotspot coordinates locked to the artwork at every viewport width. */}
      <div className="relative aspect-square w-full">

        {/* Glow */}
        <div className="absolute left-1/2 top-1/2 h-[80%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-[120px] pointer-events-none" />

        <div className="absolute left-1/2 top-1/2 h-[60%] w-[53%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/20 blur-[80px] pointer-events-none" />

        {/* Rings */}
        <div className="absolute left-1/2 top-1/2 h-[84%] w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/20 pointer-events-none" />

        <div className="absolute left-1/2 top-1/2 h-[63%] w-[63%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/10 pointer-events-none" />

        {/* Rotating Cyber Ring */}
        <div className="absolute left-1/2 top-1/2 h-[98%] w-[98%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-orange-500/25 animate-[spin_40s_linear_infinite] pointer-events-none" />

        <Image
          src="/images/ecosystem/human-body.svg"
          alt="Human Body"
          fill
          className="object-contain pointer-events-none"
        />

        {hotspots.map((hotspot) => (
          <Hotspot
            key={hotspot.id}
            id={hotspot.id}
            top={hotspot.top}
            left={hotspot.left}
            selected={selected}
            onSelect={onSelect}
          />
        ))}

        {/* POPUP */}

        <div className="hidden lg:block">
          <PopupCard selected={selected} anchor={selectedHotspot} />
        </div>

      </div>

      {/* A normal-flow card prevents the overlay from clipping or covering the
          body map on narrow screens. */}
      <div className="mt-5 w-full sm:mt-6 lg:hidden">
        <PopupCard selected={selected} mobile />
      </div>
    </div>
  );
}
