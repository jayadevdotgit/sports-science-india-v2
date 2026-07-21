import {
  Activity,
  ShieldCheck,
  Brain,
  BarChart3,
  HeartPulse,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Evidence-Based Assessments",
    description:
      "Every assessment is backed by proven sports science methodologies and objective testing.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track measurable improvements through data-driven insights and athlete profiling.",
  },
  {
    icon: ShieldCheck,
    title: "Injury Prevention",
    description:
      "Identify movement inefficiencies before they become serious injuries.",
  },
  {
    icon: HeartPulse,
    title: "Recovery Science",
    description:
      "Accelerate recovery using scientifically validated recovery protocols.",
  },
  {
    icon: Brain,
    title: "Expert Specialists",
    description:
      "Work with experienced professionals in sports science, rehabilitation and conditioning.",
  },
  {
    icon: Target,
    title: "Personalized Programs",
    description:
      "Every athlete receives a customized performance and recovery plan.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="bg-zinc-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center max-w-4xl mx-auto mb-14">

          <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
            Why Choose Us
          </p>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-white">
            Science. Performance. Excellence.
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />

          <p className="mt-4 text-base text-gray-400 leading-7 max-w-3xl mx-auto">
            We combine sports science, technology and athlete-focused care to
            help you perform at your highest level.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-[#111111] rounded-3xl p-8 border border-gray-800 hover:border-orange-500 hover:-translate-y-2 transition-all duration-300"
              >
                <Icon className="text-orange-500 mb-6" size={46} />

                <h3 className="text-2xl font-semibold mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}