"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Menu, X, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getLenis, smoothScrollToEl } from "@/lib/scrollEngine";



const navLinks = [
  { name: "Home", href: "#", target: "home" },
  { name: "About", href: "/about", target: "about" },
  { name: "Ecosystem", href: "#network", target: "network" },
  { name: "Performance", href: "#ecosystem", target: "ecosystem" },
  { name: "Services", href: "#services", target: "services" },
  { name: "Technology", href: "/technology", target: "technology" },
  { name: "Experts", href: "/experts", target: "experts" },
  { name: "Gallery", href: "#gallery", target: "gallery" },
  { name: "Contact", href: "/contact", target: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    // The navbar collapses from h-32 (128px) to h-28 (112px) once scrolled.
    // Use the collapsed height so the section divider lands exactly at the
    // navbar bottom. All values are viewport-relative (zoom-consistent).
    const navbar = document.querySelector("nav");
    if (navbar) {
      const zoom = navbar.getBoundingClientRect().height / navbar.offsetHeight;
      const scrolledNavHeight = 112 * zoom;
      smoothScrollToEl(section, scrolledNavHeight);
    }
  };

  const scrollToSectionWithRetry = (id: string) => {
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        scrollToSection(id);
        return true;
      }
      return false;
    };

    if (!scroll()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts += 1;
        if (scroll() || attempts > 20) clearInterval(interval);
      }, 150);
    }
  };

  const handleNavigation = (target: string) => {
    setMenuOpen(false);

    if (
      target === "experts" ||
      target === "contact" ||
      target === "technology" ||
      target === "booking" ||
      target === "about"
    ) {
      const route = `/${target}`;
      if (pathname !== route) router.push(route);
      return;
    }

    if (pathname !== "/") {
      // Navigate home first, then scroll to the section.
      router.push("/");
      scrollToSectionWithRetry(target);
      return;
    }

    scrollToSection(target);
  };

  const normalizeTarget = (item: { href: string; target: string }) =>
    item.target;

useEffect(() => {
  const sections = [
    "home",
    "network",
    "ecosystem",
    "services",
    "gallery",
    "contact",
  ];

  let rafPending = false;

  const updateNav = () => {
    rafPending = false;

    setScrolled(window.scrollY > 10);

    const windowHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = (windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0);

    setScrollProgress(progress);

    const navbar = document.querySelector("nav");
    const navBottom = navbar ? navbar.getBoundingClientRect().bottom : 0;

    let current = sections[0];

    for (const section of sections) {
      const element = document.getElementById(section);
      if (!element) continue;

      const rect = element.getBoundingClientRect();

      // The section is "active" when its divider top has reached the bottom
      // of the navbar but its bottom is still below it.
      if (rect.top <= navBottom + 1 && rect.bottom > navBottom) {
        current = section;
      }
    }

    setActiveSection(current);
  };

  const handleScroll = () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(updateNav);
  };

  // Run once on page load
  handleScroll();

  // Close the mobile menu when the viewport enters the desktop (xl) breakpoint,
  // e.g. rotating a tablet to landscape.
  const handleResize = () => {
    if (window.innerWidth >= 1280) setMenuOpen(false);
  };
  window.addEventListener("resize", handleResize);

  // Also run after Lenis finishes a smooth scroll so the active section can
  // settle on the final position.
  const lenis = getLenis();

  let lenisCleanup: (() => void) | null = null;
  if (lenis) {
    const onLenisScroll = () => {
      handleScroll();
    };
    lenis.on("scroll", onLenisScroll);
    lenisCleanup = () => lenis.off("scroll", onLenisScroll);
  }

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
    lenisCleanup?.();
  };
}, []);

const routeActive =
    pathname === "/experts"
      ? "experts"
      : pathname === "/contact"
        ? "contact"
        : pathname === "/technology"
          ? "technology"
          : pathname === "/about"
            ? "about"
            : null;

  // Keep active section in sync when navigating between pages.
  const currentActive = routeActive ?? activeSection;

  return (
    <>

    <div
      className="fixed top-0 left-0 z-[60] h-[2px] origin-left bg-orange-500 will-change-transform"
      style={{
        transform: `scaleX(${scrollProgress / 100})`,
        boxShadow: "0 0 10px rgba(249,115,22,0.8)",
      }}
    />
      
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-[#050505]/60 bg-black/70 backdrop-blur-xl border-b border-orange-500/20 shadow-lg shadow-black/30 will-change-transform"
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
                className="h-20 w-auto object-contain lg:h-24"
              />
            </button>

          </div>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-12">

        {navLinks.map((item) => (
  <button
    key={item.name}
    onClick={() =>
      handleNavigation(
        normalizeTarget(item)
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
                currentActive ===
                normalizeTarget(item)
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

            <Link
              href="/admin"
              className="flex items-center gap-1.5 font-medium text-gray-300 transition-all duration-300 hover:text-orange-300"
            >
              <Lock size={14} />
              Login
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="xl:hidden text-white"
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
                normalizeTarget(item)
              )
            }
            className={`
            text-left
            text-xl
            transition-all
            duration-300
            ${
              currentActive ===
              normalizeTarget(item)
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

          <Link
            href="/admin"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-xl text-white transition-all duration-300 hover:text-orange-500"
          >
            <Lock size={20} />
            Login
          </Link>

        </div>

      </div>
    </>
  );
}
