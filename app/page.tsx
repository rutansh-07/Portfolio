"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import AdminProvider from "@/app/components/AdminProvider";
import Hero from "@/app/sections/Hero";
import Skills from "@/app/sections/Skills";
import Experience from "@/app/sections/Experience";
import Projects from "@/app/sections/Projects";
import Blog from "@/app/sections/Blog";
import Contact from "@/app/sections/Contact";
import Loader from "@/app/components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoaderComplete = () => {
    setLoading(false);
  };

  // Prevent flash before mount
  if (!mounted) return null;

  return (
    <AdminProvider>
      {loading && <Loader onComplete={handleLoaderComplete} />}

      <main
        className={`transition-opacity duration-700 ${
          loading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Navbar />
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Blog />
        <Contact />

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-dm text-sm text-white/20">
              © 2026 Rutansh. Built with Next.js & ❤️
            </p>
            <p className="font-dm text-xs text-white/10 tracking-widest uppercase">
              Designed & Developed by Rutansh
            </p>
          </div>
        </footer>
      </main>
    </AdminProvider>
  );
}