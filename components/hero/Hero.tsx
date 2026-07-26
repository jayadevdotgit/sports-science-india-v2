import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Image from "next/image";
import HeroInfo from "./HeroInfo";
import Reveal from "@/components/animations/Reveal";

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        bg-black
        text-white
        flex
        items-start
        pt-28
        pb-8
        sm:min-h-screen
        sm:h-auto
        sm:items-center
        sm:pt-24
        sm:pb-12
      "
    >
      {/* Orange Glow */}

      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[180px]" />

      {/* Orange Gradient */}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#120700] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,black_95%)]" />

      <Container>
        <Reveal>

        <div className="relative z-10 grid items-center gap-4 sm:gap-8 lg:grid-cols-2 lg:gap-12">

          {/* LEFT */}

          <div>

            <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm mt-6 sm:mt-8">
              SPORTS SCIENCE INDIA
            </p>

            <h1 className="mt-4 font-black leading-[0.86] sm:mt-6">

              <span className="block text-4xl sm:text-6xl xl:text-7xl">
                Maximize
              </span>

              <span className="block text-4xl text-orange-500 sm:text-6xl xl:text-7xl">
                Performance.
              </span>

              <span className="block text-4xl sm:text-6xl xl:text-7xl">
                Prevent Injury.
              </span>

              <span className="block text-2xl text-gray-400 sm:text-4xl xl:text-5xl">
                Extend Careers.
              </span>

            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-gray-400 sm:mt-8 sm:text-xl sm:leading-8">

              India&apos;s first integrated sports science ecosystem combining
              elite athlete performance, sports medicine, rehabilitation,
              education and community development.

            </p>

            <div className="mt-7 flex flex-wrap gap-3 sm:mt-12 sm:gap-4">
              <a href="#booking" className="inline-flex">
                <Button>Book Assessment</Button>
              </a>

              <a href="#ecosystem" className="inline-flex">
                <Button variant="outline">Explore Ecosystem</Button>
              </a>
            </div>

          </div>

          <div
            className="
              absolute
              inset-0
              opacity-5
              [mask-image:radial-gradient(circle,white_30%,transparent_100%)]
              bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]
              bg-[size:60px_60px]
            "
          />


          {/* RIGHT */}

          <div className="relative flex h-[320px] items-center justify-center sm:h-[560px] lg:h-[600px]">

            {/* BIG GLOW */}
            <div className="absolute h-[320px] w-[320px] rounded-full bg-orange-500/15 blur-[100px] sm:h-[680px] sm:w-[680px] sm:blur-[180px]" />

            {/* INNER GLOW */}
            <div className="absolute h-[220px] w-[220px] rounded-full bg-orange-400/25 blur-[80px] sm:h-[480px] sm:w-[480px] sm:blur-[120px]" />

            {/* Decorative Static Ring */}
            <div className="absolute h-[260px] w-[260px] rounded-full border border-orange-500/15 sm:h-[540px] sm:w-[540px]" />

            {/* Rotating Cyber Tech Ring */}
            <div className="absolute h-[280px] w-[280px] rounded-full border border-dashed border-orange-500/25 animate-[spin_30s_linear_infinite] sm:h-[580px] sm:w-[580px] pointer-events-none" />

            {/* Concentric Precision Radar Circles */}
            <div className="absolute h-[180px] w-[180px] rounded-full border border-white/5 sm:h-[380px] sm:w-[380px] pointer-events-none" />

            {/* Athlete cutout PNG with glow */}
            <Image
              src="/images/hero/athlete.png"
              alt="Elite Athlete"
              width={1536}
              height={1024}
              priority
              className="
                relative
                z-20
                w-[310px]
                sm:w-[620px]
                max-w-full
                object-contain
                filter
                drop-shadow-[0_20px_60px_rgba(249,115,22,0.55)]
                drop-shadow-[0_0_90px_rgba(249,115,22,0.35)]
                transition-all
                duration-700
                hover:scale-[1.03]
              "
            />

            {/* Floating Cards */}

            <div className="absolute left-0 top-16 z-30 hidden lg:block">
              <HeroInfo />
            </div>

            <div
              className="
                absolute
                right-0
                top-4
                rounded-2xl
                border
                border-white/10
                bg-black/50
                backdrop-blur-xl
                px-4
                py-3
                sm:right-0
                sm:top-12
                sm:px-6
                sm:py-4
                z-30
              "
            >
              <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
                VO₂ MAX
              </p>

              <p className="mt-1 text-2xl font-bold text-white sm:mt-2 sm:text-3xl">
                +18%
              </p>
            </div>

            <div
              className="
                absolute
                bottom-4
                left-0
                rounded-2xl
                border
                border-white/10
                bg-black/50
                backdrop-blur-xl
                px-4
                py-3
                z-30
                sm:bottom-10
                sm:left-auto
                sm:right-0
                sm:px-6
                sm:py-4
              "
            >
              <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
                RECOVERY
              </p>

              <p className="mt-1 text-2xl font-bold text-white sm:mt-2 sm:text-3xl">
                96%
              </p>
            </div>

          </div>
        </div>
        </Reveal>
      </Container>

      <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 sm:block">

        <div
          className="
            h-12
            w-7
            rounded-full
            border
            border-white/30
            flex
            justify-center
            pt-2
          "
        >
          <div
            className="
              h-2
              w-2
              rounded-full
              bg-orange-500
              animate-bounce
            "
          />
        </div>

      </div>

      {/* Floating Particles */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-32 right-56 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />

        <div className="absolute top-60 right-80 w-1 h-1 bg-orange-500 rounded-full animate-ping" />

        <div className="absolute bottom-44 right-64 w-2 h-2 bg-orange-300 rounded-full animate-pulse" />

        <div className="absolute top-1/2 right-36 w-1 h-1 bg-orange-400 rounded-full animate-ping" />

      </div>

    </section>
  );
}
