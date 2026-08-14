"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import Container from "@/components/ui/Container";
import Counter from "@/components/ui/Counter";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "./TestimonialCard";
import GoogleIcon from "@/components/ui/GoogleIcon";
import Reveal from "@/components/animations/Reveal";

import {
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  Activity,
  ShieldCheck,
  HeartPulse,
  Target,
} from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    sport: "Football Player",
    review:
      "The sports science assessment completely changed the way I train. My strength, speed and confidence have improved significantly.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    sport: "Marathon Runner",
    review:
      "Recovery is much faster now. The team helped me understand my body better through scientific testing.",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    sport: "Cricketer",
    review:
      "Professional staff, detailed reports and excellent guidance. Highly recommended for every athlete.",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    sport: "State-Level Track Athlete",
    review:
      "Sports Science India gave me the edge I needed. My sprint times improved significantly after biomechanical analysis.",
    rating: 5,
  },
  {
    name: "Vikram Joshi",
    sport: "Amateur Boxer",
    review:
      "The strength and conditioning program was tailored perfectly for my sport. I feel much more explosive in the ring.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    sport: "Swimming Champion",
    review:
      "Recovery science made a huge difference. I'm training harder while recovering faster. Truly world-class facility.",
    rating: 5,
  },
  {
    name: "Rohit Desai",
    sport: "National Kabaddi Player",
    review:
      "The biomechanical analysis helped me correct my movement patterns. My performance on the mat has improved dramatically.",
    rating: 5,
  },
  {
    name: "Kavya Iyer",
    sport: "Junior Tennis Athlete",
    review:
      "As a young athlete, this program gave me the right foundation. My coaches noticed the difference within weeks.",
    rating: 5,
  },
  {
    name: "Dr. Manoj Verma",
    sport: "Sports Physician",
    review:
      "I refer my patients here with complete confidence. The integration of sports science and clinical care is outstanding.",
    rating: 5,
  },
];

const stats = [
  { icon: Activity, end: 500, suffix: "+", label: "Athletes Assessed" },
  { icon: ShieldCheck, end: 25, suffix: "+", label: "Sports Supported" },
  { icon: HeartPulse, end: 98, suffix: "%", label: "Client Satisfaction" },
  { icon: Target, end: 15, suffix: "+", label: "Years of Experience" },
];

export default function Testimonials() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden bg-[#050505] py-14 text-white">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      <Reveal>
      <Container className="relative z-10">

        {/* Header */}
        <SectionHeading
          eyebrow="Reviews & Testimonials"
          title={
            <>
              Trusted by <span className="text-orange-500">Athletes.</span>
              <br />
              Driven by Results.
            </>
          }
          description="Hear from athletes, coaches, and professionals who have elevated their performance through evidence-based sports science, personalized assessments, and expert guidance."
        >
          {/* Big rating row */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <p className="text-5xl sm:text-6xl font-extrabold text-orange-500">4.8</p>
            <div className="h-14 w-px bg-white/15" />
            <div className="text-left">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={22}
                    className="fill-orange-500 text-orange-500"
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-gray-400">
                Based on <span className="text-orange-400">Google Reviews</span>
              </p>
            </div>
          </div>

          <a
            href="https://search.google.com/local/writereview?placeid=ChIJq6qqqlmnGToRH0Ga5zV48u8"
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-orange-500/30
              bg-orange-500/10
              px-7
              py-3
              text-sm
              font-semibold
              uppercase
              tracking-wide
              text-orange-400
              transition-all
              duration-300
              hover:border-orange-500
              hover:bg-orange-500
              hover:text-white
            "
          >
            <GoogleIcon size={18} />
            View All Reviews on Google
            <ArrowRight size={16} />
          </a>
        </SectionHeading>

        {/* Carousel */}
        <div className="relative mt-6">

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex items-stretch">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="
                    min-w-0
                    flex-[0_0_100%]
                    px-3
                    sm:flex-[0_0_50%]
                    lg:flex-[0_0_33.333%]
                    flex
                    py-2
                  "
                >
              
                  <TestimonialCard
                    name={testimonial.name}
                    sport={testimonial.sport}
                    review={testimonial.review}
                    rating={testimonial.rating}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="absolute inset-x-0 top-[45%] flex -translate-y-1/2 justify-between pointer-events-none">
            <button
              onClick={scrollPrev}
              className="pointer-events-auto -ml-6 md:-ml-16 rounded-full border border-orange-500/30 bg-[#111111] p-3 transition-all duration-300 hover:bg-orange-500 hover:border-orange-500"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={scrollNext}
              className="pointer-events-auto -mr-6 md:-mr-16 rounded-full border border-orange-500/30 bg-[#111111] p-3 transition-all duration-300 hover:bg-orange-500 hover:border-orange-500"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-6 bg-orange-500"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 sm:p-5 sm:grid-cols-4 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-[0_10px_40px_rgba(249,115,22,0.12)]">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
                  <Icon size={22} className="text-orange-500" />
                </div>
                <div className="mt-1.5 text-lg sm:text-xl font-bold text-white">
                  <Counter end={stat.end} suffix={stat.suffix} />
                </div>
                <p className="text-[11px] sm:text-sm text-gray-400">{stat.label}</p>
                <div className="mx-auto mt-1 h-0.5 w-5 bg-orange-500/60" />
              </div>
            );
          })}
        </div>

      </Container>
      </Reveal>
    </section>
  );
}
