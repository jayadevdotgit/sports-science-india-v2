import Container from "@/components/ui/Container";
import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import {
  Brain,
  Dumbbell,
  HeartPulse,
  Activity,
  ShieldAlert,
  GraduationCap,
  ArrowUpRight,
  Check,
} from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Sports Psychology",
    description: "Enhance mental strength, focus and confidence to perform under pressure.",
    image: "/images/services/psychology.jpg",
    features: [
      "Mental Toughness",
      "Stress Management",
      "Focus & Concentration",
      "Visualization Training"
    ]
  },
  {
    icon: Dumbbell,
    title: "Strength & Conditioning",
    description: "Science-based training programs to build strength, power, speed and endurance.",
    image: "/images/services/strength.jpg",
    features: [
      "Performance Training",
      "Speed & Agility",
      "Power Development",
      "Endurance Building"
    ]
  },
  {
    icon: HeartPulse,
    title: "Sports Medicine",
    description: "Expert medical care for injury prevention, diagnosis and treatment.",
    image: "/images/services/medicine.jpg",
    features: [
      "Injury Prevention",
      "Medical Consultation",
      "Pain Management",
      "On-field Support"
    ]
  },
  {
    icon: Activity,
    title: "Biomechanics",
    description: "Advanced motion analysis to improve technique and movement efficiency.",
    image: "/images/services/biomechanics.jpg",
    features: [
      "3D Motion Analysis",
      "Performance Analysis",
      "Gait Analysis",
      "Technique Optimization"
    ]
  },
  {
    icon: ShieldAlert,
    title: "Rehabilitation",
    description: "Personalized rehabilitation programs to recover faster and stronger.",
    image: "/images/services/rehab.jpg",
    features: [
      "Physiotherapy",
      "ACL Rehabilitation",
      "Manual Therapy",
      "Return to Play"
    ]
  },
  {
    icon: GraduationCap,
    title: "Education & Research",
    description: "Advancing sports science through education, research and knowledge sharing.",
    image: "/images/services/research.jpg",
    features: [
      "Workshops & Courses",
      "Research & Innovation",
      "Internship Programs",
      "Knowledge Sharing"
    ]
  }
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#050505] py-14 text-white">

      {/* Orange Glow */}
      <div className="absolute left-1/2 top-20 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[180px] pointer-events-none" />

      <Reveal>
      <Container>
        <div className="text-center max-w-4xl mx-auto mb-14">
          <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
            SERVICES
          </p>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-white">
            Elite <span className="text-orange-500">Performance</span> Solutions
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-400">
            Integrated sports science services designed to enhance performance,
            prevent injuries and extend athletic careers.
          </p>
        </div>

        <div className="mt-6 sm:mt-10 lg:mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="
                  group
                  flex
                  min-h-[220px] lg:min-h-[270px]
                  flex-col
                  relative
                  rounded-3xl
                  border
                border-orange-500/20
                bg-black/60
                backdrop-blur-md
                p-5
                overflow-hidden
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-orange-500/60
                  hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]
                  active:scale-[0.97]
                  cursor-pointer
                "
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
                      grayscale
                       opacity-30
                       transition-all
                       duration-700
                       ease-out
                       group-hover:scale-110
                       group-hover:opacity-40
                    "
                  />
                  {/* Gradients to smoothly fade image into dark background from left to right */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent z-10" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col flex-1">

                  {/* Icon + Title Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Icon size={22} className="text-orange-500" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <ArrowUpRight size={16} className="text-orange-500/40 shrink-0 ml-2" />
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
                  <div className="pt-3 border-t border-white/5 mt-6">
                    <span className="inline-flex items-center text-xs sm:text-sm font-semibold text-white cursor-pointer">
                      <span className="text-white">Learn</span><span className="text-white">&nbsp;</span><span className="text-orange-500">More</span>
                      <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </Container>
      </Reveal>
    </section>
  );
}
