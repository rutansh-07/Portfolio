"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAdmin } from "@/app/components/AdminProvider";
import { db } from "@/app/lib/firebase";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
  query,
  orderBy,
} from "firebase/firestore";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  tagColor: string;
  isSurprise?: boolean;
  order: number;
}

const TAG_COLORS = ["accent1", "accent2", "accent3"];

const defaultProjects: Project[] = [
  {
    id: "arcade",
    title: "ARCADE",
    description:
      "An innovative project showcasing modern development practices and cutting-edge technology.",
    techStack: ["React", "Node.js", "AI"],
    githubUrl: "https://github.com/rutansh-07",
    liveUrl: "",
    tagColor: "accent1",
    isSurprise: false,
    order: 0,
  },
  {
    id: "tab-orchestrator",
    title: "Tab-Orchestrator",
    description:
      "A Chrome extension for smart tab management with focus mode, theme toggle, and intelligent tab grouping.",
    techStack: ["JavaScript", "Chrome APIs", "HTML/CSS"],
    githubUrl: "https://github.com/rutansh-07",
    liveUrl: "",
    tagColor: "accent2",
    isSurprise: false,
    order: 1,
  },
  {
    id: "mystery-project",
    title: "Next Big Thing",
    description:
      "Shhh! This is a top-secret project currently in stealth mode. Stay tuned for the big reveal!",
    techStack: ["Next.js", "Three.js", "WASM"],
    githubUrl: "",
    liveUrl: "",
    tagColor: "accent3",
    isSurprise: true,
    order: 2,
  },
];

const colorMap: Record<
  string,
  { border: string; text: string; bg: string; line: string }
> = {
  accent1: {
    border: "border-accent1/30",
    text: "text-accent1",
    bg: "bg-accent1/10",
    line: "from-accent1 to-accent2",
  },
  accent2: {
    border: "border-accent2/30",
    text: "text-accent2",
    bg: "bg-accent2/10",
    line: "from-accent2 to-accent3",
  },
  accent3: {
    border: "border-accent3/30",
    text: "text-accent3",
    bg: "bg-accent3/10",
    line: "from-accent3 to-accent1",
  },
};

const COLLECTION = "projects";

const Projects = () => {
  const { isAdmin } = useAdmin();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
    tagColor: "accent1",
    isSurprise: false,
  });
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [seeded, setSeeded] = useState(false);

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ── Seed default projects into Firestore if collection is empty ──────
  const seedDefaults = useCallback(async () => {
    if (seeded) return;
    setSeeded(true);
    const batch = writeBatch(db);
    defaultProjects.forEach((p) => {
      const ref = doc(db, COLLECTION, p.id);
      batch.set(ref, p);
    });
    await batch.commit();
  }, [seeded]);

  // ── Real-time listener — updates ALL visitors instantly ──────────────
  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy("order"));
    const unsub = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // First ever load — seed defaults
        seedDefaults();
      } else {
        const data = snapshot.docs.map((d) => ({
          ...(d.data() as Project),
          id: d.id,
        }));
        setProjects(data);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [seedDefaults]);

  // ── Admin: save (add or edit) a project to Firestore ────────────────
  const handleSave = async () => {
    if (!formData.title.trim()) return;

    const techArr = formData.techStack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingProject) {
      const ref = doc(db, COLLECTION, editingProject.id);
      await setDoc(
        ref,
        {
          title: formData.title,
          description: formData.description,
          techStack: techArr,
          githubUrl: formData.githubUrl,
          liveUrl: formData.liveUrl,
          tagColor: formData.tagColor,
          isSurprise: formData.isSurprise,
          order: editingProject.order,
        },
        { merge: true }
      );
    } else {
      const newId = `project-${Date.now()}`;
      const ref = doc(db, COLLECTION, newId);
      await setDoc(ref, {
        id: newId,
        title: formData.title,
        description: formData.description,
        techStack: techArr,
        githubUrl: formData.githubUrl,
        liveUrl: formData.liveUrl,
        tagColor: formData.tagColor,
        isSurprise: formData.isSurprise,
        order: projects.length,
      });
    }
    setShowModal(false);
  };

  // ── Admin: delete a project from Firestore ───────────────────────────
  const handleDelete = async (id: string) => {
    if (confirm("Delete this project?")) {
      await deleteDoc(doc(db, COLLECTION, id));
    }
  };

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      techStack: "",
      githubUrl: "",
      liveUrl: "",
      tagColor: "accent1",
      isSurprise: false,
    });
    setShowModal(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(", "),
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      tagColor: project.tagColor,
      isSurprise: !!project.isSurprise,
    });
    setShowModal(true);
  };

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-dm tracking-widest uppercase text-white/30 mb-3">
            What I&apos;ve Built
          </p>
          <h2 className="font-syne text-4xl md:text-5xl font-bold">
            Featured{" "}
            <span className="gradient-text">Projects</span>
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-accent1 to-accent2 mx-auto" />
        </div>

        {/* Admin: Add Button */}
        {isAdmin && (
          <div className="flex justify-center mb-8">
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass border border-accent2/30 text-accent2 text-sm font-syne hover:border-accent2/60 transition-all duration-300"
            >
              <span className="text-lg leading-none">+</span> Add Project
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="glass border border-white/5 rounded-2xl p-7 h-52 animate-pulse"
              />
            ))}
          </div>
        ) : (
          /* Grid */
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => {
              const colors = colorMap[project.tagColor] || colorMap.accent1;
              return (
                <article
                  key={project.id}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`glass border border-white/5 rounded-2xl p-7 flex flex-col gap-4 transition-all duration-500 group relative overflow-hidden ${
                    hovered === i ? "border-white/10 scale-[1.01]" : ""
                  }`}
                >
                  {/* Surprise Cover */}
                  {project.isSurprise && !revealedIds.has(project.id) && (
                    <div
                      onClick={() => toggleReveal(project.id)}
                      className="absolute inset-0 z-20 cursor-pointer flex flex-col items-center justify-center bg-bgprimary/95 backdrop-blur-xl transition-all duration-700 group-hover:bg-bgprimary/90"
                    >
                      {/* Pulsing Glow */}
                      <div
                        className={`absolute w-32 h-32 rounded-full ${colors.bg} blur-[50px] opacity-20 animate-pulse`}
                      />

                      <div
                        className={`relative w-24 h-24 rounded-full flex items-center justify-center glass border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_40px_rgba(255,255,255,0.05)]`}
                      >
                        {/* Rotating Ring */}
                        <div
                          className={`absolute inset-0 rounded-full border-2 border-dashed ${colors.border} opacity-20 animate-spin-slow`}
                        />
                        <span className="text-4xl font-syne font-bold gradient-text">
                          ?
                        </span>
                      </div>

                      <p className="font-syne text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 group-hover:text-white/60 transition-colors">
                        Secret Project
                      </p>
                      <p className="font-dm text-[9px] text-white/20 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to unlock
                      </p>
                    </div>
                  )}

                  {/* Reveal Animation (Confetti) */}
                  {revealedIds.has(project.id) && (
                    <div className="absolute inset-0 pointer-events-none z-10">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className={`absolute w-1 h-1 rounded-full ${
                              i % 4 === 0
                                ? colors.text
                                : i % 4 === 1
                                ? "bg-accent1"
                                : i % 4 === 2
                                ? "bg-accent2"
                                : "bg-accent3"
                            }`}
                            style={{
                              top: "50%",
                              left: "50%",
                              opacity: 0,
                              animation: `explode 0.8s ease-out forwards`,
                              animationDelay: `${Math.random() * 0.2}s`,
                              "--tx": `${(Math.random() - 0.5) * 400}px`,
                              "--ty": `${(Math.random() - 0.5) * 400}px`,
                              "--rot": `${Math.random() * 360}deg`,
                            } as React.CSSProperties}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content (scale up on reveal) */}
                  <div
                    className={`flex flex-col gap-4 flex-1 transition-all duration-700 ${
                      project.isSurprise && !revealedIds.has(project.id)
                        ? "scale-95 opacity-0 pointer-events-none"
                        : "scale-100 opacity-100"
                    }`}
                  >
                    {/* Admin Controls */}
                    {isAdmin && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 z-30">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(project);
                          }}
                          className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-white/30 hover:text-accent1 hover:border-accent1/40 transition-all duration-300 text-xs"
                          title="Edit"
                        >
                          ✎
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(project.id);
                          }}
                          className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-white/30 hover:text-red-400 hover:border-red-400/40 transition-all duration-300 text-xs"
                          title="Delete"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="font-syne text-xl font-bold text-white group-hover:gradient-text transition-all duration-300 leading-snug pr-20">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="font-dm text-sm text-white/40 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 rounded-full text-xs font-dm glass border ${colors.border} ${colors.text}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 mt-auto pt-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-syne font-semibold text-white/30 hover:text-white/70 transition-all duration-300 tracking-widest uppercase"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-syne font-semibold text-white/30 hover:text-white/70 transition-all duration-300 tracking-widest uppercase"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                          </svg>
                          Live Demo
                        </a>
                      )}
                      {!project.githubUrl && !project.liveUrl && (
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-px w-6 bg-gradient-to-r ${colors.line} transition-all duration-300 group-hover:w-10`}
                          />
                          <span className="text-xs font-syne font-semibold text-white/30 group-hover:text-white/60 transition-all duration-300 tracking-widest uppercase">
                            Coming Soon
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative glass border border-white/10 rounded-3xl p-8 w-full max-w-lg mx-4 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-syne font-bold text-xl text-white">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/30 hover:text-white/60 transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Project name"
                className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="What does this project do?"
                rows={3}
                className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent resize-none"
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">
                Tech Stack (comma-separated)
              </label>
              <input
                type="text"
                value={formData.techStack}
                onChange={(e) =>
                  setFormData({ ...formData, techStack: e.target.value })
                }
                placeholder="React, Node.js, TypeScript"
                className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                placeholder="https://github.com/..."
                className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent"
              />
            </div>

            {/* Live URL */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">
                Live URL (optional)
              </label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) =>
                  setFormData({ ...formData, liveUrl: e.target.value })
                }
                placeholder="https://..."
                className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent"
              />
            </div>

            {/* Tag Color + Surprise toggle */}
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">
                  Accent Color
                </label>
                <div className="flex gap-3">
                  {TAG_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        setFormData({ ...formData, tagColor: color })
                      }
                      className={`w-10 h-10 rounded-xl border-2 transition-all duration-300 ${
                        color === "accent1"
                          ? "bg-accent1/20"
                          : color === "accent2"
                          ? "bg-accent2/20"
                          : "bg-accent3/20"
                      } ${
                        formData.tagColor === color
                          ? color === "accent1"
                            ? "border-accent1"
                            : color === "accent2"
                            ? "border-accent2"
                            : "border-accent3"
                          : "border-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">
                  Surprise Mode
                </label>
                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      isSurprise: !formData.isSurprise,
                    })
                  }
                  className={`px-4 py-2 rounded-xl border font-syne text-xs transition-all duration-300 ${
                    formData.isSurprise
                      ? "bg-accent1/20 border-accent1 text-accent1"
                      : "glass border-white/10 text-white/30"
                  }`}
                >
                  {formData.isSurprise ? "ON ✨" : "OFF"}
                </button>
              </div>
            </div>

            {/* Save */}
            <button
              onClick={handleSave}
              className="glow-btn w-full py-3 rounded-full text-sm font-syne mt-2"
            >
              {editingProject ? "Save Changes →" : "Add Project →"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
