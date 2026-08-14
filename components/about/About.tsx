"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import Image from "next/image";
import {
  HeartPulse,
  Target,
  GraduationCap,
  Globe2,
  Users,
  Trophy,
  Stethoscope,
  ShieldCheck,
  Mail,
  Phone,
  Eye,
  Rocket,
  PawPrint,
  ArrowUpRight,
} from "lucide-react";

const pillars = [
  {
    icon: HeartPulse,
    title: "Healthcare",
    text: "Advanced sports medicine, physiotherapy and rehabilitation for athletes at every level.",
  },
  {
    icon: Target,
    title: "Performance",
    text: "Data-driven assessment and training programs to maximise athletic potential.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    text: "Knowledge sharing, research and learning pathways for athletes, coaches and professionals.",
  },
  {
    icon: Globe2,
    title: "Community",
    text: "Building a connected ecosystem that advances Indian sport from grassroots to elite.",
  },
];

const services = [
  "Indian Ice Hockey Team",
  "India U-16 / U-19 Football Team",
  "Odisha Football Academy",
  "Ranji Cricket Team",
  "SAI Table Tennis Academy",
  "Naval Tata Hockey Academy",
  "Tennis Clubs",
  "Weight Lifting Associations (BBSR & Puri)",
  "Wrestler Associations",
  "And many more local clubs across disciplines",
];

const teamMembers = [
  "Sports Medicine Specialists",
  "Sports Surgeons",
  "Sports Physiotherapists",
  "Sports Psychology Specialists",
  "Sports Nutrition Specialists",
];

const redPandaPoints = [
  {
    title: "Sprint & Focus",
    text: "The form depicts the Red Panda just before its sprint to climb a tree — showing how SSI is ready to sprint at all times to serve the sports sector. The fierce eyes reflect focus and a one-point perspective to reach the goal, showing the more focused and greater vision of SSI beyond the ROI of its business.",
  },
  {
    title: "Bold & Classic",
    text: "The action relates to SSI moving forward crossing all obstacles. The serif font communicates the attributes of the brand — bold, sturdy and all time classic.",
  },
  {
    title: "First Panda, First of Its Kind",
    text: "Red Panda is also known as 'Lesser Panda' and 'First Panda' by scientists — the services that SSI will be providing to the sports community internationally is first of its kind.",
  },
  {
    title: "Proudly Indian",
    text: "Red pandas have a large range from western Nepal to northern Myanmar and have a strong connection with India. Similarly, though SSI will be operating internationally, the origin of the brand will always be India.",
  },
  {
    title: "Control Over Body",
    text: "When descending a tree head-first, the Red Panda rotates its ankle to control its descent — SSI focuses on control over one's body to minimize or nullify injuries and have a fruitful sports career. Very few brands teach how to play a sport right.",
  },
  {
    title: "Turning Negative into Positive",
    text: "In contrast to the Red Panda's sedentary lifestyle, SSI promotes how to regularize and calibrate any physical activity or sport — positioning the brand as someone who changes the negative into a positive, impossible into possible.",
  },
  {
    title: "Solitary Responsibility",
    text: "In contrast to the Red Panda being a solitary animal, SSI has solely taken the responsibility to bring a change in the sports sector.",
  },
  {
    title: "Climbing Higher",
    text: "Red pandas are excellent climbers — though being a start-up, SSI looks beyond the possible avenues to climb higher.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#050505] py-14 text-white">
      {/* Ambient lighting */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[200px]" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-orange-600/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-orange-500/[0.07] blur-[160px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,black_95%)]" />

      <Container className="relative z-10">
        {/* Hero */}
        <Reveal>
          <div
            style={{ transform: "translateZ(0)" }}
            className="group relative overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-br from-[#111111] via-[#0a0a0a] to-black p-6 shadow-[0_30px_80px_-20px_rgba(249,115,22,0.3),0_16px_40px_-12px_rgba(0,0,0,0.7)] transition-all duration-700 hover:border-orange-500/40 hover:shadow-[0_40px_100px_-20px_rgba(249,115,22,0.5),0_20px_50px_-12px_rgba(0,0,0,0.7)] sm:p-10 lg:p-14"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-orange-500/20 blur-[140px] transition-all duration-700 group-hover:bg-orange-500/30" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-orange-500/15 blur-[140px] transition-all duration-700 group-hover:bg-orange-500/25" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_75%)]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

            <span className="pointer-events-none absolute left-6 top-4 text-6xl font-black uppercase leading-none text-white/[0.03] select-none sm:left-10 sm:top-6 sm:text-8xl">
              About
              <br />
              Us
            </span>

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-discover-ping rounded-full bg-orange-400/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.9)]" />
                  </span>
                  About Sports Science India
                </p>
                <h1 className="mt-5 text-2xl font-black leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  One Organization.
                  <br />
                  <span className="text-gradient drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                    Endless Possibilities.
                  </span>
                </h1>
                <div className="mt-5 h-1.5 w-24 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 shadow-[0_0_24px_rgba(249,115,22,0.6)]" />
                <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                  Sports Science India is one of the largest multidisciplinary sports medicine
                  practices in Eastern India — and the{" "}
                  <span className="font-semibold text-white">first Sports Medicine Centre of Odisha and Eastern India</span>.
                </p>
              </div>

              <div className="relative mx-auto flex h-[260px] w-[260px] items-center justify-center sm:h-[320px] sm:w-[320px]">
                <div className="absolute h-[220px] w-[220px] rounded-full bg-orange-500/20 blur-[100px] transition-all duration-700 group-hover:bg-orange-500/35 sm:h-[260px] sm:w-[260px]" />
                <div className="absolute h-[260px] w-[260px] rounded-full border border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.2),inset_0_0_40px_rgba(249,115,22,0.1)] sm:h-[320px] sm:w-[320px]" />
                <div className="absolute h-[220px] w-[220px] rounded-full border border-dashed border-orange-500/40 animate-[spin_40s_linear_infinite] sm:h-[280px] sm:w-[280px]" />
                <Image
                  src="/images/logo/ssi-red-panda.png"
                  alt="SSI Red Panda Mascot"
                  width={260}
                  height={260}
                  priority
                  className="relative z-10 h-44 w-44 object-contain drop-shadow-[0_20px_50px_rgba(249,115,22,0.5)] transition-transform duration-700 group-hover:scale-105 sm:h-56 sm:w-56"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Our Story */}
        <Reveal delay={0.05}>
          <div
            style={{ transform: "translateZ(0)" }}
            className="group relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-black/40 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-[0_24px_60px_-12px_rgba(249,115,22,0.35),0_12px_30px_-8px_rgba(0,0,0,0.6)] sm:p-8"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 h-[300px] w-[300px] rounded-full bg-orange-500/0 blur-[120px] transition-all duration-700 group-hover:bg-orange-500/20" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-orange-600/0 blur-[120px] transition-all duration-700 group-hover:bg-orange-600/15" />
            <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 [mask-image:radial-gradient(ellipse_at_top_left,white_0%,transparent_60%)]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-[0_0_24px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_32px_rgba(249,115,22,0.6)]">
                  <Trophy size={18} />
                </div>
                <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">Our Story</h3>
              </div>
              <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-300 shadow-[0_0_12px_rgba(249,115,22,0.6)]" />
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    </span>
                    <span className="text-sm leading-7 text-gray-300 sm:text-base">
                      Conceived by <span className="font-semibold text-white">Dr. Sarthak Patnaik</span> and{" "}
                      <span className="font-semibold text-white">Mr. Soumya Patnaik</span>.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    </span>
                    <span className="text-sm leading-7 text-gray-300 sm:text-base">
                      The brother duo has worked with various sports disciplines for the last 6 years,
                      earning many laurels through National and International sports event participation.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    </span>
                    <span className="text-sm leading-7 text-gray-300 sm:text-base">
                      One of the largest multidisciplinary sports medicine practices in Eastern India —
                      the first Sports Medicine Centre of Odisha.
                    </span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    </span>
                    <span className="text-sm leading-7 text-gray-300 sm:text-base">
                      Currently serving the Indian Ice Hockey team, India U-16/19 Football team,
                      Odisha Football Academy, Ranji Cricket team, SAI Table Tennis Academy,
                      Naval Tata Hockey Academy and more.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    </span>
                    <span className="text-sm leading-7 text-gray-300 sm:text-base">
                      Our Sports Medicine Expert <span className="font-semibold text-white">Dr. Sarthak Patnaik</span> has
                      treated many professional players — both National and International — representing
                      India, including Olympic Gold Medalist{" "}
                      <span className="font-semibold text-white">Mr. Neeraj Chopra</span>.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Teams Served + Our Team */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <div
              style={{ transform: "translateZ(0)" }}
              className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-black/40 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_24px_60px_-12px_rgba(249,115,22,0.35),0_12px_30px_-8px_rgba(0,0,0,0.6)] sm:p-8"
            >
              <div className="pointer-events-none absolute -top-24 -right-24 h-[300px] w-[300px] rounded-full bg-orange-500/0 blur-[120px] transition-all duration-700 group-hover:bg-orange-500/20" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-[0_0_24px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_32px_rgba(249,115,22,0.6)]">
                  <Users size={18} />
                </div>
                <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">Teams We Serve</h3>
              </div>
              <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-300 shadow-[0_0_12px_rgba(249,115,22,0.6)]" />
              <ul className="mt-5 space-y-2.5">
                {services.map((service) => (
                  <li key={service} className="flex items-start gap-3 text-sm text-gray-300 transition-colors duration-200 hover:text-white sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{ transform: "translateZ(0)" }}
              className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-black/40 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_24px_60px_-12px_rgba(249,115,22,0.35),0_12px_30px_-8px_rgba(0,0,0,0.6)] sm:p-8"
            >
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-orange-600/0 blur-[120px] transition-all duration-700 group-hover:bg-orange-600/20" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-[0_0_24px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_32px_rgba(249,115,22,0.6)]">
                  <Stethoscope size={18} />
                </div>
                <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">Our Team</h3>
              </div>
              <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-300 shadow-[0_0_12px_rgba(249,115,22,0.6)]" />
              <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                Our multidisciplinary team comprises:
              </p>
              <ul className="mt-3 space-y-2.5">
                {teamMembers.map((member) => (
                  <li key={member} className="flex items-start gap-3 text-sm text-gray-300 transition-colors duration-200 hover:text-white sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Vision & Mission */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <div
              style={{ transform: "translateZ(0)" }}
              className="group relative h-full overflow-hidden rounded-2xl border border-orange-500/40 bg-gradient-to-br from-orange-500/[0.15] via-white/[0.04] to-black/40 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/60 hover:shadow-[0_24px_60px_-12px_rgba(249,115,22,0.4),0_12px_30px_-8px_rgba(0,0,0,0.6)] sm:p-8"
            >
              <div className="pointer-events-none absolute -top-24 -right-24 h-[300px] w-[300px] rounded-full bg-orange-500/0 blur-[120px] transition-all duration-700 group-hover:bg-orange-500/30" />
              <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 [mask-image:radial-gradient(ellipse_at_top_right,white_0%,transparent_60%)]" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/40 bg-orange-500/10 text-orange-400 shadow-[0_0_28px_rgba(249,115,22,0.45),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.7)]">
                    <Eye size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[3px] text-orange-400/80">
                      What we see
                    </p>
                    <h3 className="text-2xl font-black tracking-tight text-white">Our Vision</h3>
                  </div>
                </div>
                <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-300 shadow-[0_0_12px_rgba(249,115,22,0.7)]" />
                <ul className="mt-5 space-y-3">
                  {[
                    "Build public interest in the country's top sportspersons, whose success evolves awareness and pride in India.",
                    "Establish Sports Science India as the leading sports medicine and sports science brand in Eastern India and beyond.",
                    "Promote a culture where every athlete — from grassroots to elite — has access to world-class, science-backed care.",
                    "Elevate Indian sport on the global stage by supporting athletes to perform, recover and extend their careers.",
                    "Inspire the next generation of sports scientists, coaches and medical professionals through education and mentorship.",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      </span>
                      <span className="text-sm leading-7 text-gray-200 sm:text-base">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{ transform: "translateZ(0)" }}
              className="group relative h-full overflow-hidden rounded-2xl border border-orange-500/40 bg-gradient-to-br from-orange-500/[0.15] via-white/[0.04] to-black/40 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/60 hover:shadow-[0_24px_60px_-12px_rgba(249,115,22,0.4),0_12px_30px_-8px_rgba(0,0,0,0.6)] sm:p-8"
            >
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-orange-500/0 blur-[120px] transition-all duration-700 group-hover:bg-orange-500/30" />
              <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 [mask-image:radial-gradient(ellipse_at_bottom_left,white_0%,transparent_60%)]" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/40 bg-orange-500/10 text-orange-400 shadow-[0_0_28px_rgba(249,115,22,0.45),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.7)]">
                    <Rocket size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[3px] text-orange-400/80">
                      What we do
                    </p>
                    <h3 className="text-2xl font-black tracking-tight text-white">Our Mission</h3>
                  </div>
                </div>
                <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-300 shadow-[0_0_12px_rgba(249,115,22,0.7)]" />
                <ul className="mt-5 space-y-3">
                  {[
                    "Deliver an outstanding healthcare experience to all sports personnel, based on the practice of sports science — giving importance to sports medicine and sports rehabilitation to address specific weaknesses in any given client or patient.",
                    "Provide accurate diagnosis, targeted treatment and structured rehabilitation to help athletes recover safely and return to play.",
                    "Educate students on the various aspects of sports science and link sports science to real-world practical experiences.",
                    "Empower athletes, coaches and teams with data-driven insights to prevent injury and prolong careers.",
                    "Promote the philosophy of 'Prevent Injury & Prolong Career' and encourage our clients to 'Just Get Up'.",
                    "Build an ecosystem of care, performance, education and community that advances Indian sport at every level.",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      </span>
                      <span className="text-sm leading-7 text-gray-200 sm:text-base">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Motto */}
        <Reveal delay={0.1}>
          <div
            style={{ transform: "translateZ(0)" }}
            className="group relative mt-6 overflow-hidden rounded-2xl border border-orange-500/40 bg-gradient-to-br from-[#0d0d0d] via-black to-[#0d0d0d] p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_-12px_rgba(249,115,22,0.45),0_16px_40px_-8px_rgba(0,0,0,0.6)] sm:p-12"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/0 blur-[120px] transition-all duration-700 group-hover:bg-orange-500/25" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
            <span className="pointer-events-none absolute left-6 top-4 text-6xl font-black uppercase leading-none text-white/[0.03] select-none sm:left-10 sm:top-6 sm:text-8xl">
              Motto
            </span>
            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-orange-500/50 bg-orange-500/10 text-orange-400 shadow-[0_0_40px_rgba(249,115,22,0.55),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(249,115,22,0.8)]">
                <ShieldCheck size={26} />
              </div>
              <h3 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-4xl">
                Our Motto —{" "}
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(249,115,22,0.45)]">
                  Prevent Injury, Prolong Career
                </span>
              </h3>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-300 shadow-[0_0_16px_rgba(249,115,22,0.8)]" />
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
                We have the tools, you have the body. Ready to play?
              </p>
            </div>
          </div>
        </Reveal>

        {/* Red Panda Brand */}
        <Reveal delay={0.05}>
          <div
            style={{ transform: "translateZ(0)" }}
            className="group relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-black/40 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-[0_24px_60px_-12px_rgba(249,115,22,0.35),0_12px_30px_-8px_rgba(0,0,0,0.6)] sm:p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full bg-orange-500/0 blur-[120px] transition-all duration-700 group-hover:bg-orange-500/20" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-orange-500/0 blur-[120px] transition-all duration-700 group-hover:bg-orange-600/20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[300px_1fr]">
              <div className="relative mx-auto flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
                <div className="absolute h-56 w-56 rounded-full bg-orange-500/15 blur-[100px] sm:h-64 sm:w-64" />
                <div className="absolute h-56 w-56 rounded-full border border-orange-500/20 sm:h-64 sm:w-64" />
                <div className="absolute h-48 w-48 rounded-full border border-dashed border-orange-500/25 animate-[spin_50s_linear_infinite] sm:h-56 sm:w-56" />
                <Image
                  src="/images/logo/ssi-red-panda.png"
                  alt="Sports Science India — Red Panda Mascot"
                  width={260}
                  height={260}
                  className="relative z-10 h-48 w-48 object-contain drop-shadow-[0_20px_40px_rgba(249,115,22,0.45)] sm:h-56 sm:w-56"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-[0_8px_32px_rgba(249,115,22,0.25)]">
                    <PawPrint size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[3px] text-orange-400/80 sm:text-xs">
                      Brand Story
                    </p>
                    <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                      How the Red Panda Represents SSI
                    </h3>
                  </div>
                </div>
                <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />
                <p className="mt-5 text-sm leading-7 text-gray-300 sm:text-base">
                  We have worked only on the Red Panda concept as we strongly feel it would be more
                  out-of-the-box than having anything stereotypically related to sports.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {redPandaPoints.map((point) => (
                    <div
                      key={point.title}
                      style={{ transform: "translateZ(0)" }}
                      className="group/point relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/[0.06] hover:shadow-[0_16px_40px_-8px_rgba(249,115,22,0.35)]"
                    >
                      <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rounded-full bg-orange-500/0 blur-[40px] transition-all duration-500 group-hover/point:bg-orange-500/25" />
                      <div className="relative flex items-center justify-between">
                        <h4 className="text-base font-bold text-white sm:text-lg">{point.title}</h4>
                        <ArrowUpRight size={14} className="text-orange-400 opacity-0 transition-opacity group-hover/point:opacity-100" />
                      </div>
                      <p className="relative mt-2 text-sm leading-6 text-gray-400 sm:text-base">{point.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Pillars */}
        <div className="mt-12">
          <Reveal>
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <p className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-discover-ping rounded-full bg-orange-400/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.9)]" />
                </span>
                What We Stand For
              </p>
              <h3 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-3xl">
                Four Pillars.{" "}
                <span className="text-gradient">One Mission.</span>
              </h3>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={i * 0.08}>
                  <div
                    style={{ transform: "translateZ(0)" }}
                    className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-black/40 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/50 hover:shadow-[0_24px_60px_-12px_rgba(249,115,22,0.4),0_12px_30px_-8px_rgba(0,0,0,0.6)]"
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />
                    <div className="pointer-events-none absolute -bottom-16 -right-16 h-[180px] w-[180px] rounded-full bg-orange-500/0 blur-[80px] transition-all duration-500 group-hover:bg-orange-500/25" />
                    <div className="pointer-events-none absolute -top-16 -left-16 h-[180px] w-[180px] rounded-full bg-orange-600/0 blur-[80px] transition-all duration-500 group-hover:bg-orange-600/15" />
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-[0_0_24px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_36px_rgba(249,115,22,0.7)]">
                        <Icon size={22} />
                      </div>
                      <h4 className="mt-4 text-lg font-bold tracking-tight text-white">{pillar.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-gray-400 [text-wrap:pretty]">{pillar.text}</p>
                      <div className="mt-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-orange-500 to-transparent shadow-[0_0_10px_rgba(249,115,22,0.6)] transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Contact / Feedback */}
        <Reveal delay={0.05}>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <a
              href="mailto:sportscienceindia@gmail.com"
              style={{ transform: "translateZ(0)" }}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_-10px_rgba(249,115,22,0.35)]"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full bg-orange-500/0 blur-[40px] transition-all duration-500 group-hover:bg-orange-500/25" />
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_32px_rgba(249,115,22,0.7)]">
                <Mail size={20} />
              </div>
              <div className="relative min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[3px] text-gray-500">Email</p>
                <p className="mt-1 truncate text-sm font-bold text-white">sportscienceindia@gmail.com</p>
              </div>
            </a>
            <a
              href="tel:+917381380010"
              style={{ transform: "translateZ(0)" }}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_-10px_rgba(249,115,22,0.35)]"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full bg-orange-500/0 blur-[40px] transition-all duration-500 group-hover:bg-orange-500/25" />
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_32px_rgba(249,115,22,0.7)]">
                <Phone size={20} />
              </div>
              <div className="relative min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[3px] text-gray-500">Call Us</p>
                <p className="mt-1 truncate text-sm font-bold text-white">+91 73813 80010</p>
                <p className="truncate text-sm font-bold text-white">+91 82803 81010</p>
              </div>
            </a>
            <div
              style={{ transform: "translateZ(0)" }}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-orange-500/50 bg-gradient-to-br from-orange-500/20 to-orange-500/[0.05] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-10px_rgba(249,115,22,0.5)]"
            >
              <div className="pointer-events-none absolute -left-12 -bottom-12 h-24 w-24 rounded-full bg-orange-400/0 blur-[40px] transition-all duration-500 group-hover:bg-orange-400/30" />
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-black shadow-[0_0_40px_rgba(249,115,22,0.65),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_55px_rgba(249,115,22,0.9)]">
                <Target size={20} />
              </div>
              <div className="relative min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[3px] text-orange-400">Feedback</p>
                <p className="mt-1 text-sm font-bold text-white">Your Feedback Matters</p>
                <p className="text-xs text-gray-300">We would love to hear from you.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}