"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { Calendar, Search, ChevronLeft, ChevronRight, TrendingUp, Activity } from "lucide-react";
import ScrollButton from "@/components/ui/ScrollButton";

/* ─── Main slider slides ─────────────────────────────────────────── */
const mainSlides = [
  {
    src: "/images/hero/ssi-inside-video.mp4",
    poster: "/images/hero/ssi-inside-video-poster.jpg",
    type: "video",
    label: "Inside SSI",
    caption: "Real athlete care in motion",
  },
  {
    src: "/images/hero/ssi-performance-training.jpg",
    label: "Performance Training",
    caption: "Strength, control and movement quality",
  },
  {
    src: "/images/hero/ssi-therapy-session.jpg",
    label: "Sports Therapy",
    caption: "Hands-on recovery and treatment",
  },
  {
    src: "/images/hero/ssi-rehab-assessment.jpg",
    label: "Rehab & Recovery",
    caption: "Foam rolling and targeted rehabilitation",
  },
  {
    src: "/images/hero/ssi-facility-track.jpg",
    label: "Our Facility",
    caption: "A dedicated performance environment",
  },
];

/* ─── Dots ──────────────────────────────────────────────────────── */
function Dots({
  total,
  active,
  onSelect,
}: {
  total: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`rounded-full transition-all duration-300 ${
            i === active
              ? "bg-orange-500 w-5 h-2"
              : "bg-white/30 hover:bg-white/50 w-2 h-2"
          }`}
          aria-label={`Slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ─── Video Slide with reliable autoplay ─────────────────────────── */
function VideoSlide({
  src,
  poster,
  isActive,
}: {
  src: string;
  poster?: string;
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    if (isActive) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay was prevented:", err);
        });
      }
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      playsInline
      loop
      autoPlay
      preload="auto"
      className="h-full w-full object-cover object-center"
    />
  );
}

/* ─── Mini card ─────────────────────────────────────────────────── */
function MiniCard({
  card,
  isActive,
  onClick,
  onDotSelect,
}: {
  card: { number: number; label: string; caption: string; src: string; poster?: string; type?: string };
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative flex h-full w-full flex-col rounded-2xl overflow-hidden border bg-[#0a0a0a] transition-all duration-300 cursor-pointer ${
        isActive
          ? "border-orange-500/70 ring-1 ring-orange-500/40"
          : "border-white/10 hover:border-white/30"
      }`}
    >
      <div className="relative w-full flex-1 min-h-0">
        <Image
          src={card.poster || card.src}
          alt={card.label}
          fill
          className="object-cover object-center"
          sizes="20vw"
        />
        {card.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-orange-500 bg-black/50 backdrop-blur-sm shadow-[0_0_16px_rgba(249,115,22,0.6)]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-orange-400 ml-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-white/10 px-3 py-2.5 text-left">
        <p
          className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
            isActive ? "text-orange-400" : "text-white"
          }`}
        >
          {card.number}. {card.label}
        </p>
        <p className="mt-0.5 text-[10px] text-gray-300 leading-tight line-clamp-1">
          {card.caption}
        </p>
        <div className="mt-2">
          <Dots total={5} active={card.number - 1} onSelect={onDotSelect} />
        </div>
      </div>
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────── */
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevCurrentRef = useRef(0);
  const lapRef = useRef(0);

  const bottomCards = useMemo(
    () =>
      mainSlides.map((s, i) => ({
        number: i + 1,
        label: s.label,
        caption: s.caption,
        src: s.src,
        poster: s.poster,
        type: s.type,
      })),
    []
  );
  const loopedCards = useMemo(
    () => Array.from({ length: 6 }, () => bottomCards).flat(),
    [bottomCards]
  );

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % mainSlides.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + mainSlides.length) % mainSlides.length),
    []
  );

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  useEffect(() => {
    const prevCurrent = prevCurrentRef.current;
    if (current === 0 && prevCurrent === mainSlides.length - 1) {
      // Wrapped from the last card back to the first — keep moving forward.
      lapRef.current += 1;
    }
    prevCurrentRef.current = current;

    const container = scrollRef.current;
    const total = loopedCards.length;
    // Keep the target inside the repeated track; snap back to the start (no
    // user-visible jump) if we've advanced far enough.
    if (lapRef.current >= total / mainSlides.length - 2) {
      lapRef.current = 0;
      container?.scrollTo({ left: 0, behavior: "auto" });
    }
    const targetIndex = current + mainSlides.length + lapRef.current * mainSlides.length;
    const card = cardRefs.current[targetIndex];
    if (!container || !card) return;
    const target =
      container.scrollLeft +
      card.getBoundingClientRect().left -
      container.getBoundingClientRect().left;
    container.scrollTo({ left: target, behavior: "smooth" });
  }, [current]);

  // Reset the lap offset once the scroll approaches the end of the looped
  // copies so auto-advance never runs out of track.
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScrollEnd = () => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        lapRef.current = 0;
        prevCurrentRef.current = current;
        container.scrollTo({ left: 0, behavior: "auto" });
      }
    };
    container.addEventListener("scroll", onScrollEnd);
    return () => container.removeEventListener("scroll", onScrollEnd);
  }, [current]);

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh/0.9)] flex-col justify-center overflow-hidden bg-black text-white pb-8 md:pb-16 lg:pb-24"
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 z-[5] pointer-events-none" aria-hidden="true">
        <div className="absolute top-32 left-[12%] h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.8)] animate-pulse" />
        <div className="absolute top-44 left-[22%] h-1 w-1 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.9)] animate-ping" />
        <div className="absolute top-64 right-[10%] h-1.5 w-1.5 rounded-full bg-orange-300 shadow-[0_0_12px_rgba(251,146,60,0.8)] animate-pulse" />
        <div className="absolute bottom-[18%] right-[28%] h-1 w-1 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-ping" />
        <div className="absolute top-1/3 right-[35%] h-2 w-2 rounded-full bg-orange-500/90 shadow-[0_0_14px_rgba(249,115,22,0.9)] animate-pulse" />
        <div className="absolute top-[14%] right-[45%] h-1 w-1 rounded-full bg-orange-300 shadow-[0_0_10px_rgba(251,146,60,0.8)] animate-ping" />
        <div className="absolute bottom-[30%] right-[8%] h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.8)] animate-pulse" />
      </div>

      {/* Scroll-down indicator */}
      <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 pointer-events-none sm:bottom-7 md:bottom-8 lg:bottom-12">
        <div className="flex h-8 w-5 flex-col items-center rounded-full border border-white/40 bg-black/40 backdrop-blur-md pt-1.5 shadow-[0_0_25px_rgba(249,115,22,0.4)] sm:h-12 sm:w-7 sm:pt-2">
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,1)] sm:h-2 sm:w-2" />
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#0d0400] to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,transparent_40%,black_95%)] pointer-events-none" />
      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/8 blur-[160px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.07) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Top: headline + slider ── */}
      <div className="relative z-10 flex flex-col items-center pt-32 pb-2 lg:flex-row lg:items-start lg:gap-10 lg:pt-36 lg:pb-4 [@media(max-height:900px)]:lg:pt-32 [@media(max-height:780px)]:lg:pt-32">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[1fr_1.45fr] lg:gap-10 lg:items-center">

            {/* Left */}
            <div className="flex flex-col md:pl-[18%] lg:pl-0">
              {/* Badge */}
              <p className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/40 bg-orange-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_0_15px_rgba(249,115,22,0.12)] w-fit">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400/70 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)]" />
                </span>
                Sports Science India
              </p>

              <h1 className="mt-3 font-black leading-[0.9]">
                <span className="block text-3xl text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] sm:text-5xl xl:text-[62px]">Maximize</span>
                <span className="block text-3xl text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.4)] sm:text-5xl xl:text-[62px]">Performance.</span>
                <span className="block text-3xl text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] sm:text-5xl xl:text-[62px]">Prevent Injury.</span>
                <span className="block text-xl text-gray-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] sm:text-3xl xl:text-[38px] mt-1">Extend Careers.</span>
              </h1>

              <p className="mt-3 max-w-md text-[13px] leading-6 text-gray-400 sm:text-base sm:leading-7">
                India&apos;s first integrated sports science ecosystem combining
                elite athlete performance, sports medicine, rehabilitation,
                education and community development.
              </p>

              <div className="mt-5 flex gap-2.5 flex-nowrap sm:flex-wrap">
                <ScrollButton
                  target="booking"
                  className="inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm sm:px-6 sm:py-3"
                >
                  <Calendar className="h-4 w-4 shrink-0" />
                  Book Assessment
                </ScrollButton>
                <ScrollButton
                  target="ecosystem"
                  variant="outline"
                  className="inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm sm:px-6 sm:py-3"
                >
                  <Search className="h-4 w-4 shrink-0" />
                  Explore Ecosystem
                </ScrollButton>
              </div>
            </div>

{/* Right — main slider */}
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 rounded-[30px] bg-orange-500/20 blur-3xl" />
              <div
                className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-transparent shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_60px_rgba(249,115,22,0.25),0_10px_40px_rgba(0,0,0,0.5)] lg:aspect-[3/2] lg:max-h-[64vh]"
              >
                {/* Slides */}
                {mainSlides.map((slide, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: i === current ? 1 : 0 }}
                  >
                    {slide.type === "video" ? (
                      <VideoSlide
                        src={slide.src}
                        poster={slide.poster}
                        isActive={i === current}
                      />
                    ) : (
                      <Image
                        src={slide.src}
                        alt={slide.label}
                        fill
                        priority={i === 1}
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                    <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] [background:radial-gradient(ellipse_at_center,transparent_55%,rgba(5,5,5,0.9)_100%)]" />
                  </div>
                ))}

                {/* Arrows */}
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm text-white hover:bg-orange-500/80 hover:border-orange-500 transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm text-white hover:bg-orange-500/80 hover:border-orange-500 transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                  <Dots total={mainSlides.length} active={current} onSelect={setCurrent} />
                </div>

                <div className="absolute top-4 left-4 z-20 hidden md:block">
                  <div className="rounded-xl border border-orange-400/50 bg-[#0a0a0a] px-4 py-3 min-w-[150px] shadow-[0_0_25px_rgba(249,115,22,0.25),0_10px_30px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-3 w-3 text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.9)]" />
                      <p className="text-xs font-bold uppercase tracking-widest text-white">{current + 1}. {mainSlides[current].label}</p>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">{mainSlides[current].caption}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom: 5 mini cards ── */}
      <div className="relative z-10 pb-2 pt-4 md:-mt-4 md:pb-6 lg:pb-10 [@media(max-height:900px)]:lg:pb-4">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={scrollRef}
            className="flex gap-2 md:gap-3 overflow-x-auto pb-1"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
          >
            {loopedCards.map((card, i) => (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`flex-shrink-0 w-[calc(50%-4px)] min-h-[200px] md:min-h-[220px] [@media(max-height:900px)]:lg:min-h-[170px] ${
                  i < 5 ? "md:flex md:flex-1 md:w-auto" : "md:hidden"
                }`}
                style={{ scrollSnapAlign: "start" }}
              >
                <MiniCard
                  card={card}
                  key={i}
                  isActive={i % bottomCards.length === current}
                  onClick={() => setCurrent(i % bottomCards.length)}
                  onDotSelect={(n) => setCurrent(n)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


