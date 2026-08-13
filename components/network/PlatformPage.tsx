"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/footer/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import { platforms } from "@/data/platforms";
import {
  ArrowLeft,
  CalendarClock,
  Calendar,
  PhoneCall,
  Sparkles,
  TrendingUp,
  Users,
  Check,
} from "lucide-react";

const badgeStyles: Record<string, string> = {
  orange: "bg-orange-500/20 border-orange-500/40 text-orange-300",
  blue: "bg-blue-500/20 border-blue-500/40 text-blue-300",
  gold: "bg-amber-500/20 border-amber-500/40 text-amber-300",
  purple: "bg-purple-500/20 border-purple-500/40 text-purple-300",
  cyan: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300",
  green: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
  emerald: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
  amber: "bg-amber-500/20 border-amber-500/40 text-amber-300",
  rose: "bg-rose-500/20 border-rose-500/40 text-rose-300",
};

const textMap: Record<string, string> = {
  orange: "text-orange-400",
  blue: "text-blue-400",
  gold: "text-amber-400",
  purple: "text-purple-400",
  cyan: "text-cyan-400",
  green: "text-emerald-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  rose: "text-rose-400",
};

const statGradientMap: Record<string, string> = {
  orange: "from-orange-400 via-orange-300 to-amber-300",
  blue: "from-blue-400 via-blue-300 to-sky-300",
  gold: "from-amber-400 via-amber-300 to-yellow-300",
  purple: "from-purple-400 via-purple-300 to-fuchsia-300",
  cyan: "from-cyan-400 via-cyan-300 to-teal-300",
  green: "from-emerald-400 via-emerald-300 to-teal-300",
  emerald: "from-emerald-400 via-emerald-300 to-teal-300",
  amber: "from-amber-400 via-amber-300 to-yellow-300",
  rose: "from-rose-400 via-rose-300 to-pink-300",
};

const statHoverMap: Record<string, string> = {
  orange: "hover:border-orange-500/50 hover:shadow-[0_16px_50px_rgba(249,115,22,0.25)]",
  blue: "hover:border-blue-500/50 hover:shadow-[0_16px_50px_rgba(59,130,246,0.25)]",
  gold: "hover:border-amber-500/50 hover:shadow-[0_16px_50px_rgba(245,158,11,0.25)]",
  purple: "hover:border-purple-500/50 hover:shadow-[0_16px_50px_rgba(168,85,247,0.25)]",
  cyan: "hover:border-cyan-500/50 hover:shadow-[0_16px_50px_rgba(34,211,238,0.25)]",
  green: "hover:border-emerald-500/50 hover:shadow-[0_16px_50px_rgba(16,185,129,0.25)]",
  emerald: "hover:border-emerald-500/50 hover:shadow-[0_16px_50px_rgba(16,185,129,0.25)]",
  amber: "hover:border-amber-500/50 hover:shadow-[0_16px_50px_rgba(245,158,11,0.25)]",
  rose: "hover:border-rose-500/50 hover:shadow-[0_16px_50px_rgba(244,63,94,0.25)]",
};

export default function PlatformPage({ id }: { id: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const platform = platforms.find((p) => p.id === id);

  const goBack = () => {
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        document.getElementById("network")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 450);
    } else {
      document.getElementById("network")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!platform) return null;

  const badge = badgeStyles[platform.badgeColor] ?? badgeStyles.orange;
  const accent = textMap[platform.badgeColor] ?? textMap.orange;

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
            onClick={goBack}
            className="group inline-flex cursor-pointer items-center gap-2 text-xs text-gray-400 transition-all hover:text-orange-400 hover:gap-2.5"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" /> Back to Ecosystem
          </button>

          <div className="mt-6 sm:mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Text column (first on mobile, left on desktop) */}
            <Reveal className="order-1 lg:order-none">
              <span className={`inline-flex items-center rounded-full px-3.5 py-1 text-xs font-bold tracking-widest uppercase backdrop-blur-md border shadow-sm ${badge}`}>
                {platform.category}
              </span>
              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-black leading-[1.1] tracking-tight">
                {platform.title}
              </h1>
              <div className="mt-5 sm:mt-6 h-1.5 w-20 sm:w-24 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]" />
              <p className="mt-5 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-gray-300/90">
                {platform.description}
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

            {/* Logo + image column (second on mobile, right on desktop) */}
            <Reveal delay={0.15} className="order-2 lg:order-none">
              <div className="relative mx-auto flex max-w-sm items-center justify-center">
                <div className="absolute h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-orange-500/20 blur-[120px] animate-pulse" />
                <div className="absolute h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] rounded-full border border-orange-500/15" />
                <div className="absolute h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] rounded-full border border-dashed border-orange-500/20 animate-[spin_40s_linear_infinite]" />

                <div className="relative group h-[300px] w-full sm:h-[360px] overflow-hidden rounded-3xl sm:rounded-[32px] border border-white/10 shadow-2xl shadow-orange-500/20">
                  <Image
                    src={platform.image}
                    alt={platform.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 rounded-xl border border-white/15 bg-black/70 px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-xl shadow-lg">
                    <p className="text-xs sm:text-sm font-bold text-white">{platform.title}</p>
                    <p className={`text-[10px] sm:text-xs font-medium ${accent}`}>Sports Science India Ecosystem</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

            {/* Stats */}
            <Reveal delay={0.2}>
              <div className="mt-6 sm:mt-8 grid gap-2 sm:gap-2.5 grid-cols-2 sm:grid-cols-4">
                {[
                  { stat: platform.stats1, label: platform.label1 },
                  { stat: platform.stats2, label: platform.label2 },
                ].map((s, i) => (
                  <div
                    key={i}
                    className={`group relative overflow-hidden rounded-lg sm:rounded-xl border-2 border-orange-500/40 bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl px-2 py-2.5 sm:px-3 sm:py-3 text-center transition-all duration-500 hover:-translate-y-0.5 hover:border-orange-500 ${statHoverMap[platform.badgeColor] ?? statHoverMap.orange}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <p className={`relative text-lg sm:text-2xl font-black tracking-tight bg-gradient-to-r ${statGradientMap[platform.badgeColor] ?? statGradientMap.orange} bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(255,255,255,0.08)]`}>
                      {s.stat}
                    </p>
                    <p className="relative mt-0.5 text-[9px] sm:text-[11px] uppercase tracking-widest text-gray-400">
                      {s.label}
                    </p>
                    <div className="mx-auto mt-1 h-px w-6 rounded-full bg-gradient-to-r from-white/30 to-transparent transition-all duration-500 group-hover:w-12" />
                  </div>
                ))}
                <div
                  className="group relative overflow-hidden rounded-lg sm:rounded-xl border-2 border-orange-500/40 bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl px-2 py-2.5 sm:px-3 sm:py-3 text-center transition-all duration-500 hover:-translate-y-0.5 hover:border-orange-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative mx-auto flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-md sm:rounded-lg border bg-white/5 text-white/90 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Sparkles size={12} className="sm:size-4" />
                  </div>
                  <p className="relative mt-1 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white">
                    {platform.category}
                  </p>
                  <p className="relative mt-0.5 text-[9px] sm:text-[11px] uppercase tracking-widest text-gray-500">
                    Category
                  </p>
                </div>
                <div
                  className="group relative overflow-hidden rounded-lg sm:rounded-xl border-2 border-orange-500/40 bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl px-2 py-2.5 sm:px-3 sm:py-3 text-center transition-all duration-500 hover:-translate-y-0.5 hover:border-orange-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative mx-auto flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-md sm:rounded-lg border bg-white/5 text-white/90 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <TrendingUp size={12} className="sm:size-4" />
                  </div>
                  <p className="relative mt-1 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white">
                    {platform.label2}
                  </p>
                  <p className="relative mt-0.5 text-[9px] sm:text-[11px] uppercase tracking-widest text-gray-500">
                    Focus
                  </p>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

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
                About This <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">Platform</span>
              </h2>
              <div className="mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto max-w-3xl">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl p-6 sm:p-8 transition-all duration-500 hover:border-orange-500/40 hover:shadow-[0_12px_40px_rgba(249,115,22,0.15)]">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
                <p className="text-base sm:text-lg leading-8 text-gray-300/90 [text-wrap:pretty]">
                  {platform.title} is part of the Sports Science India ecosystem — a unified
                  platform connecting {platform.label1.toLowerCase()}, {platform.label2.toLowerCase()} and
                  the broader sports community. {platform.description}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    `${platform.label1} · ${platform.stats1}`,
                    `${platform.label2} · ${platform.stats2}`,
                    `Category · ${platform.category}`,
                    `Part of the SSI Ecosystem`,
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
                        <Check size={12} />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============ WHAT YOU GET ============ */}
      <section className="relative overflow-hidden bg-[#050505] py-10 sm:py-12 text-white">
        <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/5 blur-[160px]" />
        <Container className="relative z-10">
          <Reveal>
            <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm shadow-lg shadow-orange-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                Why It Matters
              </p>
              <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                Purpose & <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">Impact</span>
              </h2>
              <div className="mx-auto mt-5 sm:mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]" />
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: TrendingUp, title: "Advancing Sport", text: `Drives growth in ${platform.category.toLowerCase()} to move Indian sport forward.` },
              { icon: Users, title: "Building Community", text: `Connects ${platform.label1.toLowerCase()} and ${platform.label2.toLowerCase()} into one ecosystem.` },
              { icon: Sparkles, title: "Endless Possibilities", text: "One organization. Endless possibilities across healthcare, performance, education and media." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group relative overflow-hidden h-full rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400 shadow-lg shadow-orange-500/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-orange-500/40">
                      <item.icon size={20} className="sm:size-[22px]" />
                    </div>
                    <h3 className="mt-4 text-base sm:text-lg font-bold text-white tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400 [text-wrap:pretty]">{item.text}</p>
                    <div className="mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r from-orange-500 to-transparent transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden pb-20 pt-6 sm:pb-24 text-white">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl sm:rounded-[40px] border border-orange-500/20 bg-gradient-to-br from-[#0d0d0d] to-black px-6 py-16 sm:px-8 sm:py-20 text-center shadow-2xl shadow-orange-500/10">
              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-[140px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_100%)]" />
              <span className="absolute left-4 top-5 text-6xl sm:text-8xl font-black uppercase leading-none text-white/[0.02] select-none">
                Explore
                <br />More
              </span>
              <div className="relative z-10 mx-auto max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm mb-6">
                  <Sparkles size={12} />
                  Join the Ecosystem
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  Be Part of
                  <span className="block mt-2 bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-transparent">
                    Something Bigger.
                  </span>
                </h2>
                <p className="mx-auto mt-5 sm:mt-6 max-w-xl text-sm sm:text-base leading-7 text-gray-300/90">
                  Explore how {platform.title} can help you perform, learn and
                  grow within the Sports Science India ecosystem.
                </p>
                <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:flex sm:gap-4 sm:justify-center">
                  <Link href="/booking">
                    <Button size="md" className="w-full sm:w-auto sm:min-w-[200px] whitespace-nowrap text-sm">
                      <CalendarClock size={14} /> Get Started
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