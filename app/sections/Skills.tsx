"use client";

import React, { useState, useEffect, useRef } from "react";

const skillCategories = [
  {
    label: "Frontend",
    icon: "◇",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Figma", level: 70 },
      { name: "Framer Motion", level: 65 },
    ],
  },
  {
    label: "Backend",
    icon: "⬡",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "MongoDB", level: 78 },
      { name: "Prisma", level: 72 },
      { name: "REST APIs", level: 88 },
    ],
  },
  {
    label: "Tools & Others",
    icon: "△",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 65 },
      { name: "Linux", level: 70 },
      { name: "Vercel", level: 85 },
      { name: "Redis", level: 60 },
      { name: "GraphQL", level: 62 },
    ],
  },
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTabSwitch = (i: number) => {
    if (i === activeTab || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(i);
      setTimeout(() => setAnimating(false), 50);
    }, 200);
  };

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-xs font-dm tracking-widest uppercase text-white/30 mb-3">
            What I work with
          </p>
          <h2 className="font-syne text-4xl md:text-5xl font-bold">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-accent1 to-accent2 mx-auto" />
        </div>

        {/* Tabs */}
        <div className={`flex justify-center mb-12 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex p-1.5 rounded-2xl glass border border-white/10 gap-2">
            {skillCategories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => handleTabSwitch(i)}
                className={`px-5 sm:px-6 py-2.5 rounded-xl text-sm font-syne font-bold transition-all duration-500 flex items-center gap-2 ${
                  activeTab === i
                    ? "bg-gradient-to-r from-accent1/20 to-accent2/20 text-white shadow-lg border border-white/10"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                <span className={`text-xs transition-transform duration-500 ${activeTab === i ? "scale-125" : "scale-100"}`}>
                  {cat.icon}
                </span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ${
            animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          } ${visible ? "" : "opacity-0"}`}
        >
          {skillCategories[activeTab].skills.map((skill, i) => (
            <div
              key={`${activeTab}-${skill.name}`}
              className="group relative"
              style={{
                animationName: visible && !animating ? "skillFadeIn" : "none",
                animationDuration: "0.4s",
                animationTimingFunction: "ease",
                animationFillMode: "both",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div className="glass border border-white/5 rounded-2xl p-5 flex items-center gap-4 transition-all duration-500 group-hover:border-accent1/30 group-hover:bg-white/5 h-full">
                {/* Skill initial */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent1/10 to-accent2/10 border border-white/5 flex items-center justify-center text-white/50 group-hover:text-accent1 group-hover:border-accent1/20 transition-all duration-500 shrink-0">
                  <span className="text-lg font-bold font-syne">{skill.name[0]}</span>
                </div>

                {/* Skill info + bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-dm text-sm text-white/60 group-hover:text-white transition-colors duration-500">
                      {skill.name}
                    </span>
                    <span className="font-dm text-xs text-white/20 group-hover:text-white/50 transition-colors duration-500">
                      {skill.level}%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent1 to-accent2 transition-all duration-1000 ease-out"
                      style={{
                        width: visible && !animating ? `${skill.level}%` : "0%",
                        transitionDelay: `${i * 0.1 + 0.3}s`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;