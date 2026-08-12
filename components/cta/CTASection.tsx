import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import Image from "next/image";
import Link from "next/link";
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
      <Container className="px-4 sm:px-8">

        <div className="relative overflow-hidden rounded-[28px] border border-orange-500/20 bg-[#0d0d0d] px-4 py-8 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)] min-[380px]:px-5 min-[380px]:py-10 sm:rounded-[40px] sm:px-8 sm:py-14">

          {/* Background Text */}
          <h2
            className="
              pointer-events-none
              absolute
              left-5
              top-7
              text-6xl
              font-black
              uppercase
              leading-none
              text-white/[0.03]
              sm:left-10
              sm:top-10
              sm:text-8xl
            "
          >
            Peak
            <br />
            Performance
          </h2>

          {/* Main Content */}
<div className="relative z-10 grid items-center gap-10 sm:gap-16 lg:grid-cols-2">

  {/* Left Side */}
  <div className="min-w-0">

    {/* Badge */}
    <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
      <Target size={14} />
      Get Started
    </div>

    {/* Heading */}
    <h2 className="mt-6 break-words text-[clamp(1.35rem,6vw,1.5rem)] font-bold leading-tight text-white sm:text-3xl md:text-4xl">

      Ready to Unlock Your{" "}
      <span className="text-orange-500">
        Peak Performance?
      </span>

    </h2>

    {/* Divider */}
    <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500 lg:mx-0" />

    {/* Description */}
    <p className="mt-4 max-w-xl break-words text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">

      Whether you&apos;re a professional athlete,
      coach, or fitness enthusiast,
      our sports science assessments
      provide data-driven insights
      to help you train smarter,
      prevent injuries,
      and achieve peak performance.

    </p>

    {/* Buttons */}
    <div className="mt-6 flex flex-nowrap gap-2 sm:gap-4">

      <Link
        href="/booking"
        className="flex min-w-0 flex-1 sm:flex-none"
      >
        <Button
          variant="primary"
          size="md"
          className="inline-flex min-w-0 flex-1 items-center justify-center !gap-1 whitespace-nowrap !px-1 !text-[10px] min-[380px]:!gap-1.5 min-[380px]:!px-2 min-[380px]:!text-xs sm:flex-none sm:!gap-2 sm:!px-6 sm:!text-base"
        >
          <Calendar className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" />
          Book Assessment
        </Button>
      </Link>

      <Link
        href="/experts"
        className="inline-flex min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full border border-white font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black !gap-1 !px-1 !text-[10px] min-[380px]:!gap-1.5 min-[380px]:!px-2 min-[380px]:!text-xs sm:flex-none sm:!gap-2 sm:!px-6 sm:!text-base"
      >
        <UserRound className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" />
        Contact Experts
      </Link>

    </div>

  </div>

  {/* Right Side */}

  <div className="relative flex min-w-0 justify-center">

    <div className="group relative flex items-center justify-center">
    <div className="absolute h-[320px] w-[320px] rounded-full bg-orange-500/20 blur-[100px] transition-all duration-700 group-hover:scale-110 group-hover:bg-orange-500/30 sm:h-[520px] sm:w-[520px] sm:blur-[120px]" />
    <div className="absolute h-[260px] w-[260px] rounded-full border border-orange-500/20 sm:h-[400px] sm:w-[400px]" />

    <Image
      src="/images/cta/athlete-runner.png"
      alt="Elite Athlete"
      width={620}
      height={620}
      priority
      className="relative z-10 w-full max-w-[320px] object-contain transition-all duration-700 group-hover:scale-105 sm:max-w-[620px]"
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
