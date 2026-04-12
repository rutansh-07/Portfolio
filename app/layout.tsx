import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import Navbar from "@/app/components/Navbar";

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
      <body className="antialiased selection:bg-accent1 selection:text-white">
        <ThemeProvider>
          {/* Background Elements */}
          <div className="bg-orb bg-orb-1 opacity-20" />
          <div className="bg-orb bg-orb-2 opacity-20" />
          
          <div className="relative z-10 flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
          </div>
          
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}