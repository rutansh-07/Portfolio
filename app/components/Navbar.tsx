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
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-4 glass border-b border-white/5 shadow-xl" : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-accent1/50 transition-all duration-300">
              <Image src={rutanshImage} alt="Rutansh" fill className="object-cover" />
            </div>
            <span className="font-syne font-bold text-xl tracking-tight gradient-text group-hover:scale-105 transition-transform duration-300">Rutansh</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isActive ? "text-white bg-white/10" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a href="#contact" className="glow-btn px-6 py-2 rounded-full text-sm ml-4">Hire Me</a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2 transition-transform active:scale-90">
            <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-72 glass p-8 flex flex-col gap-6 transition-transform duration-500 shadow-2xl ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between mb-4">
             <span className="font-syne font-bold text-lg opacity-40 uppercase tracking-widest">Menu</span>
             <button onClick={() => setMenuOpen(false)} className="p-2 opacity-50 hover:opacity-100">✕</button>
          </div>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="text-2xl font-syne font-bold opacity-70 hover:opacity-100 hover:translate-x-2 transition-all duration-300">{link.label}</a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-auto glow-btn py-4 rounded-2xl text-center">Get in Touch</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;