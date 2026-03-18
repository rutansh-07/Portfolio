"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import rutanshImage from "@/assets/Rutansh.jpg";

const roles = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
  "Problem Solver",
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 30);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left — Text */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <div className="fade-in-up delay-1 inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full glass border border-accent1/20">
            <span className="w-2 h-2 rounded-full bg-accent2 animate-pulse-slow" />
            <span className="text-xs font-dm text-white/60 tracking-widest uppercase">
              Available for opportunities
            </span>
          </div>

          {/* Heading */}
          <div className="fade-in-up delay-2">
            <h1 className="font-syne text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Hey, I&apos;m <span className="gradient-text">Rutansh</span>
            </h1>
            <div className="mt-3 h-10 flex items-center">
              <span className="font-syne text-xl md:text-2xl text-white/40">
                {displayed}
                <span className="inline-block w-0.5 h-6 bg-accent2 ml-0.5 animate-pulse" />
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="fade-in-up delay-3 font-dm text-white/50 text-lg leading-relaxed max-w-md">
            A passionate student building futuristic digital experiences. I love
            crafting clean code, beautiful interfaces, and scalable systems.
          </p>

          {/* CTA Buttons */}
          <div className="fade-in-up delay-4 flex flex-wrap gap-4 mt-2">
            <a
              href="#projects"
              className="glow-btn px-7 py-3 rounded-full text-sm font-syne z-10"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-7 py-3 rounded-full text-sm font-syne glass border border-white/10 hover:border-accent1/30 text-white/70 hover:text-white transition-all duration-300 z-10"
            >
              Get in Touch
            </a>
          </div>

          {/* Social Links */}
          <div className="fade-in-up delay-5 flex items-center gap-4 mt-2">
            <span className="text-xs text-white/30 tracking-widest uppercase font-dm">
              Find me on
            </span>
            <div className="h-px flex-1 max-w-12 bg-white/10" />
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass border border-white/10 hover:border-accent1/40 flex items-center justify-center text-white/40 hover:text-accent2 transition-all duration-300 hover:shadow-glow2 z-10"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right — Photo */}
        <div className="fade-in-up delay-3 flex justify-center md:justify-end relative">
          {/* Spinning rings */}
          <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full border border-accent1/10 animate-spin-slow" />
          <div
            className="absolute w-72 h-72 md:w-88 md:h-88 rounded-full border border-dashed border-accent2/10 animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "15s" }}
          />

          {/* Glow behind image */}
          <div className="absolute w-64 h-64 rounded-full bg-accent1/10 blur-3xl" />

          {/* Photo Container */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/10 shadow-glow1 z-10">
            <Image
              src={rutanshImage}
              alt="Rutansh"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay shimmer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent1/10 via-transparent to-accent2/10" />
          </div>

          {/* Floating stat cards */}
          <div className="absolute bottom-4 -left-4 glass border border-white/10 rounded-2xl px-4 py-3 z-20 fade-in-up delay-4">
            <p className="font-syne font-bold text-xl gradient-text">10+</p>
            <p className="font-dm text-xs text-white/40">Projects Built</p>
          </div>
          <div className="absolute top-8 -right-4 glass border border-white/10 rounded-2xl px-4 py-3 z-20 fade-in-up delay-5">
            <p className="font-syne font-bold text-xl gradient-text-alt">2+</p>
            <p className="font-dm text-xs text-white/40">Years Coding</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;