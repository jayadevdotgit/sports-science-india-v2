"use client";

import { useMemo } from "react";
import { useParams, notFound, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CalendarClock,
  ShieldCheck,
  Activity,
  Users,
  ClipboardList,
  Sparkles,
  HelpCircle,
  Brain,
  PersonStanding,
  Dumbbell,
  HeartPulse,
  Stethoscope,
  Hand,
  Footprints,
  Microscope,
  Bone,
  ShieldPlus,
  Syringe,
  Trophy,
  ClipboardCheck,
  Heart,
  Baby,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/footer/Footer";
import Container from "@/components/ui/Container";
import { bodyData } from "@/components/ecosystem/bodyData";
import { serviceDetails } from "@/components/ecosystem/serviceDetails";
import { serviceSectionDetails } from "@/components/services/servicePages";
import { servicesList } from "@/components/services/services";

function slugFrom(link: string): string {
  return link.split("/").filter(Boolean).pop() || "";
}

const serviceIcons: Record<string, LucideIcon> = {
  "sports-psychology": Brain,
  "neck-care": PersonStanding,
  "strength-conditioning": Dumbbell,
  "cardiovascular-training": HeartPulse,
  "sports-medicine": Stethoscope,
  "elbow-performance": Hand,
  "core-stability": Activity,
  biomechanics: Footprints,
  "wrist-function": Hand,
  "hip-mobility": PersonStanding,
  rehabilitation: Activity,
  "injury-prevention": ShieldCheck,
  "sports-surgery": Syringe,
  "ligament-surgery": Bone,
  "joint-preservation": ShieldPlus,
  "sports-science": Microscope,
  "musculoskeletal-rehab": Activity,
  "sports-rehabilitation": HeartPulse,
  physiotherapy: Activity,
  assessments: ClipboardCheck,
  "return-to-sports": Trophy,
  "pre-post-natal-rehab": Baby,
  "obstetrics-gynaecology-consultation": Heart,
};

type ServiceInfo = {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  image?: string;
};

function SectionHeading({ icon: Icon, title }: { icon: typeof Activity; title: string }) {
  return (
    <h2 className="flex items-center gap-2 text-lg font-bold text-white">
      <Icon size={18} className="text-orange-400" />
      {title}
    </h2>
  );
}

export default function ServicePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const router = useRouter();
  const pathname = usePathname();

  const goToServices = () => {
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 450);
    } else {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const service = useMemo<ServiceInfo | null>(() => {
    const body = bodyData.find((item) => slugFrom(item.link) === slug);
    if (body) {
      return {
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        icon: body.icon,
        features: body.features,
      };
    }
    const section = servicesList.find((item) => slugFrom(item.link) === slug);
    if (section) {
      return {
        title: section.title,
        subtitle: "Elite Performance Service",
        description: section.description,
        icon: "⚡",
        features: section.features,
        image: section.image,
      };
    }
    return null;
  }, [slug]);

  const detail = useMemo(
    () =>
      serviceSectionDetails.find((d) => d.slug === slug) ??
      serviceDetails.find((d) => d.slug === slug) ??
      null,
    [slug]
  );

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <section className="relative overflow-hidden bg-[#050505] pb-20 text-white scroll-mt-32">
        <div className="absolute left-1/2 top-20 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[180px] pointer-events-none" />

        <Container>
          <div className="mx-auto max-w-3xl pt-36">
            <button
              onClick={goToServices}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-gray-400 hover:text-orange-400 transition"
            >
              <ArrowLeft size={14} /> Back to Services
            </button>

            <div className="mt-10 flex h-20 w-20 items-center justify-center rounded-3xl border border-orange-500/40 bg-orange-500/10">
              {(() => {
                const Icon = serviceIcons[slug] ?? Activity;
                return <Icon size={40} className="text-orange-500" />;
              })()}
            </div>

            <p className="mt-8 text-sm uppercase tracking-[0.3em] text-orange-500">
              {service.subtitle}
            </p>

            <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
              {service.title}
            </h1>

            <div className="mt-6 h-1 w-20 rounded-full bg-orange-500" />

            <p className="mt-6 text-base leading-8 text-gray-400">
              {service.description}
            </p>

            {detail && (
              <>
                {/* Overview */}
                <div className="mt-10 space-y-4">
                  {detail.overview.map((paragraph, i) => (
                    <p key={i} className="text-base leading-8 text-gray-300">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* What's Included */}
                <div className="mt-10 rounded-3xl border border-orange-500/20 bg-black/60 backdrop-blur-md p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/60 hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]">
                  <SectionHeading icon={Activity} title="What's Included" />
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2.5">
                        <CheckCircle2 size={16} className="shrink-0 text-orange-500" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Who It's For */}
                <div className="mt-10 rounded-3xl border border-orange-500/20 bg-black/60 backdrop-blur-md p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/60 hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]">
                  <SectionHeading icon={Users} title="Who It's For" />
                  <ul className="mt-5 space-y-3">
                    {detail.whoItsFor.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-orange-500" />
                        <span className="text-sm leading-relaxed text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What To Expect */}
                <div className="mt-10 rounded-3xl border border-orange-500/20 bg-black/60 backdrop-blur-md p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/60 hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]">
                  <SectionHeading icon={ClipboardList} title="What To Expect" />
                  <ul className="mt-5 space-y-3">
                    {detail.whatToExpect.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-orange-500" />
                        <span className="text-sm leading-relaxed text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="mt-10 rounded-3xl border border-orange-500/20 bg-black/60 backdrop-blur-md p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/60 hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]">
                  <SectionHeading icon={Sparkles} title="Benefits" />
                  <ul className="mt-5 space-y-3">
                    {detail.benefits.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-orange-500" />
                        <span className="text-sm leading-relaxed text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FAQ */}
                <div className="mt-10 rounded-3xl border border-orange-500/20 bg-black/60 backdrop-blur-md p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/60 hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]">
                  <SectionHeading icon={HelpCircle} title="Frequently Asked Questions" />
                  <div className="mt-5 space-y-5">
                    {detail.faq.map((faq) => (
                      <div key={faq.q}>
                        <p className="text-sm font-bold text-white">{faq.q}</p>
                        <p className="mt-1 text-sm leading-relaxed text-gray-400">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-400"
              >
                <CalendarClock size={16} /> Book an Assessment
              </Link>
              <button
                onClick={goToServices}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-orange-500/40 bg-orange-500/10 px-6 py-3.5 text-sm font-semibold text-orange-400 transition hover:bg-orange-500 hover:text-white"
              >
                <ShieldCheck size={16} /> Explore Other Services
              </button>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}
