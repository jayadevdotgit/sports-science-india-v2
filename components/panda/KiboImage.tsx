"use client";

import Image from "next/image";

export default function KiboImage() {
  return (
    <Image
      src="/mascot/kibo.png"
      alt="Kibo"
      width={96}
      height={96}
      priority
      draggable={false}
      className="w-24 h-auto select-none pointer-events-none"
    />
  );
}