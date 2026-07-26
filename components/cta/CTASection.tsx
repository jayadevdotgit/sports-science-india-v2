import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import Image from "next/image";
import {
  Calendar,
  UserRound,
  ClipboardCheck,
  BarChart3,
  ShieldCheck,
  Target,
} from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-14 text-white">

      {/* Orange Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[220px]" />
      </div>

      <Reveal>
      <Container>

        <div className="relative overflow-hidden rounded-[40px] border border-orange-500/20 bg-[#0d0d0d] px-8 py-14 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)]">

          {/* Background Text */}
          <h2
            className="
              pointer-events-none
              absolute
              left-10
              top-10
              text-8xl
              font-black
              uppercase
              leading-none
              text-white/[0.03]
            "
          >
            Peak
            <br />
            Performance
          </h2>

          {/* Main Content */}
<div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">

  {/* Left Side */}
  <div>

    {/* Badge */}
    <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
      <Target size={14} />
      Get Started
    </div>

    {/* Heading */}
    <h2 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-white">

      Ready to Unlock Your{" "}
      <span className="text-orange-500">
        Peak Performance?
      </span>

    </h2>

    {/* Divider */}
    <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500 lg:mx-0" />

    {/* Description */}
    <p className="mt-4 max-w-xl text-base leading-7 text-gray-400">

      Whether you're a professional athlete,
      coach, or fitness enthusiast,
      our sports science assessments
      provide data-driven insights
      to help you train smarter,
      prevent injuries,
      and achieve peak performance.

    </p>

    {/* Buttons */}
    <div className="mt-6 flex flex-row gap-4">

      <Button
        variant="primary"
        size="lg"
        className="inline-flex items-center gap-3"
      >
        <Calendar size={20} />
        Book Assessment
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="inline-flex items-center gap-3"
      >
        <UserRound size={20} />
        Contact Experts
      </Button>

    </div>

  </div>

  {/* Right Side */}

  <div className="relative flex justify-center">

    <div className="group relative flex items-center justify-center">
    <div className="absolute h-[520px] w-[520px] rounded-full bg-orange-500/20 blur-[120px] transition-all duration-700 group-hover:scale-110 group-hover:bg-orange-500/30" />
    <div className="absolute h-[300px] w-[300px] rounded-full border border-orange-500/20 sm:h-[400px] sm:w-[400px]" />

    <Image
      src="/images/cta/athlete-runner.png"
      alt="Elite Athlete"
      width={620}
      height={620}
      priority
      className="relative z-10 object-contain transition-all duration-700 group-hover:scale-105"
    />
    </div>

  </div>

</div>

{/* Bottom Features */}
<div className="relative z-10 mt-14 grid gap-6 border-t border-orange-500/10 pt-8 md:grid-cols-2 xl:grid-cols-4">

<div className="group flex items-start gap-4 transition-all duration-300 hover:-translate-y-1">
      <div className="rounded-full border border-orange-500/20 bg-orange-500/10 p-4 transition-all duration-500 group-hover:scale-110 group-hover:border-orange-500/40 group-hover:bg-orange-500/20">
        <ClipboardCheck className="text-orange-500" size={28} />
      </div>

      <div>
        <h3 className="font-bold text-lg">
          Science-Backed Assessments
      </h3>

      <p className="mt-2 text-sm leading-7 text-gray-400">
        Accurate. Reliable. Proven.
      </p>
    </div>
  </div>

<div className="group flex items-start gap-4 transition-all duration-300 hover:-translate-y-1">
      <div className="rounded-full border border-orange-500/20 bg-orange-500/10 p-4 transition-all duration-500 group-hover:scale-110 group-hover:border-orange-500/40 group-hover:bg-orange-500/20">
        <BarChart3 className="text-orange-500" size={28} />
      </div>

      <div>
        <h3 className="font-bold text-lg">
          Personalized Insights
      </h3>

      <p className="mt-2 text-sm leading-7 text-gray-400">
        Tailored to your goals.
      </p>
    </div>
  </div>

<div className="group flex items-start gap-4 transition-all duration-300 hover:-translate-y-1">
      <div className="rounded-full border border-orange-500/20 bg-orange-500/10 p-4 transition-all duration-500 group-hover:scale-110 group-hover:border-orange-500/40 group-hover:bg-orange-500/20">
        <ShieldCheck className="text-orange-500" size={28} />
      </div>

      <div>
        <h3 className="font-bold text-lg">
          Injury Prevention
      </h3>

      <p className="mt-2 text-sm leading-7 text-gray-400">
        Train smarter. Stay stronger.
      </p>
    </div>
  </div>

<div className="group flex items-start gap-4 transition-all duration-300 hover:-translate-y-1">
      <div className="rounded-full border border-orange-500/20 bg-orange-500/10 p-4 transition-all duration-500 group-hover:scale-110 group-hover:border-orange-500/40 group-hover:bg-orange-500/20">
        <Target className="text-orange-500" size={28} />
      </div>

      <div>
        <h3 className="font-bold text-lg">
          Peak Performance
      </h3>

      <p className="mt-2 text-sm leading-7 text-gray-400">
        Perform. Improve. Excel.
      </p>
    </div>
  </div>

</div>

</div>

</Container>
</Reveal>
</section>
);
}