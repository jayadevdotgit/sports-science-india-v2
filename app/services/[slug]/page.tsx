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
  Calendar,
  ArrowRight,
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
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-800 bg-[#0d0d0d] transition-colors duration-300 hover:border-orange-500/40">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 sm:gap-4 px-4 py-4 sm:px-6 sm:py-5 text-left"
      >
        <span className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base font-semibold text-white">
          <HelpCircle size={16} className="shrink-0 text-orange-400 sm:size-[18px]" />
          {q}
        </span>
        <span className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <ChevronDown size={14} className="sm:size-4" />
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
            <p className="px-4 pb-5 pl-9 sm:px-6 sm:pb-6 sm:pl-12 text-xs sm:text-sm leading-6 sm:leading-7 text-gray-400">{a}</p>
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
      <section className="relative overflow-hidden bg-[#050505] pt-24 pb-12 sm:pt-32 sm:pb-14 text-white">
        <div className="absolute -top-24 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,black_95%)]" />

        <Container className="relative z-10">
          <button
            onClick={goToServices}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-gray-400 hover:text-orange-400 transition"
          >
            <ArrowLeft size={14} /> Back to Services
          </button>

          <div className="mt-8 sm:mt-10 grid items-center gap-10 lg:gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl border border-orange-500/40 bg-orange-500/10">
                <Icon size={28} className="text-orange-500 sm:size-10" />
              </div>
              <p className="mt-6 sm:mt-8 text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] text-orange-500">
                {service.subtitle}
              </p>
              <h1 className="mt-2 sm:mt-3 text-2xl sm:text-4xl md:text-5xl font-black leading-tight">
                {service.title.split(" ")[0]}
                <span className="block bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                  {service.title.includes(" ") ? service.title.split(" ").slice(1).join(" ") : "Performance"}
                </span>
              </h1>
              <div className="mt-5 sm:mt-6 h-1 w-16 sm:w-20 rounded-full bg-orange-500" />
              <p className="mt-5 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-gray-400">
                {service.description}
              </p>

              <div className="mt-7 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                <Link href="/booking">
                  <Button size="lg">
                    <Calendar size={16} /> Book an Assessment
                  </Button>
                </Link>
                <Button variant="outline" size="lg" type="button" onClick={goToServices}>
                  <ShieldCheck size={16} /> Explore Other Services
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative mx-auto flex max-w-md items-center justify-center">
                <div className="absolute h-56 w-56 sm:h-64 sm:w-64 rounded-full bg-orange-500/20 blur-[100px]" />
                <div className="absolute h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] rounded-full border border-orange-500/15" />
                <div className="absolute h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] rounded-full border border-dashed border-orange-500/25" />

                {service.image ? (
                  <div className="relative overflow-hidden rounded-3xl sm:rounded-[32px] border border-white/10 shadow-2xl shadow-orange-500/10">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={1024}
                      height={1024}
                      className="h-[340px] sm:h-[420px] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 rounded-xl sm:rounded-2xl border border-white/10 bg-black/60 px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-xl">
                      <p className="text-[11px] sm:text-xs font-semibold text-white">{service.title}</p>
                      <p className="text-[10px] sm:text-[11px] text-gray-400">Sports Science India</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex h-[340px] sm:h-[420px] w-full items-center justify-center rounded-3xl sm:rounded-[32px] border border-orange-500/20 bg-[#0d0d0d]">
                    <div className="flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10">
                      <Icon size={48} className="text-orange-400 sm:size-14" />
                    </div>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:bottom-4 rounded-full border border-orange-500/30 bg-black/60 px-3 py-1.5 sm:px-4 text-[11px] sm:text-xs font-semibold text-orange-300 backdrop-blur">
                      {service.title}
                    </span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Feature highlights */}
          <Reveal delay={0.2}>
            <div className="mt-12 sm:mt-16 grid gap-3 sm:gap-4 rounded-2xl sm:rounded-[28px] border border-gray-800 bg-[#0d0d0d]/70 p-4 sm:p-6 backdrop-blur-xl sm:grid-cols-3">
              {highlightFeatures.map((f) => (
                <div key={f} className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
                    <Sparkles size={16} className="sm:size-[18px]" />
                  </div>
                  <p className="text-sm sm:text-base font-bold text-white">{f}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {detail && (
        <>
          {/* ============ OVERVIEW ============ */}
          <section className="relative overflow-hidden bg-[#050505] py-12 sm:py-14 text-white">
            <Container>
              <Reveal>
                <div className="mx-auto mb-10 sm:mb-12 max-w-3xl text-center">
                  <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[3px] text-orange-400">Overview</p>
                  <h2 className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-bold">
                    About This <span className="text-orange-500">Service</span>
                  </h2>
                  <div className="mx-auto mt-5 sm:mt-6 h-1 w-16 sm:w-20 rounded-full bg-orange-500" />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mx-auto max-w-3xl space-y-4 sm:space-y-5">
                  {detail.overview.map((p) => (
                    <p key={p.slice(0, 40)} className="text-sm sm:text-base leading-7 sm:leading-8 text-gray-300">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </Container>
          </section>

          {/* ============ WHO IT'S FOR ============ */}
          <section className="relative overflow-hidden bg-[#050505] py-12 sm:py-14 text-white">
            <Container>
              <Reveal>
                <div className="mx-auto mb-10 sm:mb-12 max-w-3xl text-center">
                  <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[3px] text-orange-400">Who It&apos;s For</p>
                  <h2 className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-bold">
                    Built Around <span className="text-orange-500">You</span>
                  </h2>
                  <div className="mx-auto mt-5 sm:mt-6 h-1 w-16 sm:w-20 rounded-full bg-orange-500" />
                </div>
              </Reveal>
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                {detail.whoItsFor.map((item, i) => (
                  <Reveal key={item} delay={i * 0.06}>
                    <div className="group flex h-full items-start gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-gray-800 bg-[#0d0d0d] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)]">
                      <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                        <Users size={18} className="sm:size-5" />
                      </div>
                      <p className="text-sm sm:text-sm leading-6 sm:leading-7 text-gray-300">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>

          {/* ============ WHAT TO EXPECT ============ */}
          <section className="relative overflow-hidden bg-[#050505] py-12 sm:py-14 text-white">
            <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/5 blur-[160px]" />
            <Container className="relative z-10">
              <Reveal>
                <div className="mx-auto mb-10 sm:mb-12 max-w-3xl text-center">
                  <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[3px] text-orange-400">What To Expect</p>
                  <h2 className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-bold">
                    Your Path, <span className="text-orange-500">Clearly Mapped</span>
                  </h2>
                  <div className="mx-auto mt-5 sm:mt-6 h-1 w-16 sm:w-20 rounded-full bg-orange-500" />
                </div>
              </Reveal>
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {detail.whatToExpect.map((step, i) => (
                  <Reveal key={step} delay={i * 0.1}>
                    <div className="relative h-full rounded-2xl sm:rounded-3xl border border-gray-800 bg-[#0d0d0d] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)]">
                      <span className="bg-gradient-to-br from-orange-400 to-orange-300 bg-clip-text text-5xl sm:text-6xl font-black text-transparent">
                        0{i + 1}
                      </span>
                      <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-gray-300">{step}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>

          {/* ============ BENEFITS ============ */}
          <section className="relative overflow-hidden bg-[#050505] py-12 sm:py-14 text-white">
            <Container>
              <Reveal>
                <div className="mx-auto mb-10 sm:mb-12 max-w-3xl text-center">
                  <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[3px] text-orange-400">Why Choose SSI</p>
                  <h2 className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-bold">
                    Benefits You Can <span className="text-orange-500">Rely On</span>
                  </h2>
                  <div className="mx-auto mt-5 sm:mt-6 h-1 w-16 sm:w-20 rounded-full bg-orange-500" />
                </div>
              </Reveal>
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
                {detail.benefits.map((b, i) => (
                  <Reveal key={b} delay={i * 0.08}>
                    <div className="group h-full rounded-2xl sm:rounded-3xl border border-gray-800 bg-[#0d0d0d] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)]">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-orange-500/10 text-orange-400 transition-transform duration-500 group-hover:scale-110">
                        <Sparkles size={20} className="sm:size-[22px]" />
                      </div>
                      <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-6 sm:leading-7 text-gray-300">{b}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>

          {/* ============ FAQ ============ */}
          {detail.faq.length > 0 && (
            <section className="relative overflow-hidden bg-[#050505] py-12 sm:py-14 text-white">
              <Container>
                <Reveal>
                  <div className="mx-auto mb-10 sm:mb-12 max-w-3xl text-center">
                    <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[3px] text-orange-400">FAQs</p>
                    <h2 className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-bold">
                      Frequently Asked <span className="text-orange-500">Questions</span>
                    </h2>
                    <div className="mx-auto mt-5 sm:mt-6 h-1 w-16 sm:w-20 rounded-full bg-orange-500" />
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
        </>
      )}

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden pb-16 pt-4 sm:pb-20 text-white">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl sm:rounded-[32px] border border-orange-500/20 bg-[#0d0d0d] px-5 py-12 sm:px-6 sm:py-14 text-center">
              <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-[120px]" />
              <span className="absolute left-3 top-4 text-5xl sm:text-7xl font-black uppercase leading-none text-white/[0.03]">
                Begin
                <br />Today
              </span>
              <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
                  Ready to Unlock Your
                  <span className="block bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                    Peak Performance?
                  </span>
                </h2>
                <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-xs sm:text-sm leading-6 sm:leading-7 text-gray-400">
                  Start with a comprehensive sports science assessment and get
                  data-driven insights tailored to your goals.
                </p>
                <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
                  <Link href="/booking">
                    <Button size="lg">
                      <CalendarClock size={16} /> Book an Assessment
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" type="button" onClick={goToServices}>
                    <ArrowRight size={16} /> Explore Other Services
                  </Button>
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
