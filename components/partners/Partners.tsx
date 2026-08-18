"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import { GraduationCap, Building2, Dumbbell } from "lucide-react";

const categories = [
  {
    title: "Education Partners",
    icon: GraduationCap,
    accent: "text-orange-400",
    border: "border-orange-500/70 hover:border-orange-500",
    hoverBorder: "hover:border-orange-500",
    dot: "bg-orange-500",
    arrow: "hover:border-orange-500 hover:bg-orange-600",
    partners: [
      {
        src: "/images/partners/datta-meghe-institute-of-medical-sciences-wardha-logo.jpg",
        name: "Datta Meghe Institute of Medical Sciences",
      },
      { src: "/images/partners/sport fit.jpg", name: "Sport Fit" },
      { src: "/images/partners/super body super brain.jpg", name: "Super Body Super Brain" },
      { src: "/images/partners/ssi fanzine.jpg", name: "SSI Fanzine" },
    ],
  },
  {
    title: "Corporate Partners",
    icon: Building2,
    accent: "text-rose-400",
    border: "border-rose-500/70 hover:border-rose-500",
    hoverBorder: "hover:border-rose-500",
    dot: "bg-rose-500",
    arrow: "hover:border-rose-500 hover:bg-rose-600",
    partners: [
      { src: "/images/partners/lyflink.jpg", name: "Lykflink" },
      { src: "/images/partners/davadena.jpg", name: "Davadena" },
      { src: "/images/partners/healthium.jpg", name: "Healthium" },
      { src: "/images/partners/abf.jpg", name: "ABF" },
      { src: "/images/partners/amri.jpg", name: "AMRI Hospital" },
      { src: "/images/partners/decathlon.jpg", name: "Decathlon" },
      { src: "/images/partners/sports surge logo.jpg", name: "Sports Surge" },
      { src: "/images/partners/landmarkmpl.jpg", name: "Landmark" },
    ],
  },
  {
    title: "Health & Fitness Partners",
    icon: Dumbbell,
    accent: "text-emerald-400",
    border: "border-emerald-500/70 hover:border-emerald-500",
    hoverBorder: "hover:border-emerald-500",
    dot: "bg-emerald-500",
    arrow: "hover:border-emerald-500 hover:bg-emerald-600",
    partners: [
      { src: "/images/partners/surfing yogi.jpg", name: "Surfing Yogi" },
      { src: "/images/partners/xaxti riders.jpg", name: "Xaxti Riders" },
      { src: "/images/partners/ota.jpg", name: "Odisha Tennis Association" },
      { src: "/images/partners/ice hockey.jpg", name: "Ice Hockey" },
      { src: "/images/partners/rugby india.jpg", name: "Rugby India" },
    ],
  },
];

function PartnerRow({
  category,
}: {
  category: (typeof categories)[number];
}) {
  const Icon = category.icon;
  const track = [...category.partners, ...category.partners];

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${category.border} bg-white/[0.04]`}>
          <Icon size={20} className={category.accent} />
        </div>
        <h3 className="text-lg font-bold sm:text-xl">
          <span className="text-white">{category.title.replace(" Partners", "")}</span>{" "}
          <span className={category.accent}>Partners</span>
        </h3>
      </div>

      <div className="overflow-hidden">
        <div className="marquee marquee-slow flex items-center gap-4 py-1">
          {track.map((p, i) => (
            <div
              key={`${p.src}-${i}`}
              className="relative h-28 w-64 shrink-0 sm:h-32 sm:w-72 flex-[0_0_auto]"
              aria-hidden={i >= category.partners.length}
            >
              <div
                className={`group relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-3 transition-transform duration-500 hover:-translate-y-1 border-2 ${category.border}`}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={p.src}
                    alt={p.name}
                    fill
                    sizes="256px"
                    unoptimized
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <section
      id="partners"
      className="relative overflow-hidden border-y border-white/10 bg-[#050505] py-14 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.12),transparent_45%)]" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Our Partners"
            title={
              <>
                Trusted by <span className="text-orange-500">Partners</span>
              </>
            }
            description="We work alongside leading institutions, organizations and fitness brands to deliver world-class sports science."
          />
        </div>

        <Reveal>
          <div className="space-y-12">
            {categories.map((cat) => (
              <PartnerRow key={cat.title} category={cat} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
