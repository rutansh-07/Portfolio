"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import rutanshImage from "@/assets/Rutansh.jpg";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={scrolled
          ? "fixed top-0 left-0 right-0 z-50 transition-all duration-500 glass border-b border-white/5 shadow-glass py-3"
          : "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent py-5"}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="relative group flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 group-hover:border-accent1/50 transition-all duration-300">
              <Image
                src={rutanshImage}
                alt="Rutansh"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-syne font-bold text-lg tracking-wide gradient-text">
              Rutansh
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={isActive
                      ? "relative px-4 py-2 text-sm rounded-lg transition-all duration-300 group text-white inline-block"
                      : "relative px-4 py-2 text-sm rounded-lg transition-all duration-300 group text-white/50 hover:text-white inline-block"}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-lg glass border border-accent1/20" />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-accent1 to-accent2 group-hover:w-4/5 transition-all duration-300" />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:block glow-btn px-5 py-2 rounded-full text-sm z-10"
          >
            Hire Me
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 z-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen
              ? "block w-6 h-px bg-white transition-all duration-300 rotate-45 translate-y-2"
              : "block w-6 h-px bg-white transition-all duration-300"} />
            <span className={menuOpen
              ? "block w-6 h-px bg-white transition-all duration-300 opacity-0"
              : "block w-6 h-px bg-white transition-all duration-300"} />
            <span className={menuOpen
              ? "block w-6 h-px bg-white transition-all duration-300 -rotate-45 -translate-y-2"
              : "block w-6 h-px bg-white transition-all duration-300"} />
          </button>

        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={menuOpen
        ? "fixed inset-0 z-40 transition-all duration-500 md:hidden opacity-100 pointer-events-auto"
        : "fixed inset-0 z-40 transition-all duration-500 md:hidden opacity-0 pointer-events-none"}
      >
        <div
          className="absolute inset-0 bg-bgprimary/80 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />
        <div className={menuOpen
          ? "absolute top-0 right-0 h-full w-72 glass border-l border-white/5 p-8 pt-24 flex flex-col gap-2 transition-transform duration-500 translate-x-0"
          : "absolute top-0 right-0 h-full w-72 glass border-l border-white/5 p-8 pt-24 flex flex-col gap-2 transition-transform duration-500 translate-x-full"}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-syne text-lg transition-all duration-200 border border-transparent hover:border-white/10"
            >
              {link.label}
            </a>
          ))}
          
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-6 glow-btn px-5 py-3 rounded-full text-center text-sm z-10"
          >
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;