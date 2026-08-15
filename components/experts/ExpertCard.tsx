"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Award, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/animations/Reveal";

type ExpertCardProps = {
  image: string;
  name: string;
  role: string;
  experience: string;
  specialties: string[];
};

export default function ExpertCard({
  image,
  name,
  role,
  experience,
  specialties,
}: ExpertCardProps) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <Reveal className="h-full w-full">
      <div
        className="
          group
          relative
          flex
          h-full
          w-full
          flex-col
          overflow-hidden
          rounded-3xl
          border border-orange-500/20
          bg-gradient-to-b from-[#121014] via-[#0d0d0d] to-[#0a0a0c]
          min-h-[380px]
          p-5
          sm:min-h-[420px]
          sm:p-8
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-orange-500/50
          hover:shadow-[0_25px_70px_rgba(249,115,22,0.18)]
        "
      >
        {/* Top accent glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-orange-500/15 blur-3xl transition-all duration-500 group-hover:bg-orange-500/25" />

        {/* Shine sweep on hover */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

        {/* Photo */}
        <div className="relative mx-auto mt-1">
          <div className="absolute inset-0 rounded-full bg-orange-500/30 blur-2xl opacity-60 transition-all duration-500 group-hover:opacity-100" />
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-orange-500/40 bg-gradient-to-br from-[#2a1f1a] via-[#18110d] to-black transition-all duration-500 group-hover:scale-105 group-hover:border-orange-400 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] sm:h-28 sm:w-28">
            {imageUnavailable ? (
              <span className="text-2xl font-black tracking-tight text-orange-300 sm:text-3xl">
                {initials}
              </span>
            ) : (
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 640px) 96px, 112px"
                onError={() => setImageUnavailable(true)}
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
              />
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="mt-4 flex min-h-12 items-center justify-center text-center text-base font-bold text-white leading-snug sm:text-lg">
          {name}
        </h3>

        {/* Role */}
        <p className="mt-1 flex min-h-20 items-center justify-center text-center text-sm font-medium leading-5 text-orange-400 break-words">
          {role}
        </p>

        {/* Experience pill */}
        <div className="mt-2 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300 transition-all duration-300 group-hover:border-orange-500/40 group-hover:bg-orange-500/15">
            <Award size={14} className="text-orange-500" />
            {experience}
          </span>
        </div>

        {/* Specialties */}
        <div className="mt-4 flex-1 space-y-2">
          {specialties.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-1.5 transition-all duration-300 group-hover:border-orange-500/20 group-hover:bg-orange-500/[0.05]"
            >
              <CheckCircle2 size={16} className="shrink-0 text-orange-500" />
              <span className="text-[13px] text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <Link
          href="/booking"
          className="mt-5 block rounded-2xl border border-orange-500/20 bg-orange-500/5 py-2 text-center text-xs font-medium text-orange-400 transition-all duration-300 group-hover:border-orange-500/40 group-hover:bg-orange-500/15 group-hover:text-orange-300 sm:mt-6 sm:text-sm"
        >
          Available for Consultation
        </Link>
      </div>
    </Reveal>
  );
}