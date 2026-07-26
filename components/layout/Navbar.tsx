"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import Image from "next/image";



const navLinks = [
  { name: "Home", href: "#" },
  { name: "Ecosystem", href: "#ecosystem" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

const handleNavigation = (id: string) => {
  setMenuOpen(false);

  setTimeout(() => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, 300);
};

useEffect(() => {
  const handleScroll = () => {
  setScrolled(window.scrollY > 10);

  const windowHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = (window.scrollY / windowHeight) * 100;

  setScrollProgress(progress);
};

  const sections = [
    "home",
    "ecosystem",
    "services",
    "contact",
  ];

  const handleActiveSection = () => {
    const scrollPosition = window.scrollY + 200;

    for (const section of sections) {
      const element = document.getElementById(section);

      if (
        element &&
        scrollPosition >= element.offsetTop &&
        scrollPosition < element.offsetTop + element.offsetHeight
      ) {
        setActiveSection(section);
      }
    }
  };

  // Run once on page load
  handleScroll();
  handleActiveSection();

  // Listen while scrolling
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("scroll", handleActiveSection);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("scroll", handleActiveSection);
  };
}, []);

  return (
    <>

    <div
      className="fixed top-0 left-0 z-[60] h-[2px] bg-orange-500 transition-all duration-150"
      style={{
        width: `${scrollProgress}%`,
        boxShadow: "0 0 10px rgba(249,115,22,0.8)",
      }}
    />
      
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-[#050505]/60 bg-black/70 backdrop-blur-2xl border-b border-orange-500/20 shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className={`max-w-[1600px] mx-auto flex items-center justify-between px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? "h-28" : "h-32"
          }`}>

          {/* Logo */}
          <div className="relative">

            {/* Orange Glow */}
            <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-2xl" />

            <button
              onClick={() => handleNavigation("home")}
              className="relative z-10 flex items-center transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/images/logo/ssi-logo.png"
                alt="Sports Science India"
                width={380}
                height={120}
                priority
                className="h-24 w-auto object-contain lg:h-28"
              />
            </button>

          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">

        {navLinks.map((item) => (
  <button
    key={item.name}
    onClick={() =>
      handleNavigation(
        item.href === "#" ? "home" : item.href.replace("#", "")
              )
            }
              className={`
              relative
              font-medium
              transition-all
              duration-300

              after:absolute
              after:left-0
              after:-bottom-2
              after:h-[3px]
              after:rounded-full
              after:bg-orange-400
              after:shadow-[0_0_8px_rgba(251,146,60,0.8)]
              after:transition-all

              ${
                activeSection ===
                (item.href === "#" ? "home" : item.href.replace("#", ""))
                  ? "text-orange-300 [text-shadow:0_0_8px_rgba(249,115,22,0.8)] after:w-full"
                  : "text-white hover:text-orange-300 after:w-0 hover:after:w-full"
              }
            `}
            >
              {item.name}
            </button>
          ))}

            <div onClick={() => handleNavigation("booking")}>
            <Button
              className="
              shadow-[0_0_25px_rgba(249,115,22,0.35)]
              hover:shadow-[0_0_40px_rgba(249,115,22,0.65)]
            "
            >
            Book Assessment
            </Button>
            </div>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-white"
          >
           {menuOpen ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}
          </button>

        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#090909]/95 backdrop-blur-2xl z-50 transform transition-transform duration-300 ${
          menuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <div className="flex items-center justify-between p-6 border-b border-gray-800">

          <Image
            src="/images/logo/ssi-logo.png"
            alt="Sports Science India"
            width={380}
            height={120}
            priority
            className="
              h-20
              w-auto
              object-contain
              transition-all
              duration-500
              hover:scale-105
            "
          />

          <button
            onClick={() => setMenuOpen(false)}
            className="text-white"
          >
            <X size={28} />
          </button>

        </div>

        <div className="flex flex-col p-8 space-y-8">

          {navLinks.map((item) => (
            <button
            key={item.name}
            onClick={() =>
              handleNavigation(
                item.href === "#" ? "home" : item.href.replace("#", "")
              )
            }
            className={`
            text-left
            text-xl
            transition-all
            duration-300
            ${
              activeSection ===
              (item.href === "#" ? "home" : item.href.replace("#", ""))
                ? "text-orange-500"
                : "text-white hover:text-orange-500"
            }
          `}
          >
            {item.name}
          </button>
            ))}

          <div className="pt-4">
           <div onClick={() => handleNavigation("booking")}>
            <Button>
              Book Assessment
            </Button>
          </div>
          </div>

        </div>

      </div>
    </>
  );
}
