"use client";

import { FormEvent, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SimulationMap from "./SimulationMap";

import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  Send,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Navigation,
  AlertCircle,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

const infoTiles = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [
      "Sports Science India",
      "Plot No. A17/1A, Surya Nagar",
      "In front of S.P Vigilance Office",
      "Bhubaneswar – 751003",
    ],
    action: { label: "Get Directions", href: "https://maps.app.goo.gl/zjXDBnquKEW9H7Uh9" },
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 7381380010", "+91 8280381010"],
    action: { label: "Call Now", href: "tel:+917381380010" },
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["sportscienceindia@gmail.com"],
    action: { label: "Write to Us", href: "mailto:sportscienceindia@gmail.com" },
  },
  {
    icon: Clock3,
    title: "Office Hours",
    lines: ["Monday – Saturday", "9:00 AM – 8:00 PM", "Sundays closed"],
    action: null,
  },
];

const socials = [
  { icon: FaFacebookF, href: "https://www.facebook.com/sportscienceindia", label: "Facebook" },
  { icon: FaInstagram, href: "https://www.instagram.com/sports_science_india/", label: "Instagram" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/sports-science-india/", label: "LinkedIn" },
  { icon: FaYoutube, href: "https://www.youtube.com/@sportsscienceindia", label: "YouTube" },
];

const inputClass =
  "w-full rounded-xl border border-gray-700 bg-black/60 px-4 py-3.5 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error ?? "Failed to send your message.");
      }

      setStatus("sent");
      form.reset();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send your message. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#050505] pt-48 pb-12 text-white sm:pt-36 sm:pb-14"
    >
      {/* Ambient glows */}
      <div className="absolute left-1/2 top-16 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[180px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-orange-500/5 blur-[140px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,black_95%)]" />

      <Container className="relative z-10">
        {/* Header */}
        <Reveal>
          <SectionHeading
            eyebrow="Contact Us"
            title={<>Let&apos;s Build Better <span className="text-orange-500">Athletes</span> Together</>}
            description="Whether you're an athlete, coach, or organization, we'd love to hear from you. Reach out through any of the channels below or send us a message — our team replies promptly."
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left — info tiles + socials */}
          <Reveal delay={0.05}>
            <div className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                {infoTiles.map((tile) => {
                  const Icon = tile.icon;
                  return (
                    <div
                      key={tile.title}
                      className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-[#0d0d0d] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)] sm:p-6"
                    >
                      <div className="flex items-center gap-4 sm:block">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-500 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                          <Icon size={22} />
                        </div>
                        <div className="mt-0 sm:mt-4">
                          <h3 className="text-lg font-bold">{tile.title}</h3>
                          <p className="mt-2 space-y-0.5 text-sm leading-6 text-gray-400">
                            {tile.lines.map((line) => (
                              <span key={line} className="block">
                                {line}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                      {tile.action && (
                        <a
                          href={tile.action.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 transition-colors hover:text-orange-300"
                        >
                          {tile.action.label}
                          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Socials */}
              <div className="rounded-3xl border border-gray-800 bg-[#0d0d0d] p-5 sm:p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
                  Follow Us
                </h3>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-[#1a1a1a] text-gray-300 transition-all duration-300 hover:scale-110 hover:border-orange-500 hover:bg-orange-500 hover:text-white sm:h-11 sm:w-11"
                      >
                        <Icon size={17} />
                      </a>
                    );
                  })}
                  <a
                    href="tel:+917381380010"
                    className="ml-auto inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-semibold text-orange-300 transition-all duration-300 hover:bg-orange-500 hover:text-white"
                  >
                    <PhoneCall size={14} />
                    Call Us Anytime
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — message form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-[28px] border border-gray-800 bg-[#0d0d0d]/80 p-5 backdrop-blur-xl sm:p-8"
            >
              <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-orange-500/15 blur-[80px]" />

              <p className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-discover-ping rounded-full bg-orange-400/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.9)]" />
                </span>
                Send a Message
              </p>
              <h3 className="mt-4 text-2xl font-bold">
                We&apos;d love to <span className="text-orange-500">help.</span>
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Share a few details and we&apos;ll get back to you shortly.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Full Name
                  </label>
                  <input id="name" name="name" required type="text" placeholder="Your full name" className={inputClass} />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Email
                    </label>
                    <input id="email" name="email" required type="email" placeholder="you@example.com" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Phone
                    </label>
                    <input id="phone" name="phone" type="tel" placeholder="+91 ..." className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full !text-base tracking-wide shadow-[0_0_25px_rgba(249,115,22,0.35)] hover:shadow-[0_0_45px_rgba(249,115,22,0.65)]"
                >
                  {status === "sending" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </Button>

                {status === "sent" && (
                  <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                    <CheckCircle2 size={18} className="shrink-0" />
                    Thank you! Your message has been sent. We&apos;ll be in touch soon.
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    <AlertCircle size={18} className="shrink-0" />
                    {error}
                  </div>
                )}
              </div>
            </form>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal delay={0.1}>
          <div className="mt-12">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold">
                Find Us on the <span className="text-orange-500">Map</span>
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Live map with an illustrated view of our location in Surya Nagar, Bhubaneswar.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="overflow-hidden rounded-[28px] border border-gray-800">
                <iframe
                  title="Sports Science India location"
                  src="https://maps.google.com/maps?q=Sports%20Science%20India%2C%20Surya%20Nagar%2C%20Bhubaneswar&output=embed"
                  className="h-[300px] w-full grayscale-[0.3] sm:h-[360px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <SimulationMap />
            </div>
            <div className="mt-5 text-center">
              <a
                href="https://maps.app.goo.gl/zjXDBnquKEW9H7Uh9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-6 py-3 text-sm font-semibold text-orange-300 transition-all duration-300 hover:bg-orange-500 hover:text-white"
              >
                <Navigation size={16} />
                Get Directions on Google Maps
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}