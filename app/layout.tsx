import type { Metadata } from "next";
import "./globals.css";
import CursorEffect from "@/app/components/CursorEffect";
import ParticleBackground from "@/app/components/ParticleBackground";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";

export const metadata: Metadata = {
  title: "Rutansh — Portfolio",
  description: "Student • Developer • Creator",
  openGraph: {
    title: "Rutansh — Portfolio",
    description: "Student • Developer • Creator",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="antialiased relative md:cursor-none"
        style={{
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        <ThemeProvider>
          {/* Orbs — CSS only, lightweight, shown on all devices */}
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />

          {/* Mesh — desktop only */}
          <div className="mesh-bg hidden md:block" />

          {/* Grid dots — desktop only */}
          <div className="grid-bg fixed inset-0 z-0 pointer-events-none opacity-40 hidden md:block" />

          {/* Particles — disabled on mobile via component itself */}
          <ParticleBackground />

          {/* Cursor — disabled on mobile via component itself */}
          <CursorEffect />

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Main content */}
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}