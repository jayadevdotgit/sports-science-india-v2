import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  ClipboardCheck,
  Activity,
  BarChart3,
  Dumbbell,
  HeartPulse,
  Trophy,
} from "lucide-react";

const journey = [
  {
    step: "STEP 01",
    title: "Assessment",
    icon: ClipboardCheck,
  },
  {
    step: "STEP 02",
    title: "Evaluation",
    icon: Activity,
  },
  {
    step: "STEP 03",
    title: "Analysis",
    icon: BarChart3,
  },
  {
    step: "STEP 04",
    title: "Training",
    icon: Dumbbell,
  },
  {
    step: "STEP 05",
    title: "Recovery",
    icon: HeartPulse,
  },
  {
    step: "STEP 06",
    title: "Peak Performance",
    icon: Trophy,
  },
];

export default function JourneyTimeline() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-14 text-white">

      <Reveal>
      <Container>

        <SectionHeading
          eyebrow="Athlete Journey"
          title={<>Your Path to <span className="text-orange-500">Peak Performance</span></>}
          description="Every athlete follows a structured science-driven process from assessment to elite performance."
        />

        <div className="relative mt-6 sm:mt-10 lg:mt-12">

        <div className="grid grid-cols-3 gap-4 sm:gap-6 md:grid-cols-6">

            {journey.map((item, idx) => {
            const Icon = item.icon;

            return (

            <div
                key={item.step}
                className="
                group
                relative
                flex
                flex-col
                items-center
                text-center
                transition-all
                duration-500
                hover:-translate-y-2
                "
            >
                {/* Connector line to next step */}
                {idx < journey.length - 1 && (
                <div className={`absolute left-[55%] top-[30px] w-[calc(100%+1.5rem)] opacity-30 transition-all duration-500 group-hover:opacity-100 pointer-events-none ${(idx + 1) % 3 === 0 ? 'hidden md:block' : ''}`}>
                    <div className="h-[4px] rounded-full bg-gradient-to-r from-orange-500 to-orange-500/40" />
                </div>
                )}

                <div
                className="
                    relative
                    z-10
                    flex
                    h-14
                    w-14
                    sm:h-16
                    sm:w-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-orange-500/20
                    bg-gradient-to-br
                    from-[#1d1d1d]
                    to-[#0c0c0c]
                    shadow-[0_0_25px_rgba(249,115,22,0.18)]
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:border-orange-500
                    group-hover:shadow-[0_0_45px_rgba(249,115,22,0.6)]
                "
                >
                <Icon size={22} className="text-orange-500 sm:size-[28px]" />
                </div>

                <div className="mt-3 h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,1)]" />

                <div className="mt-3 flex items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1">
                <span className="text-[10px] font-semibold tracking-[0.25em] text-orange-400 leading-none">
                    {item.step}
                </span>
                </div>

                <h3 className="mt-1 text-[11px] sm:text-sm font-semibold text-white">
                {item.title}
                </h3>

            </div>

           );
           })}

        </div>

        </div>

      </Container>
      </Reveal>

    </section>
  );
}