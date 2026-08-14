"use client";

import { useMemo, useState, useEffect } from "react";
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
  Sparkles,
  HelpCircle,
  ChevronDown,
  Calendar,
  PhoneCall,
  Check,
  Target,
  TrendingUp,
} from "lucide-react";
import { bodyData } from "@/components/ecosystem/bodyData";
import { serviceDetails } from "@/components/ecosystem/serviceDetails";
import { serviceSectionDetails } from "@/components/services/servicePages";

const accentText = "text-cyan-400";
const accentBorder = "border-cyan-500/30";
const accentBg = "bg-cyan-500/10";
const accentGradient = "from-cyan-400 to-teal-400";
const accentDivider = "from-cyan-500 via-teal-500 to-cyan-500";
const accentGlow = "shadow-[0_0_20px_rgba(34,211,238,0.5)]";

type Detail = {
  slug: string;
  overview: string[];
  whoItsFor: string[];
  whatToExpect: string[];
  benefits: string[];
  faq: { q: string; a: string }[];
};

function slugFrom(link: string): string {
  return link.split("/").filter(Boolean).pop() || "";
}

function scrollToSection(id: string) {
  const scroll = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
    return false;
  };

  if (!scroll()) {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts += 1;
      if (scroll() || attempts > 20) clearInterval(interval);
    }, 150);
  }
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_8px_32px_rgba(34,211,238,0.15)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 sm:gap-4 px-5 py-5 sm:px-7 sm:py-6 text-left"
      >
        <span className="flex items-center gap-3 text-sm sm:text-base font-semibold text-white">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
            <HelpCircle size={16} className="text-cyan-400 sm:size-[17px]" />
          </div>
          {q}
        </span>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 transition-all duration-500 ${open ? "rotate-180 scale-110" : ""} group-hover:border-cyan-500/40`}>
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
              <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mb-5" />
              <p className="text-sm sm:text-base leading-7 text-gray-300/90">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HumanPerformancePage({ slug }: { slug: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const goToServices = () => {
    if (pathname !== "/") router.push("/");
    scrollToSection("ecosystem");
  };

  const body = useMemo(() => bodyData.find((item) => slugFrom(item.link) === slug), [slug]);

  const detail = useMemo<Detail | null>(
    () =>
      (serviceDetails.find((d) => d.slug === slug) ??
        serviceSectionDetails.find((d) => d.slug === slug) ??
        null) as Detail | null,
    [slug]
  );

  if (!body || !detail) return null;

  return (
    <>
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#050505] pt-32 pb-10 sm:pt-36 sm:pb-14 text-white">
        <div className="absolute -top-24 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />
        <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-teal-600/5 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,black_95%)]" />

        <Container className="relative z-10">
          <button
            onClick={goToServices}
            className="group inline-flex cursor-pointer items-center gap-2 text-xs text-gray-400 transition-all hover:text-cyan-400 hover:gap-2.5"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" /> Back to Human Performance
          </button>

          <div className="mt-6 sm:mt-8 grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-cyan-500/20 blur-2xl" />
                  <div className="relative flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 shadow-[0_8px_32px_rgba(34,211,238,0.25)]">
                    <span className="text-2xl sm:text-3xl">{body.icon}</span>
                  </div>
                </div>
                <div>
                  <p className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] ${accentText}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {body.subtitle}
                  </p>
                  <h1 className="mt-1.5 text-2xl sm:text-3xl md:text-4xl font-black leading-[1.1] tracking-tight">
                    {body.title.split(" ")[0]}{" "}
                    <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>
                      {body.title.split(" ").slice(1).join(" ")}
                    </span>
                  </h1>
                </div>
              </div>
              <div className={`mt-5 sm:mt-6 h-1.5 w-20 sm:w-24 rounded-full bg-gradient-to-r ${accentDivider} ${accentGlow}`} />
              <p className="mt-5 sm:mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-gray-300/90">
                {body.description}
              </p>

              <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:flex sm:justify-start sm:gap-4">
                <Link href="/booking">
                  <Button color="cyan" size="md" className="w-full sm:w-auto sm:min-w-[200px] whitespace-nowrap text-base sm:text-base">
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
                <div className="relative flex h-[300px] w-full sm:h-[360px] items-center justify-center rounded-3xl sm:rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-[#0d0d0d] to-black">
                  <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-cyan-500/10 via-transparent to-teal-500/10" />
                  <div className="relative flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/15 to-teal-500/10 shadow-[0_0_60px_rgba(34,211,238,0.25)]">
                    <span className="text-6xl sm:text-7xl">{body.icon}</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-4 flex justify-center">
                    <span className={`rounded-full border ${accentBorder} bg-black/60 px-4 py-2 text-xs sm:text-sm font-semibold ${accentText} backdrop-blur`}>
                      {body.title}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Feature pills */}
          <Reveal delay={0.2}>
            <div className="mt-10 sm:mt-14 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {body.features.map((f, idx) => (
                <div
                  key={f}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl p-4 sm:p-5 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_12px_40px_rgba(34,211,238,0.2)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/40">
                      <Sparkles size={18} className="sm:size-5" />
                    </div>
                    <p className="text-sm sm:text-base font-bold text-white tracking-tight">{f}</p>
                  </div>
                  <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-bold">
                    0{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============ OVERVIEW ============ */}
      <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
        <Container>
          <Reveal>
            <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
              <p className={`inline-flex items-center gap-2 rounded-full border ${accentBorder} ${accentBg} px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] ${accentText} backdrop-blur-sm shadow-lg shadow-cyan-500/10`}>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Overview
              </p>
              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                About This <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>Programme</span>
              </h2>
              <div className={`mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r ${accentDivider} ${accentGlow}`} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto max-w-3xl space-y-5 sm:space-y-6">
              {detail.overview.map((p, idx) => (
                <div
                  key={p.slice(0, 40)}
                  className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl p-6 sm:p-7 transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_12px_40px_rgba(34,211,238,0.15)]"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      <span className="text-xs font-bold">0{idx + 1}</span>
                    </div>
                    <p className="text-sm sm:text-base leading-7 text-gray-300/90 [text-wrap:pretty]">
                      {p}
                    </p>
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
              <p className={`inline-flex items-center gap-2 rounded-full border ${accentBorder} ${accentBg} px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] ${accentText} backdrop-blur-sm shadow-lg shadow-cyan-500/10`}>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Who It&apos;s For
              </p>
              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                Built Around <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>You</span>
              </h2>
              <div className={`mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r ${accentDivider} ${accentGlow}`} />
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {detail.whoItsFor.map((item, i) => (
              <Reveal key={item} delay={i * 0.08}>
                <div className="group relative overflow-hidden h-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/40 hover:shadow-[0_20px_60px_rgba(34,211,238,0.25)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-cyan-500/40">
                      <Target size={20} className="sm:size-[22px]" />
                    </div>
                    <p className="mt-4 text-sm sm:text-base leading-6 text-gray-300 [text-wrap:pretty]">{item}</p>
                    <div className="mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ WHAT TO EXPECT ============ */}
      <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
        <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-teal-500/5 blur-[160px]" />
        <Container className="relative z-10">
          <Reveal>
            <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
              <p className={`inline-flex items-center gap-2 rounded-full border ${accentBorder} ${accentBg} px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] ${accentText} backdrop-blur-sm shadow-lg shadow-cyan-500/10`}>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                What To Expect
              </p>
              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                Your Path, <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>Clearly Mapped</span>
              </h2>
              <div className={`mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r ${accentDivider} ${accentGlow}`} />
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {detail.whatToExpect.map((step, i) => (
              <Reveal key={step} delay={i * 0.1}>
                <div className="group relative overflow-hidden h-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-5 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/40 hover:shadow-[0_20px_60px_rgba(34,211,238,0.25)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <span className="relative inline-flex">
                        <span className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-xl" />
                        <span className={`relative bg-gradient-to-br ${accentGradient} bg-clip-text text-5xl sm:text-6xl font-black text-transparent leading-none`}>
                          0{i + 1}
                        </span>
                      </span>
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                        <Check size={14} className="text-cyan-400 sm:size-4" />
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-gray-300 [text-wrap:pretty]">{step}</p>
                    <div className="mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ BENEFITS ============ */}
      <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[140px]" />
        <Container className="relative">
          <Reveal>
            <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
              <p className={`inline-flex items-center gap-2 rounded-full border ${accentBorder} ${accentBg} px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] ${accentText} backdrop-blur-sm shadow-lg shadow-cyan-500/10`}>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Why Choose SSI
              </p>
              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                Benefits You Can <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>Rely On</span>
              </h2>
              <div className={`mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r ${accentDivider} ${accentGlow}`} />
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 md:grid-cols-3">
            {detail.benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.08}>
                <div className="group relative overflow-hidden h-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/40 hover:shadow-[0_20px_60px_rgba(34,211,238,0.25)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-cyan-500/40">
                      <TrendingUp size={20} />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm sm:text-base leading-6 text-gray-300 [text-wrap:pretty]">{b}</p>
                      <div className="mt-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-500 group-hover:w-full" />
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
                <p className={`inline-flex items-center gap-2 rounded-full border ${accentBorder} ${accentBg} px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] ${accentText} backdrop-blur-sm shadow-lg shadow-cyan-500/10`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  FAQs
                </p>
                <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                  Frequently Asked <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>Questions</span>
                </h2>
                <div className={`mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r ${accentDivider} ${accentGlow}`} />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mx-auto max-w-3xl space-y-3 sm:space-y-4">
                {detail.faq.map((faq, i) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden pb-20 pt-6 sm:pb-24 text-white">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl sm:rounded-[40px] border border-cyan-500/20 bg-gradient-to-br from-[#0d0d0d] to-black px-6 py-16 sm:px-8 sm:py-20 text-center shadow-2xl shadow-cyan-500/10">
              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 blur-[140px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_100%)]" />
              <span className="absolute left-4 top-5 text-6xl sm:text-8xl font-black uppercase leading-none text-white/[0.02] select-none">
                Move
                <br />Better
              </span>
              <div className="relative z-10 mx-auto max-w-2xl">
                <div className={`inline-flex items-center gap-2 rounded-full border ${accentBorder} ${accentBg} px-4 py-2 text-[10px] font-bold uppercase tracking-[3px] ${accentText} backdrop-blur-sm mb-6`}>
                  <Sparkles size={12} />
                  Start Your Journey
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  Ready to Unlock Your
                  <span className={`block mt-2 bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>
                    Athletic Potential?
                  </span>
                </h2>
                <p className="mx-auto mt-5 sm:mt-6 max-w-xl text-sm sm:text-base leading-7 text-gray-300/90">
                  Start with a comprehensive assessment and get data-driven
                  insights tailored to your goals.
                </p>
                <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:flex sm:gap-4 sm:justify-center">
                  <Link href="/booking">
                    <Button color="cyan" size="md" className="w-full sm:w-auto sm:min-w-[200px] whitespace-nowrap text-sm">
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