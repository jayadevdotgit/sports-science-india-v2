"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

type GalleryItem = {
  src: string;
  caption?: string;
  featured?: boolean;
};

const galleryItems: GalleryItem[] = [
  { src: "/images/gallery/1.jpg" },
  { src: "/images/gallery/2.jpg" },
  { src: "/images/gallery/3.jpg" },
  { src: "/images/gallery/4.jpg" },
  { src: "/images/gallery/5.jpg" },
  { src: "/images/gallery/6.jpg" },
  { src: "/images/gallery/7.jpg" },
  { src: "/images/gallery/8.jpg" },
  { src: "/images/gallery/9.jpg" },
  { src: "/images/gallery/10.jpg" },
  { src: "/images/gallery/11.jpg" },
  { src: "/images/gallery/12.jpg" },
  { src: "/images/gallery/13.jpg" },
  { src: "/images/gallery/14.jpg" },
  { src: "/images/gallery/15.jpg" },
  { src: "/images/gallery/about.jpeg", featured: true },
  { src: "/images/gallery/16.jpg" },
  { src: "/images/gallery/17.jpg" },
  { src: "/images/gallery/18.jpg" },
  { src: "/images/gallery/19.jpg" },
  { src: "/images/gallery/20.jpg" },
  { src: "/images/gallery/21.jpg" },
  { src: "/images/gallery/22.jpg" },
  { src: "/images/gallery/23.jpg" },
  { src: "/images/gallery/25.jpg" },
  { src: "/images/gallery/26.jpg" },
  { src: "/images/gallery/27.jpg" },
  { src: "/images/gallery/28.jpg" },
  { src: "/images/gallery/29.jpg" },
  { src: "/images/gallery/30.jpg" },
  { src: "/images/gallery/gallery1.jpg" },
  { src: "/images/gallery/gallery2.jpg" },
  { src: "/images/gallery/gallery3.jpg" },
  { src: "/images/gallery/gallery4.jpg" },
  { src: "/images/gallery/gallery5.jpg" },
  { src: "/images/gallery/gallery6.jpg" },
  { src: "/images/gallery/ssiteam.jpg" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length
      ),
    []
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % galleryItems.length)),
    []
  );

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(delta) < 50) return;
      if (delta < 0) next();
      else prev();
    },
    [next, prev]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#050505] py-14 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.16),transparent_42%),linear-gradient(180deg,#050505_0%,#0b0b0b_48%,#050505_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_78%,transparent)]" />

      <Reveal>
        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="Life at SSI"
              title={
                <>
                  Real Work. <span className="text-orange-500">Real Athletes.</span>
                  <br />
                  Real Recovery.
                </>
              }
              description="Step inside Sports Science India — where precise assessments meet hands-on rehab, and every session is engineered to get athletes back to the game stronger than before."
            />
          </div>

          {/* Collage grid - featured card spans two columns */}
          <div className="relative mt-10 rounded-[28px] border border-white/10 bg-white/[0.035] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-3">
            <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/10 via-transparent to-orange-500/10" />
            <div className="relative grid grid-flow-dense grid-cols-2 auto-rows-[135px] gap-2 sm:grid-cols-3 sm:auto-rows-[180px] sm:gap-3 lg:grid-cols-4 lg:auto-rows-[210px]">
              {galleryItems.map((item, index) => (
                <button
                  key={item.src + index}
                  onClick={() => setLightbox(index)}
                  className={`group relative block h-full w-full overflow-hidden rounded-[18px] outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-orange-400/80 ${
                    item.featured
                      ? "col-span-2 row-span-2 border border-orange-400/50 bg-black shadow-[0_24px_70px_rgba(249,115,22,0.24)] sm:col-span-2 sm:row-span-2 lg:col-start-2"
                      : "border border-orange-500/25 bg-white/5 shadow-[0_12px_35px_rgba(0,0,0,0.28)] hover:border-orange-400/60 hover:shadow-[0_18px_45px_rgba(249,115,22,0.16)]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.caption || `Gallery photo ${index + 1}`}
                    width={item.featured ? 1200 : 600}
                    height={item.featured ? 800 : 400}
                    unoptimized
                    className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-110 ${
                      item.featured ? "object-contain bg-black" : "object-cover"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-white/5 opacity-40 transition-opacity duration-500 group-hover:opacity-75" />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
                  </div>

                  {item.featured && (
                    <>
                      <div className="pointer-events-none absolute -inset-px rounded-[18px] border border-orange-300/60 shadow-[inset_0_0_34px_rgba(249,115,22,0.18)]" />
                      <div className="absolute inset-x-0 bottom-0 p-4 text-left sm:p-5">
                        <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/50 bg-black/55 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-orange-200 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
                          <Camera size={13} />
                          Featured
                        </span>
                      </div>
                    </>
                  )}

                  {item.caption && (
                    <div className="absolute inset-x-0 bottom-0 translate-y-3 p-3 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="mt-1.5 text-sm text-white">{item.caption}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </Reveal>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-5 top-5 rounded-full border border-white/20 p-2 text-white transition-all duration-300 hover:bg-white/10"
          >
            <X size={22} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 rounded-full border border-white/20 p-2.5 text-white transition-all duration-300 hover:bg-orange-500 sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 rounded-full border border-white/20 p-2.5 text-white transition-all duration-300 hover:bg-orange-500 sm:right-6"
          >
            <ChevronRight size={22} />
          </button>

          <div
            className="max-h-[90vh] w-full max-w-5xl px-4"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/15">
              <Image
                src={galleryItems[lightbox].src}
                alt={galleryItems[lightbox].caption || `Gallery photo ${lightbox + 1}`}
                width={1200}
                height={800}
                unoptimized
                className="max-h-[82vh] w-full object-contain bg-black"
              />
            </div>
            <div className="mt-4 text-center">
              {galleryItems[lightbox].caption && (
                <p className="mt-2 text-sm text-gray-300">
                  {galleryItems[lightbox].caption}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {lightbox + 1} / {galleryItems.length}
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-gray-400 pointer-coarse:inline-flex hidden">
                <ChevronLeft size={12} className="text-orange-400" />
                Swipe to browse
                <ChevronRight size={12} className="text-orange-400" />
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
