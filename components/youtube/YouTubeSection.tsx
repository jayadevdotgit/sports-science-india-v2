"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import { FaYoutube, FaPlay, FaClock, FaEye, FaBell, FaArrowRight } from "react-icons/fa6";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const CHANNEL_URL = "https://www.youtube.com/@sportsscienceindia";
const SUBSCRIBERS = "847";
const TOTAL_VIDEOS = "87";

const getEmbed = (id: string, autoplay = true) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1`;

const videos = [
  {
    id: "-L5wW_lPmUM",
    title: "Groundbreaking ACL Reconstruction | Jewel ACL Technology in Action | Dr. Sarthak Patnaik",
    date: "Aug 15, 2025",
    duration: "3:07",
    views: "514",
  },
  {
    id: "i1lTngGOmMs",
    title: "ACL Recovery | Return to Sports | Dr Sarthak Patnaik | ACL Reconstruction",
    date: "Feb 11, 2025",
    duration: "4:01",
    views: "2232",
  },
  {
    id: "WAT912Uv5sY",
    title: "Os Trigonum | Ankle Arthroscopy | Dr Sarthak Patnaik",
    date: "Jan 23, 2025",
    duration: "4:30",
    views: "433",
  },
  {
    id: "z1_9wM8FdU4",
    title: "What causes PCL tears, and how can they be treated? | Dr. Sarthak Patnaik explains.",
    date: "Jul 11, 2025",
    duration: "4:29",
    views: "452",
  },
  {
    id: "IS_G1RWmp3w",
    title: "Posterior Shoulder Pain | Posterior Bankart Repair | Posterior SLAP Tear | Dr. Sarthak Patnaik",
    date: "Jul 3, 2025",
    duration: "6:17",
    views: "459",
  },
  {
    id: "GQanF1HLwFo",
    title: "ACL Reconstruction | Meniscus Repair | Both Knee | Dr Sarthak Patnaik",
    date: "Jun 27, 2025",
    duration: "3:31",
    views: "1181",
  },
  {
    id: "mu8aBWM2-6A",
    title: "Pain to Progress. My ACL reconstruction story with Dr Sarthak Patnaik",
    date: "Aug 10, 2026",
    duration: "1:18",
    views: "70",
  },
  {
    id: "3MZ4_WpWeNg",
    title: "From Assessment to Performance: SSI's FMS Protocol for Badminton Pros",
    date: "Jul 3, 2026",
    duration: "0:45",
    views: "37",
  },
  {
    id: "g0xTfzKFKnU",
    title: "ACL Reconstruction Success Story | Patient Returns to Sports | Dr. Sarthak Patnaik",
    date: "Jun 7, 2026",
    duration: "1:25",
    views: "129",
  },
  {
    id: "PM2PGqFIDmY",
    title: "Testimonial | ACL reconstruction | Post Op 1 Month | Bangalore Guy | Dr Sarthak Patnaik",
    date: "Apr 5, 2026",
    duration: "1:18",
    views: "853",
  },
  {
    id: "1pzOkKopLcc",
    title: "Testimonial | Return to Daily Activity | 2 Months Post ACL Reconstruction",
    date: "Mar 30, 2026",
    duration: "1:00",
    views: "224",
  },
  {
    id: "DbpLtuMyNvw",
    title: "From ACL reconstruction to back under the bar — case by Dr. Sarthak Patnaik",
    date: "Mar 21, 2026",
    duration: "0:56",
    views: "154",
  },
  {
    id: "tUrenVHksYQ",
    title: "Harshit Tyagi shares his ACL Meniscus Repair journey with Dr. Sarthak Patnaik",
    date: "Feb 9, 2026",
    duration: "2:11",
    views: "939",
  },
  {
    id: "HvY49JTmfzc",
    title: "ACL surgery | Ligament Surgery | Happy Patient | Return to Work | Dr Sarthak Patnaik",
    date: "Dec 12, 2025",
    duration: "2:24",
    views: "420",
  },
  {
    id: "i6uZi8hitQM",
    title: "Sports Awards & Sports Science Conclave 2025",
    date: "Dec 8, 2025",
    duration: "2:51:36",
    views: "63",
  },
  {
    id: "MXmZHbTCSSk",
    title: "SSI Sports Awards 2025",
    date: "Dec 7, 2025",
    duration: "1:46:20",
    views: "65",
  },
  {
    id: "DxCXSXnI1Nk",
    title: "Patient Testimonial: 24 yr old from Germany — ACL revision & meniscus repair",
    date: "Aug 29, 2025",
    duration: "1:35",
    views: "486",
  },
];

const getThumb = (id: string, size: "maxresdefault" | "sddefault" | "hqdefault") =>
  `https://i.ytimg.com/vi/${id}/${size}.jpg`;

function VideoCard({
  video,
  onPlay,
}: {
  video: (typeof videos)[number];
  onPlay: (video: (typeof videos)[number]) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPlay(video)}
      aria-label={`Play ${video.title}`}
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-red-400/50 hover:shadow-[0_20px_60px_rgba(239,68,68,0.18)]"
    >
      <div className="relative aspect-video overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getThumb(video.id, "hqdefault")}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Hover play */}
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-red-600/90 opacity-0 shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <FaPlay size={16} className="ml-0.5 text-white" />
        </div>

        <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm">
          {video.duration}
        </span>
      </div>

      <div className="p-4">
        <h4 className="line-clamp-2 text-base font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-red-200">
          {video.title}
        </h4>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
          <FaEye size={12} className="text-red-400/80" />
          {video.views} views · {video.date}
        </div>
      </div>
    </button>
  );
}

export default function YouTubeSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[number] | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    containScroll: "keepSnaps",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  return (
    <section
      id="youtube"
      className="relative overflow-hidden border-y border-white/10 bg-[#050505] py-14 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,0,0.14),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(249,115,22,0.1),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_75%,transparent)]" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Watch & Learn"
            title={
              <>
                Sports Science India <span className="text-red-500">On YouTube</span>
              </>
            }
            description="ACL stories, shoulder research, hip and knee care plus event highlights — the science of performance on video."
          />
        </div>

        {/* Featured player card */}
        <Reveal>
          <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-red-500/10" />
            <button
              type="button"
              onClick={() => setActiveVideo(videos[0])}
              aria-label={`Play ${videos[0].title}`}
              className="relative block w-full text-left"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getThumb(videos[0].id, "maxresdefault")}
                  alt={videos[0].title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    const fallbacks = ["maxresdefault", "sddefault", "hqdefault"];
                    const used = fallbacks.findIndex((f) => img.src.includes(f));
                    if (used > -1 && used < fallbacks.length - 1) {
                      img.src = img.src.replace(fallbacks[used], fallbacks[used + 1]);
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />

                {/* Red glow on hover */}
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/20 opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-100" />

                {/* Play button */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-red-600/90 shadow-[0_0_45px_rgba(239,68,68,0.6)] transition-all duration-500 group-hover:scale-110 group-hover:bg-red-500 sm:h-24 sm:w-24">
                    <span className="absolute inset-0 animate-ping rounded-full bg-red-500/30" />
                    <FaPlay size={26} className="relative ml-1 text-white sm:size-8" />
                  </div>
                </div>

                {/* Top-left badge */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-red-400/40 bg-black/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-red-300 backdrop-blur-md">
                  <FaYoutube size={14} className="text-red-500" />
                  Latest Video
                </div>

                {/* Bottom info */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <h3 className="text-lg font-bold leading-snug sm:text-2xl">
                    {videos[0].title}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-gray-300 sm:text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      <FaClock size={13} className="text-red-400" /> {videos[0].duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FaEye size={14} className="text-red-400" /> {videos[0].views} views
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
                      <FaYoutube size={12} className="text-red-500" /> {videos[0].date}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </Reveal>

        {/* Video slider */}
        <div className="relative mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-bold sm:text-xl">
              More from the <span className="text-red-500">Channel</span>
            </h3>
            <div className="flex items-center gap-2.5">
              <button
                onClick={scrollPrev}
                aria-label="Previous videos"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/30 bg-[#111111] text-white transition-all duration-300 hover:border-red-500 hover:bg-red-600"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next videos"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/30 bg-[#111111] text-white transition-all duration-300 hover:border-red-500 hover:bg-red-600"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {videos.slice(1).map((video) => (
                <div
                  key={video.id}
                  className="min-w-0 flex-[0_0_100%] px-2.5 py-1 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <VideoCard video={video} onPlay={setActiveVideo} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          {(emblaApi?.scrollSnapList().length ?? 0) > 1 && (
            <div className="mt-7 flex justify-center gap-2">
              {emblaApi?.scrollSnapList().map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to video group ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "w-6 bg-red-500"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Subscribe CTA */}
        <Reveal delay={0.1}>
          <div className="relative mt-10 overflow-hidden rounded-[28px] border border-red-500/25 bg-[#0d0d0d] px-6 py-9 sm:px-10">
            <div className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 translate-x-1/3 rounded-full bg-red-500/15 blur-[100px]" />
            <div className="relative z-10 flex flex-col items-center gap-7 md:flex-row md:text-left">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10">
                  <FaYoutube size={32} className="text-red-500" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xl font-bold md:text-2xl">
                    Never miss a video —{" "}
                    <span className="text-red-500">Subscribe now</span>
                  </p>
                  <p className="mt-1.5 flex items-center justify-center gap-2 text-sm text-gray-400 sm:justify-start">
                    <FaBell size={13} className="text-red-400" />
                    @sportsscienceindia — {SUBSCRIBERS} subscribers · {TOTAL_VIDEOS} videos
                  </p>
                </div>
              </div>

              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-red-600 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_30px_rgba(239,68,68,0.45)] transition-all duration-300 hover:scale-105 hover:bg-red-500 hover:shadow-[0_0_50px_rgba(239,68,68,0.7)]"
              >
                <FaYoutube size={18} />
                Subscribe
                <FaArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Video lightbox */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            aria-label="Close video"
            className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/50 p-2.5 text-white transition-all duration-300 hover:bg-red-600 sm:right-6 sm:top-6"
          >
            <X size={22} />
          </button>

          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-3xl border border-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={getEmbed(activeVideo.id)}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-base font-bold sm:text-lg">{activeVideo.title}</h3>
              <p className="mt-1 text-sm text-gray-400">
                <FaEye size={13} className="mr-1.5 inline text-red-400" />
                {activeVideo.views} views · {activeVideo.date}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}