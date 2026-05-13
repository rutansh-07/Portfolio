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
        <footer className="py-8 px-6">
          <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-accent1/30 to-transparent mb-8" />
          <p className="text-center font-dm text-xs text-white/20">
            © 2026 Rutansh. All rights reserved.
          </p>
        </footer>
      </main>
    </AdminProvider>
  );
}