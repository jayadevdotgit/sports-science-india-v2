"use client";

import { useMemo, useState } from "react";
import { useParams, notFound, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarClock,
  ShieldCheck,
  Activity,
  Users,
  Sparkles,
  HelpCircle,
  ChevronDown,
  PhoneCall,
  Brain,
  PersonStanding,
  Dumbbell,
  HeartPulse,
  Stethoscope,
  Hand,
  Footprints,
  Microscope,
  Bone,
  ShieldPlus,
  Syringe,
  Trophy,
  ClipboardCheck,
  Heart,
  Baby,
  Check,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/footer/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import { bodyData } from "@/components/ecosystem/bodyData";
import { serviceDetails } from "@/components/ecosystem/serviceDetails";
import { serviceSectionDetails } from "@/components/services/servicePages";
import { servicesList } from "@/components/services/services";

function slugFrom(link: string): string {
  return link.split("/").filter(Boolean).pop() || "";
}

const serviceIcons: Record<string, LucideIcon> = {
  "sports-psychology": Brain,
  "neck-care": PersonStanding,
  "strength-conditioning": Dumbbell,
  "cardiovascular-training": HeartPulse,
  "sports-medicine": Stethoscope,
  "elbow-performance": Hand,
  "core-stability": Activity,
  biomechanics: Footprints,
  "wrist-function": Hand,
  "hip-mobility": PersonStanding,
  rehabilitation: Activity,
  "injury-prevention": ShieldCheck,
  "sports-surgery": Syringe,
  "ligament-surgery": Bone,
  "joint-preservation": ShieldPlus,
  "sports-science": Microscope,
  "musculoskeletal-rehab": Activity,
  "sports-rehabilitation": HeartPulse,
  physiotherapy: Activity,
  assessments: ClipboardCheck,
  "return-to-sports": Trophy,
  "pre-post-natal-rehab": Baby,
  "obstetrics-gynaecology-consultation": Heart,
};

type ServiceInfo = {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  image?: string;
};

type Detail = {
  slug: string;
  overview: string[];
  whoItsFor: string[];
  whatToExpect: string[];
  benefits: string[];
  faq: { q: string; a: string }[];
};

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-orange-500/40 hover:shadow-[0_8px_32px_rgba(249,115,22,0.15)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 sm:gap-4 px-5 py-5 sm:px-7 sm:py-6 text-left"
      >
        <span className="flex items-center gap-3 text-sm sm:text-base font-semibold text-white">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
            <HelpCircle size={16} className="text-orange-400 sm:size-[17px]" />
          </div>
          {q}
        </span>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400 transition-all duration-500 ${open ? "rotate-180 scale-110" : ""} group-hover:border-orange-500/40`}>
          <ChevronDown size={16} className="sm:size-[17px]" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="px-5 pb-6 sm:px-7 sm:pb-7">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />
              <p className="text-sm sm:text-base leading-7 text-gray-300/90">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServicePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const router = useRouter();
  const pathname = usePathname();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const goToServices = () => {
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 450);
    } else {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const service = useMemo<ServiceInfo | null>(() => {
    const body = bodyData.find((item) => slugFrom(item.link) === slug);
    if (body) {
      return {
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        icon: body.icon,
        features: body.features,
        image: body.image,
      };
    }
    const section = servicesList.find((item) => slugFrom(item.link) === slug);
    if (section) {
      return {
        title: section.title,
        subtitle: "Elite Performance Service",
        description: section.description,
        icon: "⚡",
        features: section.features,
        image: section.image,
      };
    }
    return null;
  }, [slug]);

  const detail = useMemo<Detail | null>(
    () =>
      (serviceSectionDetails.find((d) => d.slug === slug) ??
        serviceDetails.find((d) => d.slug === slug) ??
        null) as Detail | null,
    [slug]
  );

  if (!service) {
    notFound();
  }

  const Icon = serviceIcons[slug] ?? Activity;
  const highlightFeatures = service.features.slice(0, 3);

  return (
    <>
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#050505] pt-32 pb-10 sm:pt-36 sm:pb-14 text-white">
        <div className="absolute -top-24 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[180px]" />
        <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-orange-600/5 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,black_95%)]" />

        <Container className="relative z-10">
          <button
            onClick={goToServices}
            className="group inline-flex cursor-pointer items-center gap-2 text-xs text-gray-400 transition-all hover:text-orange-400 hover:gap-2.5"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" /> Back to Services
          </button>

          <div className="mt-6 sm:mt-8 grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-orange-500/20 blur-2xl" />
                  <div className="relative flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl sm:rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-orange-500/5 shadow-[0_8px_32px_rgba(249,115,22,0.25)]">
                    <Icon size={24} className="text-orange-400 sm:size-8" />
                  </div>
                </div>
                <div>
                  <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-orange-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                    {service.subtitle}
                  </p>
                  <h1 className="mt-1.5 text-2xl sm:text-3xl md:text-4xl font-black leading-[1.1] tracking-tight">
                    {service.title.split(" ")[0]}{" "}
                    <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-transparent">
                      {service.title.includes(" ") ? service.title.split(" ").slice(1).join(" ") : "Performance"}
                    </span>
                  </h1>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 h-1.5 w-20 sm:w-24 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]" />
              <p className="mt-5 sm:mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-gray-300/90">
                {service.description}
              </p>

                <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:flex sm:justify-start sm:gap-4">
                  <Link href="/booking">
                    <Button size="md" className="w-full sm:w-auto sm:min-w-[200px] whitespace-nowrap text-base sm:text-base">
                      <CalendarClock size={16} /> Book Now
                    </Button>
                  </Link>
                  <a href="tel:+917381380010">
                    <Button variant="outline" size="md" type="button" className="w-full sm:w-auto sm:min-w-[200px] whitespace-nowrap text-base sm:text-base">
                      <PhoneCall size={16} /> +91 73813 80010
                    </Button>
                  </a>
                </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative mx-auto flex max-w-sm items-center justify-center">
                <div className="absolute h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-orange-500/20 blur-[120px] animate-pulse" />
                <div className="absolute h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] rounded-full border border-orange-500/15" />
                <div className="absolute h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] rounded-full border border-dashed border-orange-500/20 animate-[spin_40s_linear_infinite]" />

                {service.image ? (
                  <div className="relative group overflow-hidden rounded-3xl sm:rounded-[32px] border border-white/10 shadow-2xl shadow-orange-500/20">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={1024}
                      height={1024}
                      className="h-[300px] sm:h-[360px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 rounded-xl border border-white/15 bg-black/70 px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-xl shadow-lg">
                      <p className="text-xs sm:text-sm font-bold text-white">{service.title}</p>
                      <p className="text-[10px] sm:text-xs text-orange-400 font-medium">Sports Science India</p>
                    </div>
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-white/15 bg-black/60 backdrop-blur-xl">
                      <Sparkles size={16} className="text-orange-400 sm:size-[18px]" />
                    </div>
                  </div>
                ) : (
                  <div className="relative flex h-[300px] sm:h-[360px] w-full items-center justify-center rounded-3xl sm:rounded-[32px] border border-orange-500/20 bg-gradient-to-br from-[#0d0d0d] to-black">
                    <div className="flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10">
                      <Icon size={48} className="text-orange-400 sm:size-14" />
                    </div>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:bottom-4 rounded-full border border-orange-500/30 bg-black/60 px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-sm font-semibold text-orange-300 backdrop-blur">
                      {service.title}
                    </span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Feature highlights - Premium pills */}
          <Reveal delay={0.2}>
            <div className="mt-10 sm:mt-14 grid gap-3 sm:gap-4 sm:grid-cols-3">
              {highlightFeatures.map((f, idx) => (
                <div
                  key={f}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl p-4 sm:p-5 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-[0_12px_40px_rgba(249,115,22,0.2)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400 shadow-lg shadow-orange-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-orange-500/40">
                      <Sparkles size={18} className="sm:size-5" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-white tracking-tight">{f}</p>
                      <div className="mt-1 h-0.5 w-8 rounded-full bg-gradient-to-r from-orange-500 to-transparent transition-all duration-500 group-hover:w-16" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 text-xs font-bold">
                    0{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {detail && (
        <>
          {/* ============ OVERVIEW ============ */}
          <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
            <Container>
              <Reveal>
                <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
                  <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm shadow-lg shadow-orange-500/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                    Overview
                  </p>
                  <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                    About This <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">Service</span>
                  </h2>
                  <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]" />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mx-auto max-w-3xl space-y-5 sm:space-y-6">
                  {detail.overview.map((p, idx) => (
                    <p key={p.slice(0, 40)} className="text-base sm:text-lg leading-8 text-gray-300/90 [text-wrap:pretty]">
                      {idx === 0 && <span className="text-orange-400 font-semibold mr-2">—</span>}
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </Container>
          </section>

          {/* ============ WHO IT'S FOR ============ */}
          <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
            <div className="absolute left-0 top-40 h-[400px] w-[400px] rounded-full bg-orange-500/5 blur-[140px]" />
            <Container className="relative">
              <Reveal>
                <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
                  <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm shadow-lg shadow-orange-500/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                    Who It&apos;s For
                  </p>
                  <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                    Built Around <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">You</span>
                  </h2>
                  <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]" />
                </div>
              </Reveal>
              <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
                {detail.whoItsFor.map((item, i) => (
                  <Reveal key={item} delay={i * 0.06}>
                    <div className="group relative overflow-hidden h-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-500/40 hover:shadow-[0_16px_48px_rgba(249,115,22,0.2)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <div className="relative flex items-start gap-4">
                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400 shadow-lg shadow-orange-500/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-orange-500/40">
                          <Users size={20} className="sm:size-[22px]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm sm:text-base leading-7 text-gray-200/90 [text-wrap:pretty]">{item}</p>
                          <div className="mt-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-orange-500 to-transparent transition-all duration-500 group-hover:w-20" />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>

          {/* ============ WHAT TO EXPECT ============ */}
          <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
            <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/5 blur-[160px]" />
            <Container className="relative z-10">
              <Reveal>
                <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
                  <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm shadow-lg shadow-orange-500/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                    What To Expect
                  </p>
                  <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                    Your Path, <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">Clearly Mapped</span>
                  </h2>
                  <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]" />
                </div>
              </Reveal>
              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {detail.whatToExpect.map((step, i) => (
                  <Reveal key={step} delay={i * 0.1}>
                    <div className="group relative overflow-hidden h-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-5 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <div className="relative">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <span className="relative inline-flex">
                            <span className="absolute inset-0 rounded-2xl bg-orange-500/20 blur-xl" />
                            <span className="relative bg-gradient-to-br from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-5xl sm:text-6xl font-black text-transparent leading-none">
                              0{i + 1}
                            </span>
                          </span>
                          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                            <Check size={14} className="text-orange-400 sm:size-4" />
                          </div>
                        </div>
                        <p className="text-sm sm:text-sm leading-6 sm:leading-7 text-gray-200/90 [text-wrap:pretty]">{step}</p>
                        <div className="mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r from-orange-500 to-transparent transition-all duration-500 group-hover:w-full" />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>

          {/* ============ BENEFITS ============ */}
          <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
            <div className="absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-orange-500/5 blur-[140px]" />
            <Container className="relative">
              <Reveal>
                <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
                  <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm shadow-lg shadow-orange-500/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                    Why Choose SSI
                  </p>
                  <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                    Benefits You Can <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">Rely On</span>
                  </h2>
                  <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]" />
                </div>
              </Reveal>
              <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
                {detail.benefits.map((b, i) => (
                  <Reveal key={b} delay={i * 0.08}>
                    <div className="group relative overflow-hidden h-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <div className="relative flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/20 text-orange-400 shadow-lg shadow-orange-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-orange-500/40">
                          <Sparkles size={20} />
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-base sm:text-lg font-bold text-white leading-snug mb-2">{b.split('.')[0]}.</p>
                          {b.split('.')[1] && (
                            <p className="text-sm text-gray-400 leading-relaxed">{b.split('.')[1].trim()}</p>
                          )}
                          <div className="mt-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-orange-500 to-transparent transition-all duration-500 group-hover:w-full" />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>

          {/* ============ FAQ ============ */}
          {detail.faq.length > 0 && (
            <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
              <Container>
                <Reveal>
                  <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
                    <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm shadow-lg shadow-orange-500/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                      FAQs
                    </p>
                  <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                    Frequently Asked <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">Questions</span>
                  </h2>
                    <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]" />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="mx-auto max-w-3xl space-y-4 sm:space-y-5">
                    {detail.faq.map((faq, i) => (
                      <FaqItem key={faq.q} q={faq.q} a={faq.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
                    ))}
                  </div>
                </Reveal>
              </Container>
            </section>
          )}
        </>
      )}

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden pb-20 pt-6 sm:pb-24 text-white">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl sm:rounded-[40px] border border-orange-500/20 bg-gradient-to-br from-[#0d0d0d] to-black px-6 py-16 sm:px-8 sm:py-20 text-center shadow-2xl shadow-orange-500/10">
              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-[140px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_100%)]" />
              <span className="absolute left-4 top-5 text-6xl sm:text-8xl font-black uppercase leading-none text-white/[0.02] select-none">
                Begin
                <br />Today
              </span>
              <div className="relative z-10 mx-auto max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm mb-6">
                  <Sparkles size={12} />
                  Start Your Journey
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  Ready to Unlock Your
                  <span className="block mt-2 bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-transparent">
                    Peak Performance?
                  </span>
                </h2>
                <p className="mx-auto mt-5 sm:mt-6 max-w-xl text-sm sm:text-base leading-7 text-gray-300/90">
                  Start with a comprehensive sports science assessment and get
                  data-driven insights tailored to your goals.
                </p>
                <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:flex sm:gap-4 sm:justify-center">
                  <Link href="/booking">
                    <Button size="md" className="w-full sm:w-auto sm:min-w-[200px] whitespace-nowrap text-sm">
                      <CalendarClock size={14} /> Book Now
                    </Button>
                  </Link>
                  <a href="tel:+917381380010">
                    <Button variant="outline" size="md" type="button" className="w-full sm:w-auto sm:min-w-[200px] whitespace-nowrap text-sm">
                      <PhoneCall size={14} /> +91 73813 80010
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Footer />
    </>
  );
}
