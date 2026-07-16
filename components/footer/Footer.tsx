import Container from "@/components/ui/Container";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-10 border-t border-gray-800">
      <Container>
        <div className="grid md:grid-cols-4 gap-12">

          {/* Company */}
          <div>
            <h2 className="text-2xl font-bold">
              Sports Science
              <span className="text-orange-500"> India</span>
            </h2>

            <p className="text-gray-400 mt-6 leading-7">
              India's first comprehensive Sports Science platform
              dedicated to improving athletic performance through
              science-backed assessment, rehabilitation and
              performance optimization.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Services
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Performance Assessment</li>
              <li>Injury Screening</li>
              <li>Strength & Conditioning</li>
              <li>Sports Nutrition</li>
              <li>Recovery & Rehab</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Testimonials</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Contact
            </h3>

            <div className="space-y-4 text-gray-400">

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-orange-500" />
                sportscienceindia@gmail.com
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-orange-500" />
                +91 - 7381380010  
                <br />
                +91 - 7847922850
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-orange-500" />
                Sports Science India,
                <br />
                Plot No - A17/1A, Surya Nagar 
                <br />
                In front of S.P Vigilance Office Bhubaneswar - 751003
              </div>

            </div>

            <div className="flex gap-5 mt-8">

              <div className="flex gap-5 mt-8">

            <Globe className="cursor-pointer hover:text-orange-500 transition" />

            <ExternalLink className="cursor-pointer hover:text-orange-500 transition" />

            <Mail className="cursor-pointer hover:text-orange-500 transition" />

           </div>

            </div>

          </div>

        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500">
          © 2026 Sports Science India. All Rights Reserved.
        </div>

      </Container>
    </footer>
  );
}