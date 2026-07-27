"use client";

import Image from "next/image";
const SIZE = 96;
export default function KiboImage() {
  return (
    <Image
      src="/mascot/kibo.png"
      alt="Kibo"
      width={SIZE}
      height={SIZE}
      sizes={`${SIZE}px`}
      priority
      draggable={false}
      className="w-24 h-auto select-none pointer-events-none"
    />
  );
}