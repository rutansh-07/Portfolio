"use client";

import React, { useState } from "react";

const experiences = [
  {
    type: "Education",
    title: "B.Tech in Computer Science",
    org: "Your University Name",
    period: "2022 — Present",
    description:
      "Pursuing a degree in Computer Science with a focus on software engineering, algorithms, and modern web technologies.",
    tags: ["DSA", "OS", "DBMS", "Networking"],
    color: "accent1",
  },
  {
    type: "Project",
    title: "Full Stack Web App",
    org: "Personal Project",
    period: "2023",
    description:
      "Built and deployed a full stack application using Next.js, Node.js and PostgreSQL. Implemented authentication, REST APIs and responsive UI.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Vercel"],
    color: "accent2",
  },
  {
    type: "Achievement",
    title: "Open Source Contributor",
    org: "GitHub",
    period: "2023 — Present",
    description:
      "Actively contributing to open source projects. Raised multiple PRs, fixed bugs and added features to community repositories.",
    tags: ["Git", "GitHub", "Collaboration"],
    color: "accent3",
  },
  {
    type: "Certification",
    title: "React & Next.js Mastery",
    org: "Online Platform",
    period: "2023",
    description:
      "Completed an advanced course on React ecosystem including hooks, context, server components and full stack Next.js development.",
    tags: ["React", "Next.js", "TypeScript"],
    color: "accent1",
  },
];

const colorBorder: Record<string, string> = {
  accent1: "border-accent1/40",
  accent2: "border-accent2/40",
  accent3: "border-accent3/40",
};

const colorDot: Record<string, string> = {
  accent1: "bg-accent1 shadow-glow1",
  accent2: "bg-accent2 shadow-glow2",
  accent3: "bg-accent3 shadow-glow3",
};

const colorText: Record<string, string> = {
  accent1: "text-accent1",
  accent2: "text-accent2",
  accent3: "text-accent3",
};

const colorTag: Record<string, string> = {
  accent1: "border-accent1/20 text-accent1/70",
  accent2: "border-accent2/20 text-accent2/70",
  accent3: "border-accent3/20 text-accent3/70",
};

const Experience = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-dm tracking-widest uppercase text-white/30 mb-3">
            My Journey
          </p>
          <h2 className="font-syne text-4xl md:text-5xl font-bold">
            Experience &{" "}
            <span className="gradient-text-alt">Timeline</span>
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-accent2 to-accent3 mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent1/30 via-accent2/30 to-accent3/30 -translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`relative flex items-start gap-8 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-5/12 glass border rounded-2xl p-6 transition-all duration-300 cursor-default ${
                      colorBorder[exp.color]
                    } ${
                      hovered === i
                        ? "scale-[1.02] border-opacity-60"
                        : "border-opacity-20"
                    } ${isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}
                  >
                    {/* Type badge */}
                    <span
                      className={`text-xs font-syne font-semibold tracking-widest uppercase ${colorText[exp.color]}`}
                    >
                      {exp.type}
                    </span>

                    <h3 className="font-syne text-lg font-bold text-white mt-1">
                      {exp.title}
                    </h3>

                    <div className="flex items-center gap-3 mt-1 mb-3">
                      <span className="font-dm text-sm text-white/40">
                        {exp.org}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="font-dm text-sm text-white/30">
                        {exp.period}
                      </span>
                    </div>

                    <p className="font-dm text-sm text-white/50 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs font-dm glass border ${colorTag[exp.color]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dot on timeline */}
                  <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 z-10">
                    <div
                      className={`w-3 h-3 rounded-full border-2 border-bgprimary ${colorDot[exp.color]} transition-all duration-300 ${
                        hovered === i ? "scale-150" : ""
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;