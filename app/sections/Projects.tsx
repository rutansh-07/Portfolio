"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAdmin } from "@/app/components/AdminProvider";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  tagColor: string;
}

const TAG_COLORS = ["accent1", "accent2", "accent3"];

const defaultProjects: Project[] = [
  {
    id: "arcade",
    title: "ARCADE",
    description: "An innovative project showcasing modern development practices and cutting-edge technology.",
    techStack: ["React", "Node.js", "AI"],
    githubUrl: "https://github.com/rutansh-07",
    liveUrl: "",
    tagColor: "accent1",
  },
  {
    id: "tab-orchestrator",
    title: "Tab-Orchestrator",
    description: "A Chrome extension for smart tab management with focus mode, theme toggle, and intelligent tab grouping.",
    techStack: ["JavaScript", "Chrome APIs", "HTML/CSS"],
    githubUrl: "https://github.com/rutansh-07",
    liveUrl: "",
    tagColor: "accent2",
  },
];

const colorMap: Record<string, { border: string; text: string; bg: string; line: string }> = {
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

const STORAGE_KEY = "portfolio_projects";

const Projects = () => {
  const { isAdmin } = useAdmin();
  const [projects, setProjects] = useState<Project[]>([]);
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
  });

  // Load projects from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch {
        setProjects(defaultProjects);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
      }
    } else {
      setProjects(defaultProjects);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
    }
  }, []);

  const saveProjects = useCallback((updated: Project[]) => {
    setProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({ title: "", description: "", techStack: "", githubUrl: "", liveUrl: "", tagColor: "accent1" });
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
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) return;

    const techArr = formData.techStack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingProject) {
      // Edit existing
      const updated = projects.map((p) =>
        p.id === editingProject.id
          ? { ...p, title: formData.title, description: formData.description, techStack: techArr, githubUrl: formData.githubUrl, liveUrl: formData.liveUrl, tagColor: formData.tagColor }
          : p
      );
      saveProjects(updated);
    } else {
      // Add new
      const newProject: Project = {
        id: `project-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        techStack: techArr,
        githubUrl: formData.githubUrl,
        liveUrl: formData.liveUrl,
        tagColor: formData.tagColor,
      };
      saveProjects([...projects, newProject]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) {
      saveProjects(projects.filter((p) => p.id !== id));
    }
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

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const colors = colorMap[project.tagColor] || colorMap.accent1;
            return (
              <article
                key={project.id}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`glass border border-white/5 rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 group relative ${
                  hovered === i ? "border-white/10 scale-[1.01]" : ""
                }`}
              >
                {/* Admin Controls */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                    <button
                      onClick={() => openEditModal(project)}
                      className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-white/30 hover:text-accent1 hover:border-accent1/40 transition-all duration-300 text-xs"
                      title="Edit"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
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
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                  {!project.githubUrl && !project.liveUrl && (
                    <div className="flex items-center gap-2">
                      <span className={`h-px w-6 bg-gradient-to-r ${colors.line} transition-all duration-300 group-hover:w-10`} />
                      <span className="text-xs font-syne font-semibold text-white/30 group-hover:text-white/60 transition-all duration-300 tracking-widest uppercase">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative glass border border-white/10 rounded-3xl p-8 w-full max-w-lg mx-4 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-syne font-bold text-xl text-white">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-white/30 hover:text-white/60 transition-colors text-lg">✕</button>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project name"
                className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="What does this project do?"
                rows={3}
                className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent resize-none"
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">Tech Stack (comma-separated)</label>
              <input
                type="text"
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                placeholder="React, Node.js, TypeScript"
                className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">GitHub URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent"
              />
            </div>

            {/* Live URL */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">Live URL (optional)</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://..."
                className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent"
              />
            </div>

            {/* Tag Color */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">Accent Color</label>
              <div className="flex gap-3">
                {TAG_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setFormData({ ...formData, tagColor: color })}
                    className={`w-10 h-10 rounded-xl border-2 transition-all duration-300 ${
                      color === "accent1" ? "bg-accent1/20" : color === "accent2" ? "bg-accent2/20" : "bg-accent3/20"
                    } ${
                      formData.tagColor === color
                        ? color === "accent1" ? "border-accent1" : color === "accent2" ? "border-accent2" : "border-accent3"
                        : "border-white/10"
                    }`}
                  />
                ))}
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
