"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/footer/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import {
  Heart,
  Baby,
  Users,
  HeartPulse,
  CalendarClock,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Calendar,
  PhoneCall,
  ArrowLeft,
  GraduationCap,
  Clock3,
  Award,
  Check,
  Activity,
} from "lucide-react";

const highlights = [
  { label: "Every Stage", sub: "Safe programmes for each trimester and after birth" },
  { label: "Specialist-Led", sub: "Guided with Dr. Nisha Kaushik Patnaik" },
  { label: "Return to Sport", sub: "Rebuild strength and confidence after childbirth" },
];

const whoFor = [
  {
    icon: Heart,
    title: "Expectant Mothers",
    text: "Stay active and strong through every trimester, safely.",
  },
  {
    icon: Baby,
    title: "New Mothers",
    text: "Rebuild core and pelvic health after birth, at your own pace.",
  },
  {
    icon: Users,
    title: "Active Women",
    text: "Pregnancy and postnatal guidance for sportswomen and athletes.",
  },
  {
    icon: HeartPulse,
    title: "Returning Mums",
    text: "A safe, structured path back to sport after childbirth.",
  },
];

const steps = [
  {
    title: "Health Screening",
    text: "Antenatal and postnatal screening with a specialist consultation, guided by Dr. Nisha Kaushik Patnaik.",
  },
  {
    title: "Safe Exercise Plan",
    text: "Individualised exercise plans designed around your stage of pregnancy or recovery.",
  },
  {
    title: "Core & Pelvic Health",
    text: "Ongoing guidance to protect your core and pelvic floor and return to sport safely.",
  },
];

const benefits = [
  {
    icon: Award,
    title: "Specialist Guidance",
    text: "Care informed by Dr. Nisha Kaushik Patnaik, Obstetrics & Gynaecology specialist (MRCOG London, FMAS Spain).",
  },
  {
    icon: ShieldCheck,
    title: "Safe, Personalised Plans",
    text: "Exercise and recovery tailored to your stage and your body.",
  },
  {
    icon: Sparkles,
    title: "Confidence to Return",
    text: "A clear, progressive plan so you can return to sport with total confidence.",
  },
];

const faqs = [
  {
    q: "When can I start exercising during pregnancy?",
    a: "For most women, gentle activity can continue or begin early in pregnancy. We design a plan around your health and stage, always prioritising safety.",
  },
  {
    q: "When can I start exercising after birth?",
    a: "It depends on your delivery and recovery. We assess you individually and build a plan that's safe for your stage of healing.",
  },
  {
    q: "Is this suitable for sportswomen?",
    a: "Absolutely. We combine obstetric care with sports science so active women can train safely and return to sport with confidence.",
  },
  {
    q: "Who runs this service?",
    a: "Pre & Post Natal Rehab is guided with Dr. Nisha Kaushik Patnaik, our Obstetrics & Gynaecology specialist (MBBS, MS · MRCOG London · FMAS Spain).",
  },
];

const credentials = ["MBBS, MS", "MRCOG (London, UK)", "FRM", "FMAS (Spain)"];

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

export default function PrePostNatalPage() {
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

  return (
    <>
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#050505] pt-32 pb-10 sm:pt-36 sm:pb-14 text-white">
        <div className="absolute -top-24 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[180px]" />
        <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-rose-600/5 blur-[140px]" />
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
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-rose-500/20 blur-2xl" />
                  <div className="relative flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl sm:rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-500/20 to-rose-500/5 shadow-[0_8px_32px_rgba(244,63,94,0.25)]">
                    <Activity size={24} className="text-rose-400 sm:size-8" />
                  </div>
                </div>
                <div>
                  <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-rose-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                    Women&apos;s Health &amp; Performance
                  </p>
                  <h1 className="mt-1.5 text-2xl sm:text-3xl md:text-4xl font-black leading-[1.1] tracking-tight">
                    Pre &amp; Post Natal{" "}
                    <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-rose-400 bg-clip-text text-transparent">
                      Rehab
                    </span>
                  </h1>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 h-1.5 w-20 sm:w-24 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.5)]" />
              <p className="mt-5 sm:mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-gray-300/90">
                Safe, specialist-led support through pregnancy and after birth —
                protecting your core, pelvic floor and whole body while keeping
                you active and strong at every stage of your journey.
              </p>

              <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:flex sm:justify-start sm:gap-4">
                <Link href="/booking">
                  <Button size="md" className="w-full sm:w-auto sm:min-w-[200px] whitespace-nowrap text-base sm:text-base">
                    <Calendar size={16} /> Book Now
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
                <div className="absolute h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-rose-500/20 blur-[120px] animate-pulse" />
                <div className="absolute h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] rounded-full border border-rose-500/15" />
                <div className="absolute h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] rounded-full border border-dashed border-rose-500/20 animate-[spin_40s_linear_infinite]" />

                <div className="relative group overflow-hidden rounded-3xl sm:rounded-[32px] border border-white/10 shadow-2xl shadow-rose-500/20">
                  <Image
                    src="/images/service_cards/pre-post-natal-rehab.png"
                    alt="Pre & Post Natal Rehab"
                    width={1024}
                    height={1024}
                    className="h-[300px] sm:h-[360px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 rounded-xl border border-white/15 bg-black/70 px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-xl shadow-lg">
                    <p className="text-xs sm:text-sm font-bold text-white">Pre &amp; Post Natal Rehab</p>
                    <p className="text-[10px] sm:text-xs text-rose-300 font-medium">Guided by Dr. Nisha Kaushik Patnaik</p>
                  </div>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-white/15 bg-black/60 backdrop-blur-xl">
                    <Baby size={16} className="text-rose-400 sm:size-[18px]" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Highlights - Premium pills */}
          <Reveal delay={0.2}>
            <div className="mt-10 sm:mt-14 grid gap-3 sm:gap-4 sm:grid-cols-3">
              {highlights.map((h, idx) => (
                <div
                  key={h.label}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl p-4 sm:p-5 transition-all duration-500 hover:-translate-y-1 hover:border-rose-500/40 hover:shadow-[0_12px_40px_rgba(244,63,94,0.2)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 shadow-lg shadow-rose-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-rose-500/40">
                      <Sparkles size={18} className="sm:size-5" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-white tracking-tight">{h.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{h.sub}</p>
                      <div className="mt-1 h-0.5 w-8 rounded-full bg-gradient-to-r from-rose-500 to-transparent transition-all duration-500 group-hover:w-16" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 text-xs font-bold">
                    0{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============ WHO IT'S FOR ============ */}
      <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
        <Container>
          <Reveal>
            <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm shadow-lg shadow-orange-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                Who It&apos;s For
              </p>
              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                Designed for Every <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">Stage</span> of Motherhood
              </h2>
              <div className="mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.5)]" />
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whoFor.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group relative overflow-hidden h-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-2 hover:border-rose-500/40 hover:shadow-[0_20px_60px_rgba(244,63,94,0.25)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 shadow-lg shadow-rose-500/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-rose-500/40">
                      <item.icon size={20} className="sm:size-[22px]" />
                    </div>
                    <h3 className="mt-4 text-base sm:text-lg font-bold text-white tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">{item.text}</p>
                    <div className="mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r from-rose-500 to-transparent transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ WHAT TO EXPECT ============ */}
      <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
        <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-rose-500/5 blur-[160px]" />
        <Container className="relative z-10">
          <Reveal>
            <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm shadow-lg shadow-orange-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                What To Expect
              </p>
              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                A Safe, Personal <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">Recovery Journey</span>
              </h2>
              <div className="mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.5)]" />
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="group relative overflow-hidden h-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-5 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-rose-500/40 hover:shadow-[0_20px_60px_rgba(244,63,94,0.25)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <span className="relative inline-flex">
                        <span className="absolute inset-0 rounded-2xl bg-rose-500/20 blur-xl" />
                        <span className="relative bg-gradient-to-br from-orange-400 via-rose-400 to-rose-400 bg-clip-text text-5xl sm:text-6xl font-black text-transparent leading-none">
                          0{i + 1}
                        </span>
                      </span>
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                        <Check size={14} className="text-rose-400 sm:size-4" />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-gray-400">{step.text}</p>
                    <div className="mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r from-rose-500 to-transparent transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ BENEFITS ============ */}
      <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
        <Container>
          <Reveal>
            <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm shadow-lg shadow-orange-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                Why Choose SSI
              </p>
              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                Benefits You Can <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">Rely On</span>
              </h2>
              <div className="mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.5)]" />
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 md:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="group relative overflow-hidden h-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-2 hover:border-rose-500/40 hover:shadow-[0_20px_60px_rgba(244,63,94,0.25)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-500/5 border border-rose-500/20 text-rose-400 shadow-lg shadow-rose-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-rose-500/40">
                      <b.icon size={20} />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug mb-2">{b.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{b.text}</p>
                      <div className="mt-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-rose-500 to-transparent transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 grid gap-3 rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl p-5 sm:p-6 sm:grid-cols-2">
              {["Antenatal Care", "Postnatal Recovery", "Core & Pelvic Health", "Safe Exercise Plans"].map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-400">
                    <Check size={12} />
                  </span>
                  {f}
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============ SPECIALIST ============ */}
      <section id="specialist" className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
        <div className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-rose-500/10 blur-[140px]" />
        <Container className="relative z-10">
          <Reveal>
            <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm shadow-lg shadow-orange-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                Meet Your Specialist
              </p>
              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                Trusted Care, <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">Internationally Trained</span>
              </h2>
              <div className="mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.5)]" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl sm:rounded-[32px] border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl">
              <div className="grid md:grid-cols-[260px_1fr]">
                <div className="relative min-h-[260px]">
                  <Image
                    src="/images/experts/Dr.Nisha Kaushik Patnaik.jpeg"
                    alt="Dr. Nisha Kaushik Patnaik"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/30" />
                </div>
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="flex items-center gap-2 text-rose-300">
                    <Heart size={16} />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">Co-Founder · Obstetrics &amp; Gynaecology</span>
                  </div>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Dr. Nisha Kaushik Patnaik</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    MBBS, MS · MRCOG (London, UK) · FRM · FMAS (Spain)
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {credentials.map((c) => (
                      <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300">
                        <GraduationCap size={12} /> {c}
                      </span>
                    ))}
                  </div>
                  <p className="mt-6 text-sm leading-7 text-gray-400">
                    Dr. Nisha provides expert, compassionate guidance on pregnancy,
                    women&apos;s health and safe return to training. Her consultations
                    are personal, evidence-based and built around your sporting and
                    life goals.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <span className="inline-flex items-center gap-2 text-sm text-gray-300">
                      <Clock3 size={15} className="text-rose-400" /> Evening appointments (4 PM – 8 PM), Mon–Sat
                    </span>
                    <Link href="/booking">
                      <Button>
                        <Calendar size={14} /> Book with Dr. Nisha
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============ FAQ ============ */}
      <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
        <Container>
          <Reveal>
            <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm shadow-lg shadow-orange-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                FAQs
              </p>
              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                Frequently Asked <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">Questions</span>
              </h2>
              <div className="mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.5)]" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto max-w-3xl space-y-3 sm:space-y-4">
              {faqs.map((faq, i) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden pb-20 pt-6 sm:pb-24 text-white">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl sm:rounded-[40px] border border-rose-500/20 bg-gradient-to-br from-[#0d0d0d] to-black px-6 py-16 sm:px-8 sm:py-20 text-center shadow-2xl shadow-rose-500/10">
              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-orange-500/20 to-rose-500/20 blur-[140px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_100%)]" />
              <span className="absolute left-4 top-5 text-6xl sm:text-8xl font-black uppercase leading-none text-white/[0.02] select-none">
                Begin
                <br />Today
              </span>
              <div className="relative z-10 mx-auto max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[3px] text-rose-400 backdrop-blur-sm mb-6">
                  <Sparkles size={12} />
                  Start Your Journey
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  Strong, Safe &amp; Confident,
                  <span className="block mt-2 bg-gradient-to-r from-orange-400 via-rose-400 to-rose-400 bg-clip-text text-transparent">
                    At Every Stage.
                  </span>
                </h2>
                <p className="mx-auto mt-5 sm:mt-6 max-w-xl text-sm sm:text-base leading-7 text-gray-300/90">
                  Begin your pre &amp; post natal rehab journey with expert,
                  specialist-led care designed around you.
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