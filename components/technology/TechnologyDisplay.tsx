"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { motion, AnimatePresence } from "framer-motion";

type Technology = {
  id: number;
  title: string;
  image: string;
  short: string;
  description: string;
  features: string[];
};

type Props = {
  technology: Technology;
};

export default function TechnologyDisplay({ technology }: Props) {
  return (
    <Reveal>
      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          transition-all
          duration-700
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-orange-500/5" />

        <div className="grid lg:grid-cols-2">

          {/* Image */}

          <AnimatePresence mode="wait">
            <motion.div
                key={technology.image}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                duration: 0.5,
                ease: "easeInOut",
                }}
                className="relative h-[260px] bg-black/40 sm:h-[320px] lg:h-full lg:min-h-[500px]"
            >

            <Image
              src={technology.image}
              alt={technology.title}
              fill
              className="
                object-contain
                lg:object-cover
                transition-all
                duration-700
                hover:scale-105
              "
            />

            {/* Gradient */}

            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/40" />

              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/40" />
                </motion.div>
                </AnimatePresence>

          {/* Content */}

          <div className="relative min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                  key={technology.title}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{
                  duration: 0.45,
                  ease: "easeInOut",
                  }}
                  className="absolute inset-0 p-5 sm:p-8 lg:p-14 flex flex-col justify-center"
            >

            <span
              className="
                inline-flex
                w-fit
                rounded-full
                border
                border-orange-500/30
                bg-orange-500/10
                px-3
                py-1.5
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-orange-400
              "
            >
              Featured Technology
            </span>

            <h3 className="mt-3 text-xl font-bold text-white sm:mt-4 sm:text-2xl">
              {technology.title}
            </h3>

            <p className="mt-1 text-sm text-orange-400 sm:mt-2 sm:text-base">
              {technology.short}
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-400 sm:mt-3 sm:text-base">
              {technology.description}
            </p>

            {/* Features */}

            <div className="mt-3 space-y-1 sm:mt-5 sm:space-y-2">

              {technology.features.map((feature, index) => (
                <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                    delay: index * 0.1,
                    duration: 0.3,
                    }}
                    className="flex items-center gap-3"
                >
                    <CheckCircle2
                    size={18}
                    className="text-orange-500"
                    />

                    <span className="text-sm text-gray-300 sm:text-base">
                    {feature}
                    </span>

                </motion.div>
                ))}

            </div>

            {/* Button */}

            <button
                className="
                  mt-3 sm:mt-5
                  w-fit
                  rounded-full
                  bg-orange-500
                  px-4
                  py-2
                  text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:bg-orange-400
              "
            >
              Learn More
            </button>

            </motion.div>
            </AnimatePresence>
            </div>

        </div>
      </div>
    </Reveal>
  );
}
