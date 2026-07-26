"use client";

import Image from "next/image";
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
          flex
          h-full
          w-full
          flex-col
          overflow-hidden
          rounded-3xl
          border-2 border-orange-500/20
          bg-[#0d0d0d]
          min-h-[380px]
          p-5
          sm:min-h-[420px]
          sm:p-8
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-orange-500
        "
      >
        {/* Photo */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-orange-500/30 bg-gradient-to-br from-orange-500/30 via-[#18110d] to-black transition-all duration-500 group-hover:border-orange-500/60 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] sm:h-28 sm:w-28">
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

        {/* Name */}
        <h3 className="mt-4 flex min-h-6 items-center justify-center text-center text-base font-bold text-white sm:text-lg">
          {name}
        </h3>

        {/* Role */}
        <p className="mt-1 flex min-h-10 items-center justify-center text-center text-sm font-medium leading-5 text-orange-400 break-words">
          {role}
        </p>

        {/* Experience */}
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-300">
          <Award size={18} className="text-orange-500" />
          <span>{experience}</span>
        </div>

        {/* Specialties */}
        <div className="mt-4 flex-1 space-y-2">
          {specialties.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle2
                size={18}
                className="text-orange-500 shrink-0"
              />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-orange-500/20 bg-orange-500/5 py-2 text-center text-xs font-medium text-orange-400 sm:mt-6 sm:text-sm">
        Available for Consultation
        </div>
            
      </div>
    </Reveal>
  );
}
