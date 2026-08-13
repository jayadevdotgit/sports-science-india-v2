"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/footer/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import {
  ArrowLeft,
  CalendarClock,
  Brain,
  Crosshair,
  Zap,
  HelpCircle,
  ChevronDown,
  Calendar,
  PhoneCall,
  Check,
  Target,
  Eye,
  Battery,
  TrendingUp,
  Lock,
  Quote,
} from "lucide-react";

const mentalPillars = [
  { icon: Crosshair, label: "Focus", sub: "Sustained attention under pressure" },
  { icon: Zap, label: "Confidence", sub: "Unshakeable self-belief" },
  { icon: Eye, label: "Decision Making", sub: "Clear choices in split seconds" },
  { icon: Battery, label: "Energy Control", sub: "Manage arousal & emotions" },
];

const whoFor = [
  {
    title: "Competitive Athletes",
    text: "Tame pre-competition nerves and learn to perform under pressure.",
  },
  {
    title: "Young & Developing Talent",
    text: "Build mental skills early that scale with your game.",
  },
  {
    title: "Injury Comebacks",
    text: "Rebuild confidence in your body and remove the fear of re-injury.",
  },
  {
    title: "Teams & Coaches",
    text: "Instil a resilient, high-performance culture across the squad.",
  },
];

const stages = [
  {
    step: "01",
    title: "Assess",
    text: "A confidential mental-skills assessment to understand how you think, react and respond when it counts.",
  },
  {
    step: "02",
    title: "Train",
    text: "Personalised focus, confidence and stress-management strategies — trained like physical skill.",
  },
  {
    step: "03",
    title: "Perform",
    text: "Regular progress reviews so the gains show up in measurable improvements on the field.",
  },
];

const testimonials = [
  {
    quote: "I stopped second-guessing myself in the final over. My decisions now feel automatic.",
    author: "Cricket Fast Bowler",
  },
  {
    quote: "The biggest change was staying calm when the pressure was highest.",
    author: "National-Level Shooter",
  },
];

const faqs = [
  {
    q: "How many sessions will I need?",
    a: "Most athletes see meaningful change within 4–6 sessions, though this depends on your goals and the challenges you are working on.",
  },
  {
    q: "Is sports psychology only for professionals?",
    a: "No. Any athlete — from school level to elite — can benefit from mental skills training.",
  },
  {
    q: "Is everything confidential?",
    a: "Yes. All assessments and sessions are strictly confidential and built around your specific needs.",
  },
];

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_8px_32px_rgba(99,102,241,0.15)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 sm:gap-4 px-5 py-5 sm:px-7 sm:py-6 text-left"
      >
        <span className="flex items-center gap-3 text-sm sm:text-base font-semibold text-white">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
            <HelpCircle size={16} className="text-indigo-400 sm:size-[17px]" />
          </div>
          {q}
        </span>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 transition-all duration-500 ${open ? "rotate-180 scale-110" : ""} group-hover:border-indigo-500/40`}>
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
              <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent mb-5" />
              <p className="text-sm sm:text-base leading-7 text-gray-300/90">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SportsPsychologyPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const goToServices = () => {
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        document.getElementById("ecosystem")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 450);
    } else {
      document.getElementById("ecosystem")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#050505] pt-32 pb-10 sm:pt-36 sm:pb-14 text-white">
        <div className="absolute -top-24 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[180px]" />
        <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/5 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,black_95%)]" />

        <Container className="relative z-10">
          <button
            onClick={goToServices}
            className="group inline-flex cursor-pointer items-center gap-2 text-xs text-gray-400 transition-all hover:text-indigo-400 hover:gap-2.5"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" /> Back to Human Performance
          </button>

          <div className="mt-6 sm:mt-8 grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-indigo-500/20 blur-2xl" />
                  <div className="relative flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl sm:rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 shadow-[0_8px_32px_rgba(99,102,241,0.25)]">
                    <Brain size={24} className="text-indigo-400 sm:size-8" />
                  </div>
                </div>
                <div>
                  <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-indigo-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    Peak Mental Performance
                  </p>
                  <h1 className="mt-1.5 text-2xl sm:text-3xl md:text-4xl font-black leading-[1.1] tracking-tight">
                    Sports <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">Psychology</span>
                  </h1>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 h-1.5 w-20 sm:w-24 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
              <p className="mt-5 sm:mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-gray-300/90">
                The science of how the mind influences athletic performance.
                Train focus, confidence and emotional control the same way you
                train your body — so you stay calm, decisive and sharp when it
                matters most.
              </p>

              <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:flex sm:justify-start sm:gap-4">
                <Link href="/booking">
                  <Button color="indigo" size="md" className="w-full sm:w-auto sm:min-w-[200px] whitespace-nowrap text-base sm:text-base">
                    <Calendar size={16} /> Book Now
                  </Button>
                </Link>
                <a href="tel:+917381380010">
                  <Button variant="outline" size="md" type="button" className="w-full sm:w-auto sm:min-w-[200px] whitespace-nowrap text-base sm:text-base border-indigo-500/40 text-indigo-300 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white">
                    <PhoneCall size={16} /> +91 73813 80010
                  </Button>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative mx-auto flex max-w-sm items-center justify-center">
                <div className="absolute h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-indigo-500/20 blur-[120px] animate-pulse" />
                <div className="absolute h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] rounded-full border border-indigo-500/15" />
                <div className="absolute h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] rounded-full border border-dashed border-indigo-500/20 animate-[spin_40s_linear_infinite]" />

                <div className="relative flex h-[300px] w-full sm:h-[360px] items-center justify-center rounded-3xl sm:rounded-[32px] border border-indigo-500/20 bg-gradient-to-br from-[#0d0d0d] to-black">
                  <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10" />
                  <div className="relative flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center rounded-3xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/15 to-violet-500/10 shadow-[0_0_60px_rgba(99,102,241,0.25)]">
                    <Brain size={56} className="text-indigo-400 sm:size-16" />
                  </div>
                  <div className="absolute inset-x-0 bottom-4 flex justify-center">
                    <span className="rounded-full border border-indigo-500/30 bg-black/60 px-4 py-2 text-xs sm:text-sm font-semibold text-indigo-300 backdrop-blur">
                      Mind · Body · Performance
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Mental Pillars */}
          <Reveal delay={0.2}>
            <div className="mt-10 sm:mt-14 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {mentalPillars.map((p, idx) => (
                <div
                  key={p.label}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl p-4 sm:p-5 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-[0_12px_40px_rgba(99,102,241,0.2)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 shadow-lg shadow-indigo-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-indigo-500/40">
                      <p.icon size={18} className="sm:size-5" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-white tracking-tight">{p.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.sub}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-bold">
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
              <p className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-indigo-400 backdrop-blur-sm shadow-lg shadow-indigo-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Who It&apos;s For
              </p>
              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                Built Around <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Your Mind</span>
              </h2>
              <div className="mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whoFor.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group relative overflow-hidden h-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 shadow-lg shadow-indigo-500/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-indigo-500/40">
                      <Target size={20} className="sm:size-[22px]" />
                    </div>
                    <h3 className="mt-4 text-base sm:text-lg font-bold text-white tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">{item.text}</p>
                    <div className="mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-transparent transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ JOURNEY ============ */}
      <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
        <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/5 blur-[160px]" />
        <Container className="relative z-10">
          <Reveal>
            <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-indigo-400 backdrop-blur-sm shadow-lg shadow-indigo-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                The Journey
              </p>
              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                Assess. Train. <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Perform.</span>
              </h2>
              <div className="mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
            {stages.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1}>
                <div className="group relative overflow-hidden h-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <span className="relative inline-flex">
                        <span className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl" />
                        <span className="relative bg-gradient-to-br from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-5xl sm:text-6xl font-black text-transparent leading-none">
                          {s.step}
                        </span>
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                        <Check size={15} className="text-indigo-400" />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-gray-400">{s.text}</p>
                    <div className="mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-transparent transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ RESULTS / TESTIMONIALS ============ */}
      <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[140px]" />
        <Container className="relative">
          <Reveal>
            <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-indigo-400 backdrop-blur-sm shadow-lg shadow-indigo-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Real Results
              </p>
              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                The Mind <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Makes The Difference</span>
              </h2>
              <div className="mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
            </div>
          </Reveal>

          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.1}>
                <div className="group relative overflow-hidden h-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-7 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <Quote size={28} className="text-indigo-500/40" />
                  <p className="mt-4 text-base sm:text-lg leading-7 text-gray-200/90 [text-wrap:pretty]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/10 border border-indigo-500/20">
                      <TrendingUp size={16} className="text-indigo-400" />
                    </div>
                    <span className="text-sm font-semibold text-white">{t.author}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ FAQ ============ */}
      <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
        <Container>
          <Reveal>
            <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-indigo-400 backdrop-blur-sm shadow-lg shadow-indigo-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                FAQs
              </p>
              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                Frequently Asked <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Questions</span>
              </h2>
              <div className="mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
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
            <div className="relative overflow-hidden rounded-3xl sm:rounded-[40px] border border-indigo-500/20 bg-gradient-to-br from-[#0d0d0d] to-black px-6 py-16 sm:px-8 sm:py-20 text-center shadow-2xl shadow-indigo-500/10">
              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 blur-[140px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_100%)]" />
              <span className="absolute left-4 top-5 text-6xl sm:text-8xl font-black uppercase leading-none text-white/[0.02] select-none">
                Train
                <br />Your Mind
              </span>
              <div className="relative z-10 mx-auto max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[3px] text-indigo-400 backdrop-blur-sm mb-6">
                  <Lock size={12} />
                  Start Your Journey
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  Your Mind Is Your
                  <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                    Greatest Asset.
                  </span>
                </h2>
                <p className="mx-auto mt-5 sm:mt-6 max-w-xl text-sm sm:text-base leading-7 text-gray-300/90">
                  Start with a confidential mental-skills assessment and build
                  the edge that shows up when it matters most.
                </p>
                <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:flex sm:gap-4 sm:justify-center">
                  <Link href="/booking">
                    <Button color="indigo" size="md" className="w-full sm:w-auto sm:min-w-[200px] whitespace-nowrap text-sm">
                      <CalendarClock size={14} /> Book Now
                    </Button>
                  </Link>
                  <a href="tel:+917381380010">
                    <Button variant="outline" size="md" type="button" className="w-full sm:w-auto sm:min-w-[200px] whitespace-nowrap text-sm border-indigo-500/40 text-indigo-300 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white">
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