"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

import {
  MapPin,
  Phone,
  Mail,
  Clock3,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

export default function Contact() {
  return (
    <section id="contact" className="bg-[#050505] text-white py-28">
      <Container>

        <SectionHeading
          eyebrow="Contact Us"
          title="Let's Build Better Athletes Together"
          description="Whether you're an athlete, coach, or organization, we'd love to hear from you."
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-16">

          {/* Left */}

          <div className="space-y-6">

            <div className="bg-[#111111] rounded-3xl p-8 border border-gray-800 hover:border-orange-500 transition-all duration-300">

              <div className="flex gap-5">

                <MapPin className="text-orange-500 mt-1" />

                <div>
                  <h3 className="font-bold text-xl mb-2">
                    Address
                  </h3>

                  <p className="text-gray-400 leading-8">
                    Sports Science India<br/>
                    Plot No. A17/1A<br/>
                    Surya Nagar<br/>
                    In front of S.P Vigilance Office<br/>
                    Bhubaneswar – 751003
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-[#111111] rounded-3xl p-8 border border-gray-800 hover:border-orange-500 transition-all duration-300">

              <div className="flex gap-5">

                <Phone className="text-orange-500 mt-1"/>

                <div>

                  <h3 className="font-bold text-xl mb-2">
                    Phone
                  </h3>

                  <p className="text-gray-400">
                    +91 7381380010
                  </p>

                  <p className="text-gray-400">
                    +91 7847922850
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-[#111111] rounded-3xl p-8 border border-gray-800 hover:border-orange-500 transition-all duration-300">

              <div className="flex gap-5">

                <Mail className="text-orange-500 mt-1"/>

                <div>

                  <h3 className="font-bold text-xl mb-2">
                    Email
                  </h3>

                  <p className="text-gray-400">
                    sportscienceindia@gmail.com
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-[#111111] rounded-3xl p-8 border border-gray-800 hover:border-orange-500 transition-all duration-300">

              <div className="flex gap-5">

                <Clock3 className="text-orange-500 mt-1"/>

                <div>

                  <h3 className="font-bold text-xl mb-2">
                    Office Hours
                  </h3>

                  <p className="text-gray-400">
                    Monday - Saturday
                  </p>

                  <p className="text-gray-400">
                    9:00 AM - 8:00 PM
                  </p>

                </div>

              </div>

            </div>

            <div className="flex gap-5 pt-6">

            <a
                href="https://www.facebook.com/sportscienceindia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-gray-700 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:scale-110 transition-all duration-300"
            >
                <FaFacebookF size={20} />
            </a>

            <a
                href="https://www.instagram.com/sports_science_india/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-gray-700 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:scale-110 transition-all duration-300"
            >
                <FaInstagram size={20} />
            </a>

            <a
                href="https://www.linkedin.com/company/sports-science-india/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-gray-700 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:scale-110 transition-all duration-300"
            >
                <FaLinkedinIn size={20} />
            </a>

            <a
                href="https://www.youtube.com/channel/UCtOvDuCReussgDKGEo9REAQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-gray-700 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:scale-110 transition-all duration-300"
            >
                <FaYoutube size={20} />
            </a>

            </div>

          </div>

          {/* Right */}

          <div className="bg-[#111111] rounded-3xl border border-gray-800 p-10">

            <form className="space-y-6">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-black rounded-xl border border-gray-700 p-4 outline-none focus:border-orange-500"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full bg-black rounded-xl border border-gray-700 p-4 outline-none focus:border-orange-500"
              />

              <input
                type="tel"
                placeholder="Phone"
                className="w-full bg-black rounded-xl border border-gray-700 p-4 outline-none focus:border-orange-500"
              />

              <textarea
                rows={6}
                placeholder="Tell us how we can help..."
                className="w-full bg-black rounded-xl border border-gray-700 p-4 outline-none focus:border-orange-500"
              />

              <Button>
                Send Message
              </Button>

            </form>

          </div>

        </div>

      </Container>
    </section>
  );
}