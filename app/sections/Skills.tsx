"use client";

import React, { useState } from "react";

const skillCategories = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma", "Framer Motion"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma", "REST APIs"],
  },
  {
    label: "Tools & Others",
    skills: ["Git", "Docker", "Linux", "Vercel", "Redis", "GraphQL"],
  },
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-dm tracking-widest uppercase text-white/30 mb-3">
            What I work with
          </p>
          <h2 className="font-syne text-4xl md:text-5xl font-bold">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-accent1 to-accent2 mx-auto" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl glass border border-white/10 gap-2">
            {skillCategories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-2.5 rounded-xl text-sm font-syne font-bold transition-all duration-500 ${
                  activeTab === i
                    ? "bg-white/10 text-white shadow-lg border border-white/10"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {skillCategories[activeTab].skills.map((skill, i) => (
            <div
              key={skill}
              className="group relative"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="glass border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-500 group-hover:border-accent1/30 group-hover:bg-white/10 group-hover:scale-[1.02] h-full">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-accent1 transition-colors duration-500">
                  <span className="text-lg font-bold font-syne">{skill[0]}</span>
                </div>
                <span className="font-dm text-sm text-white/50 group-hover:text-white transition-colors duration-500">
                  {skill}
                </span>
                
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent1/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;