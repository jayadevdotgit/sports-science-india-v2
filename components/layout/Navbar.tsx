"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => {
  setMenuOpen(false);
};

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
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-orange-500/20 shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? "h-16" : "h-20"
          }`}>

          {/* Logo */}
          <a
            href="#"
            className="text-2xl font-bold text-orange-500 whitespace-nowrap"
          >
            Sports Science India
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">

        {navLinks.map((item) => (
  <button
    key={item.name}
    onClick={() =>
      handleNavigation(
        item.href === "#" ? "home" : item.href.replace("#", "")
              )
            }
              className="
                relative
                text-white
                font-medium
                hover:text-orange-500
                transition-colors
                after:absolute
                after:left-0
                after:-bottom-2
                after:h-[2px]
                after:w-0
                after:bg-orange-500
                after:transition-all
                hover:after:w-full
              "
            >
              {item.name}
            </button>
          ))}

            <div onClick={() => handleNavigation("booking")}>
            <Button>
            Book Assessment
            </Button>
            </div>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-white"
          >
            <Menu size={30} />
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
        className={`fixed top-0 right-0 h-full w-80 bg-[#111111] z-50 transform transition-transform duration-300 ${
          menuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <div className="flex items-center justify-between p-6 border-b border-gray-800">

          <h2 className="text-xl font-bold text-orange-500">
            Menu
          </h2>

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
            className="text-left text-xl text-white hover:text-orange-500 transition"
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