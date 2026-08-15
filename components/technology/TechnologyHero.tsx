import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import { CalendarClock, Microscope, Gauge, LineChart, Sparkles } from "lucide-react";

const heroStats = [
  { icon: Gauge, value: "7", label: "Core Systems" },
  { icon: LineChart, value: "±0.5%", label: "Lab-Grade Accuracy" },
  { icon: Microscope, value: "1,000 Hz", label: "Sample Rate" },
];

export default function TechnologyHero() {
  return (
    <section
      id="technology-hero"
      className="relative overflow-hidden bg-[#050505] pb-14 pt-32 text-white sm:pb-20 sm:pt-36"
    >
      {/* Background Glows */}
      <div className="absolute -top-24 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[180px]" />
      <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-orange-600/5 blur-[140px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,black_95%)]" />

      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(circle_at_center,white_20%,transparent_80%)] bg-[linear-gradient(rgba(249,115,22,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.08)_1px,transparent_1px)] bg-[size:55px_55px] pointer-events-none" />

      {/* Rotating Ring */}
      <div className="pointer-events-none absolute left-1/2 top-24 h-[320px] w-[320px] -translate-x-1/2 rounded-full border border-dashed border-orange-500/15 animate-[spin_40s_linear_infinite]" />

      <Container className="relative z-10">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/40 bg-orange-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-discover-ping rounded-full bg-orange-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.9)]" />
              </span>
              Technology & Equipment
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Powered by Science.
              <span className="mt-1 block text-orange-500">
                Driven by Precision.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
              Seven integrated assessment systems — from 1,000 Hz force
              analysis to 3D biomechanics — give every athlete measurable,
              repeatable data. No guesswork. Only evidence.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/booking">
                <Button size="md" className="w-full whitespace-nowrap sm:w-auto sm:min-w-[200px]">
                  <CalendarClock size={16} /> Book an Assessment
                </Button>
              </Link>
              <a href="#technology">
                <Button variant="outline" size="md" className="w-full whitespace-nowrap sm:w-auto sm:min-w-[200px]">
                  <Sparkles size={16} /> Explore the Lab
                </Button>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Stats Strip */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4">
            {heroStats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-[0_12px_40px_rgba(249,115,22,0.2)] sm:p-6"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400 shadow-lg shadow-orange-500/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-black tracking-tight text-white">
                      {value}
                    </p>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                      {label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
