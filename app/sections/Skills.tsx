"use client";

import React, { useState } from "react";

const skillCategories = [
  {
    label: "Frontend",
    color: "accent1",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 70 },
    ],
  },
  {
    label: "Backend",
    color: "accent2",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "Express", level: 78 },
      { name: "PostgreSQL", level: 72 },
      { name: "MongoDB", level: 75 },
      { name: "REST APIs", level: 88 },
    ],
  },
  {
    label: "Tools",
    color: "accent3",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 60 },
      { name: "Figma", level: 75 },
      { name: "VS Code", level: 95 },
      { name: "Linux", level: 65 },
    ],
  },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Tailwind",
  "PostgreSQL", "MongoDB", "Docker", "Git", "Figma",
  "Express", "Prisma", "Redis", "Vercel", "Linux",
];

const colorMap: Record<string, string> = {
  accent1: "from-accent1 to-accent2",
  accent2: "from-accent2 to-accent3",
  accent3: "from-accent3 to-accent1",
};

const borderMap: Record<string, string> = {
  accent1: "border-accent1/30 text-accent1",
  accent2: "border-accent2/30 text-accent2",
  accent3: "border-accent3/30 text-accent3",
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);
  const active = skillCategories[activeTab];

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-dm tracking-widest uppercase text-white/30 mb-3">
            What I work with
          </p>
          <h2 className="font-syne text-4xl md:text-5xl font-bold">
            My{" "}
            <span className="gradient-text">Skills</span>
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-accent1 to-accent2 mx-auto" />
        </div>

        {/* Main Card */}
        <div className="glass border border-white/5 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left — Tabs & Bars */}
            <div>
              {/* Tab Switcher */}
              <div className="flex gap-2 mb-8 p-1 glass rounded-2xl w-fit">
                {skillCategories.map((cat, i) => (
                  <button
                    key={cat.label}
                    onClick={() => setActiveTab(i)}
                    className={`px-5 py-2 rounded-xl text-sm font-syne font-semibold transition-all duration-300 ${activeTab === i
                        ? "bg-white/10 text-white border border-white/10"
                        : "text-white/30 hover:text-white/60"
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Skill Bars */}
              <div className="flex flex-col gap-5">
                {active.skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="font-dm text-sm text-white/70">
                        {skill.name}
                      </span>
                      <span className="font-syne text-sm font-bold text-white/40">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${colorMap[active.color]} transition-all duration-700`}
                        style={{
                          width: `${skill.level}%`,
                          transitionDelay: `${i * 80}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Tech Bubbles */}
            <div>
              <p className="font-syne font-semibold text-white/50 text-sm mb-6 uppercase tracking-widest">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, i) => (
                  <span
                    key={tech}
                    className={`px-4 py-2 rounded-full text-sm font-dm glass border transition-all duration-300 hover:scale-105 hover:shadow-glow1 cursor-default ${i % 3 === 0
                        ? borderMap["accent1"]
                        : i % 3 === 1
                          ? borderMap["accent2"]
                          : borderMap["accent3"]
                      }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Fun stat */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { value: "2", label: "Projects Completed" },
                  { value: "2+", label: "Years Experience" },
                  { value: "5+", label: "Technologies" },
                  { value: "100%", label: "Passion" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="glass border border-white/5 rounded-2xl p-4 hover:border-accent1/20 transition-all duration-300"
                  >
                    <p className="font-syne text-2xl font-bold gradient-text">
                      {stat.value}
                    </p>
                    <p className="font-dm text-xs text-white/40 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;