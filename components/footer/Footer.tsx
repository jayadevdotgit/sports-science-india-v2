import Container from "@/components/ui/Container";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const links = [
  ["Home", "/#home"], ["Services", "/#services"], ["About", "/#about"],
  ["Assessment", "/booking"], ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0a0a0a] pb-10 pt-20 text-white">
      <Container>
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/images/logo/ssi-logo.png"
              alt="Sports Science India"
              width={160}
              height={60}
              className="h-14 w-auto object-contain"
            />
            <p className="mt-6 max-w-md leading-7 text-gray-400">India&apos;s integrated sports science platform for performance assessment, rehabilitation and athlete development.</p>
          </div>
          <div>
            <h3 className="mb-6 text-xl font-semibold">Explore</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-gray-400">
              {links.map(([label, href]) => <li key={href}><a className="transition hover:text-orange-500" href={href}>{label}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xl font-semibold">Contact</h3>
            <div className="space-y-4 text-gray-400">
              <a className="flex items-center gap-3 hover:text-orange-500" href="mailto:sportscienceindia@gmail.com"><Mail size={18} className="text-orange-500" />sportscienceindia@gmail.com</a>
              <a className="flex items-center gap-3 hover:text-orange-500" href="tel:+917381380010"><Phone size={18} className="text-orange-500" />+91 73813 80010</a>
              <a className="flex items-center gap-3 hover:text-orange-500" href="tel:+918280381010"><Phone size={18} className="text-orange-500" />+91 82803 81010</a>
              <p className="flex items-start gap-3"><MapPin size={18} className="mt-1 shrink-0 text-orange-500" />A17/1A, Surya Nagar, Bhubaneswar 751003</p>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-gray-500">© 2026 Sports Science India. All rights reserved.</div>
        <p className="mt-3 text-center text-sm text-gray-600">Designed by <span className="font-semibold text-orange-500">Jayadev</span></p>
      </Container>
    </footer>
  );
}
