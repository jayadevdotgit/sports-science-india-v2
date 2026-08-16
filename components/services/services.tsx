import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Stethoscope,
  Syringe,
  Bone,
  ShieldPlus,
  Microscope,
  HeartPulse,
  Activity,
  ClipboardCheck,
  Dumbbell,
  Trophy,
  ArrowUpRight,
} from "lucide-react";

const colorMap: Record<
  string,
  {
    text: string;
    border: string;
    hoverBorder: string;
    glow: string;
    iconBg: string;
    divider: string;
    check: string;
    learn: string;
    arrow: string;
  }
> = {
  orange: {
    text: "text-orange-500",
    border: "border-orange-500/20",
    hoverBorder: "hover:border-orange-500/60",
    glow: "hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]",
    iconBg: "border-orange-500/20 bg-orange-500/10",
    divider: "bg-orange-500/80",
    check: "text-orange-500",
    learn: "hover:text-orange-300",
    arrow: "text-orange-500",
  },
  blue: {
    text: "text-blue-500",
    border: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/60",
    glow: "hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)]",
    iconBg: "border-blue-500/20 bg-blue-500/10",
    divider: "bg-blue-500/80",
    check: "text-blue-500",
    learn: "hover:text-blue-300",
    arrow: "text-blue-500",
  },
  gold: {
    text: "text-amber-500",
    border: "border-amber-500/20",
    hoverBorder: "hover:border-amber-500/60",
    glow: "hover:shadow-[0_20px_60px_rgba(245,158,11,0.25)]",
    iconBg: "border-amber-500/20 bg-amber-500/10",
    divider: "bg-amber-500/80",
    check: "text-amber-500",
    learn: "hover:text-amber-300",
    arrow: "text-amber-500",
  },
  purple: {
    text: "text-purple-500",
    border: "border-purple-500/20",
    hoverBorder: "hover:border-purple-500/60",
    glow: "hover:shadow-[0_20px_60px_rgba(168,85,247,0.25)]",
    iconBg: "border-purple-500/20 bg-purple-500/10",
    divider: "bg-purple-500/80",
    check: "text-purple-500",
    learn: "hover:text-purple-300",
    arrow: "text-purple-500",
  },
  cyan: {
    text: "text-cyan-500",
    border: "border-cyan-500/20",
    hoverBorder: "hover:border-cyan-500/60",
    glow: "hover:shadow-[0_20px_60px_rgba(6,182,212,0.25)]",
    iconBg: "border-cyan-500/20 bg-cyan-500/10",
    divider: "bg-cyan-500/80",
    check: "text-cyan-500",
    learn: "hover:text-cyan-300",
    arrow: "text-cyan-500",
  },
  green: {
    text: "text-emerald-500",
    border: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/60",
    glow: "hover:shadow-[0_20px_60px_rgba(16,185,129,0.25)]",
    iconBg: "border-emerald-500/20 bg-emerald-500/10",
    divider: "bg-emerald-500/80",
    check: "text-emerald-500",
    learn: "hover:text-emerald-300",
    arrow: "text-emerald-500",
  },
  emerald: {
    text: "text-emerald-500",
    border: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/60",
    glow: "hover:shadow-[0_20px_60px_rgba(16,185,129,0.25)]",
    iconBg: "border-emerald-500/20 bg-emerald-500/10",
    divider: "bg-emerald-500/80",
    check: "text-emerald-500",
    learn: "hover:text-emerald-300",
    arrow: "text-emerald-500",
  },
  amber: {
    text: "text-amber-500",
    border: "border-amber-500/20",
    hoverBorder: "hover:border-amber-500/60",
    glow: "hover:shadow-[0_20px_60px_rgba(245,158,11,0.25)]",
    iconBg: "border-amber-500/20 bg-amber-500/10",
    divider: "bg-amber-500/80",
    check: "text-amber-500",
    learn: "hover:text-amber-300",
    arrow: "text-amber-500",
  },
  rose: {
    text: "text-rose-500",
    border: "border-rose-500/20",
    hoverBorder: "hover:border-rose-500/60",
    glow: "hover:shadow-[0_20px_60px_rgba(244,63,94,0.25)]",
    iconBg: "border-rose-500/20 bg-rose-500/10",
    divider: "bg-rose-500/80",
    check: "text-rose-500",
    learn: "hover:text-rose-300",
    arrow: "text-rose-500",
  },
};

const defaultColor = colorMap.orange;

const services = [
  {
    icon: Stethoscope,
    badgeColor: "orange",
    title: "Sports Medicine",
    link: "/services/sports-medicine",
    description: "Expert medical care for injury prevention, diagnosis and treatment.",
    image: "/images/services/sports-medicine.png",
    features: [
      "Injury Prevention",
      "Medical Consultation",
      "Pain Management",
      "On-field Support"
    ]
  },
  {
    icon: Syringe,
    badgeColor: "blue",
    title: "Sports Surgery",
    link: "/services/sports-surgery",
    description: "Minimally invasive surgery for sports injuries and rapid recovery.",
    image: "/images/services/sports-surgery.png",
    features: [
      "Arthroscopy",
      "Minimally Invasive",
      "Rapid Recovery",
      "Surgical Expertise"
    ]
  },
  {
    icon: Bone,
    badgeColor: "gold",
    title: "Ligament Surgery",
    link: "/services/ligament-surgery",
    description: "ACL and ligament reconstruction to restore joint stability.",
    image: "/images/services/ligament-surgery.png",
    features: [
      "ACL Reconstruction",
      "Ligament Repair",
      "Joint Stability",
      "Return to Play"
    ]
  },
  {
    icon: ShieldPlus,
    badgeColor: "purple",
    title: "Joint Preservation",
    link: "/services/joint-preservation",
    description: "Treatments to delay or avoid joint replacement.",
    image: "/images/services/joint-preservation.png",
    features: [
      "Cartilage Repair",
      "Joint Injection",
      "Osteotomy",
      "Long-term Mobility"
    ]
  },
  {
    icon: Microscope,
    badgeColor: "cyan",
    title: "Sports Science",
    link: "/services/sports-science",
    description: "Data-driven performance analysis and athletic profiling.",
    image: "/images/services/sports-science.png",
    features: [
      "Performance Testing",
      "Athlete Profiling",
      "Data Analytics",
      "Load Monitoring"
    ]
  },
  {
    icon: Activity,
    badgeColor: "green",
    title: "Musculoskeletal Rehab",
    link: "/services/musculoskeletal-rehab",
    description: "Targeted rehab for muscles, joints, and soft tissue.",
    image: "/images/services/musculoskeletal-rehab.png",
    features: [
      "Muscle & Joint Rehab",
      "Soft Tissue Therapy",
      "Posture Correction",
      "Pain Management"
    ]
  },
  {
    icon: HeartPulse,
    badgeColor: "emerald",
    title: "Sports Rehabilitation",
    link: "/services/sports-rehabilitation",
    description: "Structured rehab programs for a safe return to sport.",
    image: "/images/services/sports-rehabilitation.png",
    features: [
      "Structured Rehab",
      "Progressive Loading",
      "Pain-free Recovery",
      "Sport-specific Rehab"
    ]
  },
  {
    icon: Activity,
    badgeColor: "amber",
    title: "Physiotherapy",
    link: "/services/physiotherapy",
    description: "Manual therapy and exercise-based recovery.",
    image: "/images/services/physiotherapy.png",
    features: [
      "Manual Therapy",
      "Exercise Therapy",
      "Pain Relief",
      "Mobility Restore"
    ]
  },
  {
    icon: ClipboardCheck,
    badgeColor: "rose",
    title: "Assessments",
    link: "/services/assessments",
    description: "Comprehensive physical and performance assessments.",
    image: "/images/services/assessments.png",
    features: [
      "Movement Screening",
      "Strength Testing",
      "VO2 Max",
      "Body Composition"
    ]
  },
  {
    icon: Dumbbell,
    badgeColor: "orange",
    title: "Strength & Conditioning",
    link: "/services/strength-conditioning",
    description: "Science-based training programs to build strength, power, speed and endurance.",
    image: "/images/services/strength-conditioning.png",
    features: [
      "Performance Training",
      "Speed & Agility",
      "Power Development",
      "Endurance Building"
    ]
  },
  {
    icon: Trophy,
    badgeColor: "blue",
    title: "Return to Sports",
    link: "/services/return-to-sports",
    description: "Guided return-to-play planning after injury.",
    image: "/images/services/return-to-sport.png",
    features: [
      "Return-to-play Plan",
      "Milestone Testing",
      "Injury Recurrence Prevention",
      "Confidence Rebuild"
    ]
  },
  {
    icon: HeartPulse,
    badgeColor: "gold",
    title: "Pre & Post Natal Rehab",
    link: "/services/pre-post-natal-rehab",
    description: "Safe exercise and recovery during and after pregnancy.",
    image: "/images/services/pre-post-natal-rehab.png",
    features: [
      "Antenatal Care",
      "Postnatal Recovery",
      "Core & Pelvic Health",
      "Safe Exercise Plans"
    ]
  },
  {
    icon: Stethoscope,
    badgeColor: "purple",
    title: "Obstetrics & Gynaecology Consultation",
    link: "/services/obstetrics-gynaecology-consultation",
    description: "Specialist consultation with Dr. Nisha Kaushik Patnaik.",
    image: "/images/services/obstetrics-gynaecology-consultation.png",
    features: [
      "Gynaecology Care",
      "Pregnancy Consultation",
      "Women's Health",
      "Expert Guidance"
    ]
  },
];

export const servicesList = services;

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#050505] py-14 text-white scroll-mt-32">

      {/* Orange Glow */}
      <div className="absolute left-1/2 top-20 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[180px] pointer-events-none" />

      <Reveal>
      <Container>
        <SectionHeading
          eyebrow="Services"
          title={<>Elite <span className="text-orange-500">Performance</span> Solutions</>}
          description="Integrated sports science services designed to enhance performance, prevent injuries and extend athletic careers."
        />

        <div className="mt-6 sm:mt-10 lg:mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services
            .filter((s) => s.title !== "Obstetrics & Gynaecology Consultation")
            .map((service, index) => {
            const Icon = service.icon;
            const c = colorMap[service.badgeColor] ?? defaultColor;
            return (
              <div
                key={index}
                className={`group flex min-h-[220px] lg:min-h-[270px] flex-col relative rounded-3xl border-2 bg-black/60 backdrop-blur-md p-5 overflow-hidden transition-all duration-300 hover:-translate-y-2 active:scale-[0.97] cursor-pointer ${c.border} ${c.hoverBorder} ${c.glow}`}
                style={{ opacity: 0, animation: `fadeInUp 0.6s ease-out ${index * 0.08}s forwards` }}
              >
                {/* Full-bleed background image - solves the middle crack by taking full width/height */}
                <div className="absolute inset-0 pointer-events-none select-none z-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                      object-right
                       opacity-55
                       transition-all
                       duration-700
                       ease-out
                       group-hover:scale-110
                       group-hover:opacity-70
                    "
                  />
                  {/* Gradients to smoothly fade image into dark background from left to right */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/95 via-[#0d0d0d]/60 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent z-10" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col flex-1">

                  {/* Icon + Title Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${c.iconBg}`}>
                        <Icon size={22} className={c.text} />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <ArrowUpRight size={16} className={`${c.arrow}/40 shrink-0 ml-2`} />
                  </div>

                  {/* Divider */}
                  <div className="mt-3 mb-3 h-[1.5px] w-8 rounded-full bg-orange-500/80 transition-all duration-500 group-hover:w-14" />

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-[11px] sm:text-xs text-gray-400">
                        <span className="mr-1 text-orange-500 select-none">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More */}
                  <div className="pt-3 border-t border-white/5 mt-auto">
                    <Link
                      href={service.link}
                      className={`inline-flex items-center text-xs sm:text-sm font-semibold text-white cursor-pointer transition-colors duration-300 ${c.learn}`}
                    >
                      <span className="text-white">Learn</span><span className="text-white">&nbsp;</span><span className={c.arrow}>More</span>
                      <span className={`ml-1 transition-transform duration-300 group-hover:translate-x-1 ${c.arrow}`}>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Obstetrics & Gynaecology Consultation featured card (centered in the last row) */}
          {(() => {
            const feature = services.find((s) => s.title === "Obstetrics & Gynaecology Consultation");
            if (!feature) return null;
            const Icon = feature.icon;
            const c = colorMap[feature.badgeColor] ?? defaultColor;
            return (
              <>
                <div aria-hidden="true" className="hidden xl:block" />
                <div className={`group flex min-h-[220px] lg:min-h-[270px] md:col-span-2 md:mx-auto md:w-[calc((100%_-_2rem)/2)] xl:col-span-1 xl:mx-0 xl:w-auto flex-col relative rounded-3xl border-2 bg-black/60 backdrop-blur-md p-5 overflow-hidden transition-all duration-300 hover:-translate-y-2 active:scale-[0.97] cursor-pointer ${c.border} ${c.hoverBorder} ${c.glow}`}>
                  <div className="absolute inset-0 pointer-events-none select-none z-0">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="absolute inset-0 h-full w-full object-cover object-right opacity-55 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/95 via-[#0d0d0d]/60 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent z-10" />
                  </div>

                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${c.iconBg}`}>
                          <Icon size={22} className={c.text} />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                          {feature.title}
                        </h3>
                      </div>
                      <ArrowUpRight size={16} className={`${c.arrow}/40 shrink-0 ml-2`} />
                    </div>

<div className={`mt-3 mb-3 h-[1.5px] w-8 rounded-full transition-all duration-500 group-hover:w-14 ${c.divider}`} />

                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-3">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center text-[11px] sm:text-xs text-gray-400">
<span className={`mr-1 select-none ${c.check}`}>✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/5 mt-auto">
                      <Link
                        href={feature.link}
                        className={`inline-flex items-center text-xs sm:text-sm font-semibold text-white cursor-pointer transition-colors duration-300 ${c.learn}`}
                      >
                        <span className="text-white">Learn</span><span className="text-white">&nbsp;</span><span className={c.arrow}>More</span>
                        <span className={`ml-1 transition-transform duration-300 group-hover:translate-x-1 ${c.arrow}`}>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="hidden xl:block" />
              </>
            );
          })()}
        </div>

      </Container>
      </Reveal>
    </section>
  );
}
