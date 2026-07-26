"use client";

import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import { ArrowRight } from "lucide-react";

type TechnologyCardProps = {
  image: string;
  title: string;
  description: string;
  large?: boolean;
};

export default function TechnologyCard({
  image,
  title,
  description,
  large = false,
}: TechnologyCardProps) {
  return (
    <Reveal>
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-orange-500/40
          hover:shadow-[0_20px_60px_rgba(249,115,22,0.2)]
        "
      >
        {/* Orange Glow */}
        <div className="absolute inset-0 bg-orange-500/0 transition-all duration-500 group-hover:bg-orange-500/5" />

        {/* Image */}
        <div
          className={`relative overflow-hidden ${
            large ? "h-80" : "h-56"
          }`}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />
        </div>

        {/* Content */}
        <div className="p-8">

          <h3 className="text-2xl font-bold text-white">
            {title}
          </h3>

          <p className="mt-4 leading-8 text-gray-400">
            {description}
          </p>

          <button
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              text-orange-400
              transition-all
              duration-300
              group-hover:gap-4
            "
          >
            Learn More
            <ArrowRight size={18} />
          </button>

        </div>
      </div>
    </Reveal>
  );
}