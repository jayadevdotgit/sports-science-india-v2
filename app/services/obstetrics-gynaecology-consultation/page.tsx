"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  CheckCircle2,
  Clock3,
  Award,
  GraduationCap,
  HelpCircle,
  ChevronDown,
  Stethoscope,
  Calendar,
  PhoneCall,
} from "lucide-react";

const highlights = [
  { label: "Specialist-Led", sub: "Consultations with Dr. Nisha Kaushik Patnaik" },
  { label: "Personal Care", sub: "Clear, individual health plans for every woman" },
  { label: "Return to Sport", sub: "Pregnancy & activity guidance for athletes" },
];

const whoFor = [
  {
    icon: Heart,
    title: "Women with Concerns",
    text: "Pregnancy or gynaecological concerns handled with expert, judgment-free care.",
  },
  {
    icon: Users,
    title: "Sportswomen",
    text: "Elite and active women wanting specialist women's health guidance.",
  },
  {
    icon: Baby,
    title: "Expectant Mothers",
    text: "Planning safe activity and training throughout every stage.",
  },
  {
    icon: HeartPulse,
    title: "New Mothers",
    text: "Returning to sport after childbirth, safely and confidently.",
  },
];

const steps = [
  {
    title: "Specialist Consultation",
    text: "A one-on-one consultation with Dr. Nisha Kaushik Patnaik (MBBS, MS · MRCOG London · FMAS Spain).",
  },
  {
    title: "Expert Guidance",
    text: "Focused answers on your specific pregnancy, gynaecological or return-to-training concern.",
  },
  {
    title: "Your Personal Plan",
    text: "A clear, individual health plan you can follow with total confidence.",
  },
];

const benefits = [
  {
    icon: Award,
    title: "Specialist Expertise",
    text: "Internationally trained Obstetrics & Gynaecology specialist (MRCOG London, FMAS Spain).",
  },
  {
    icon: ShieldCheck,
    title: "Safe, Personalised Advice",
    text: "Pregnancy and activity guidance tailored to your body and goals.",
  },
  {
    icon: Sparkles,
    title: "Confidence in Your Choices",
    text: "Make informed health and training decisions with expert backing.",
  },
];

const faqs = [
  {
    q: "Is this consultation covered by the same booking system?",
    a: "Yes. Select “Obstetrics & Gynaecology Consultation” when booking — it is available only with Dr. Nisha Kaushik Patnaik.",
  },
  {
    q: "When does Dr. Nisha consult?",
    a: "Dr. Nisha takes evening appointments (4:00 PM onwards), Mondays to Saturdays. Sundays are closed.",
  },
  {
    q: "I'm a sportswoman planning for pregnancy — is this right for me?",
    a: "Absolutely. The consultation covers pregnancy planning, safe training during pregnancy and returning to sport safely after childbirth.",
  },
  {
    q: "What should I prepare for the consultation?",
    a: "Bring any previous reports, your training history and a list of questions. She'll build a clear, personal plan around your situation.",
  },
];

const credentials = ["MBBS, MS", "MRCOG (London, UK)", "FRM", "FMAS (Spain)"];

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-800 bg-[#0d0d0d] transition-colors duration-300 hover:border-orange-500/40">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="flex items-center gap-3 text-base font-semibold text-white">
          <HelpCircle size={18} className="shrink-0 text-orange-400" />
          {q}
        </span>
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <ChevronDown size={16} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-6 pb-6 pl-12 text-sm leading-7 text-gray-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ObGynPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#050505] pt-32 text-white">
        <div className="absolute -top-24 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[180px]" />
        <div className="absolute right-0 top-32 h-[400px] w-[400px] rounded-full bg-rose-500/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,black_95%)]" />

        <Container className="relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-rose-300 backdrop-blur-sm">
                <Heart size={14} /> Women&apos;s Health &amp; Performance
              </p>
              <h1 className="mt-6 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                Obstetrics &amp; Gynaecology
                <span className="block bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                  Consultation
                </span>
              </h1>
              <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-rose-500" />
              <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 md:text-lg">
                Specialist obstetric and gynaecological care for women who are
                active — including sportswomen, expectant mothers, and those
                returning to exercise after childbirth. Expert guidance on
                pregnancy, women&apos;s health and training safely.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/booking">
                  <Button size="lg">
                    <Calendar size={16} /> Book a Consultation
                  </Button>
                </Link>
                <a href="#specialist">
                  <Button variant="outline" size="lg">
                    <Stethoscope size={16} /> Meet the Specialist
                  </Button>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative mx-auto flex max-w-md items-center justify-center">
                <div className="absolute h-64 w-64 rounded-full bg-orange-500/20 blur-[100px]" />
                <div className="absolute h-[420px] w-[420px] rounded-full border border-orange-500/15" />
                <div className="absolute h-[360px] w-[360px] rounded-full border border-dashed border-orange-500/25 animate-[spin_40s_linear_infinite]" />

                <div className="relative overflow-hidden rounded-[32px] border border-white/10 shadow-2xl shadow-orange-500/10">
                  <Image
                    src="/images/services/obstetrics-gynaecology-consultation.png"
                    alt="Obstetrics & Gynaecology Consultation"
                    width={1024}
                    height={1024}
                    className="h-[420px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/20 text-rose-300">
                      <Heart size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Dr. Nisha Kaushik Patnaik</p>
                      <p className="text-[11px] text-gray-400">Obstetrics &amp; Gynaecology</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Highlights */}
          <Reveal delay={0.2}>
            <div className="mt-16 grid gap-4 rounded-[28px] border border-gray-800 bg-[#0d0d0d]/70 p-6 backdrop-blur-xl sm:grid-cols-3">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-white">{h.label}</p>
                    <p className="text-xs text-gray-400">{h.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============ WHO IT'S FOR ============ */}
      <section className="relative overflow-hidden bg-[#050505] py-14 text-white">
        <Container>
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400">Who It&apos;s For</p>
              <h2 className="mt-6 text-3xl font-bold md:text-4xl">
                Designed for Every Stage of a Woman&apos;s Journey
              </h2>
              <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whoFor.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group h-full rounded-3xl border border-gray-800 bg-[#0d0d0d] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <item.icon size={22} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ JOURNEY / WHAT TO EXPECT ============ */}
      <section className="relative overflow-hidden bg-[#050505] py-14 text-white">
        <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-rose-500/5 blur-[160px]" />
        <Container className="relative z-10">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400">What To Expect</p>
              <h2 className="mt-6 text-3xl font-bold md:text-4xl">
                A Calm, Personal <span className="text-orange-500">Care Journey</span>
              </h2>
              <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="relative h-full rounded-3xl border border-gray-800 bg-[#0d0d0d] p-8">
                  <span className="bg-gradient-to-br from-orange-400 to-rose-400 bg-clip-text text-6xl font-black text-transparent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-400">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ BENEFITS ============ */}
      <section className="relative overflow-hidden bg-[#050505] py-14 text-white">
        <Container>
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400">Why Choose SSI</p>
              <h2 className="mt-6 text-3xl font-bold md:text-4xl">
                Benefits You Can <span className="text-orange-500">Rely On</span>
              </h2>
              <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="group h-full rounded-3xl border border-gray-800 bg-[#0d0d0d] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-rose-500/40 hover:shadow-[0_20px_60px_rgba(244,63,94,0.15)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-rose-500/20 text-orange-400 transition-transform duration-500 group-hover:scale-110">
                    <b.icon size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{b.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-400">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 grid gap-3 rounded-[28px] border border-gray-800 bg-[#0d0d0d]/70 p-6 backdrop-blur-xl sm:grid-cols-2">
              {["Gynaecology Care", "Pregnancy Consultation", "Women's Health", "Expert Guidance"].map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 size={16} className="shrink-0 text-orange-500" />
                  {f}
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============ SPECIALIST ============ */}
      <section id="specialist" className="relative overflow-hidden bg-[#050505] py-14 text-white">
        <div className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-rose-500/10 blur-[140px]" />
        <Container className="relative z-10">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400">Meet Your Specialist</p>
              <h2 className="mt-6 text-3xl font-bold md:text-4xl">
                Trusted Care, <span className="text-orange-500">Internationally Trained</span>
              </h2>
              <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-gray-800 bg-[#0d0d0d]">
              <div className="grid md:grid-cols-[280px_1fr]">
                <div className="relative min-h-[300px]">
                  <Image
                    src="/images/experts/Dr.Nisha Kaushik Patnaik.jpeg"
                    alt="Dr. Nisha Kaushik Patnaik"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/30" />
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-2 text-rose-300">
                    <Heart size={16} />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">Co-Founder · Obstetrics &amp; Gynaecology</span>
                  </div>
                  <h3 className="mt-2 text-3xl font-black">Dr. Nisha Kaushik Patnaik</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    MBBS, MS · MRCOG (London, UK) · FRM · FMAS (Spain)
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {credentials.map((c) => (
                      <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-300">
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
                      <Clock3 size={15} className="text-orange-400" /> Evening appointments (4 PM – 8 PM), Mon–Sat
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
      <section className="relative overflow-hidden bg-[#050505] py-14 text-white">
        <Container>
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400">FAQs</p>
              <h2 className="mt-6 text-3xl font-bold md:text-4xl">
                Frequently Asked <span className="text-orange-500">Questions</span>
              </h2>
              <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto max-w-3xl space-y-4">
              {faqs.map((faq, i) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden pb-20 pt-4 text-white">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] border border-orange-500/20 bg-[#0d0d0d] px-6 py-14 text-center">
              <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-orange-500/20 to-rose-500/20 blur-[120px]" />
              <span className="absolute left-4 top-6 text-7xl font-black uppercase leading-none text-white/[0.03]">
                Begin
                <br />Today
              </span>
              <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="text-3xl font-black md:text-4xl">
                  Your Health, Your Training,
                  <span className="block bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">In Expert Hands.</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400">
                  Book your consultation with Dr. Nisha Kaushik Patnaik and get
                  a clear, personal plan for your women&apos;s health and performance.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link href="/booking">
                    <Button size="lg">
                      <CalendarClock size={16} /> Book an Appointment
                    </Button>
                  </Link>
                  <a href="tel:+917381380010">
                    <Button variant="outline" size="lg">
                      <PhoneCall size={16} /> +91 73813 80010
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