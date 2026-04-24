"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAdmin } from "@/app/components/AdminProvider";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  tagColor: string;
  slug: string;
}

const defaultPosts: BlogPost[] = [
  {
    id: "glassmorphism-ui",
    title: "Building Futuristic UIs with Glassmorphism",
    excerpt:
      "Explore how glassmorphism design language is shaping the next generation of web interfaces with depth, blur and light.",
    date: "Mar 10, 2025",
    readTime: "5 min read",
    tag: "Design",
    tagColor: "accent3",
    slug: "glassmorphism-ui",
  },
  {
    id: "nextjs-vs-react",
    title: "Why I Chose Next.js Over Plain React",
    excerpt:
      "A deep dive into how Next.js server components, routing and performance optimizations make it the go-to framework for modern apps.",
    date: "Feb 22, 2025",
    readTime: "7 min read",
    tag: "Development",
    tagColor: "accent1",
    slug: "nextjs-vs-react",
  },
  {
    id: "open-source-journey",
    title: "My Journey Into Open Source",
    excerpt:
      "How contributing to open source projects helped me grow as a developer, improve my code quality and connect with the community.",
    date: "Jan 15, 2025",
    readTime: "4 min read",
    tag: "Career",
    tagColor: "accent2",
    slug: "open-source-journey",
  },
  {
    id: "typescript-tips",
    title: "TypeScript Tips That Changed How I Code",
    excerpt:
      "Practical TypeScript patterns and tricks I wish I knew earlier — from generics to utility types and beyond.",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    tag: "TypeScript",
    tagColor: "accent1",
    slug: "typescript-tips",
  },
];

const colorTag: Record<string, string> = {
  accent1: "border-accent1/30 text-accent1",
  accent2: "border-accent2/30 text-accent2",
  accent3: "border-accent3/30 text-accent3",
};

const colorLine: Record<string, string> = {
  accent1: "from-accent1 to-accent2",
  accent2: "from-accent2 to-accent3",
  accent3: "from-accent3 to-accent1",
};

const TAG_COLORS = ["accent1", "accent2", "accent3"];
const STORAGE_KEY = "portfolio_blogs";

const Blog = () => {
  const { isAdmin } = useAdmin();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    tag: "",
    readTime: "",
    tagColor: "accent1",
  });

  // Load posts from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPosts(JSON.parse(stored));
      } catch {
        setPosts(defaultPosts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
      }
    } else {
      setPosts(defaultPosts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
    }
  }, []);

  const savePosts = useCallback((updated: BlogPost[]) => {
    setPosts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const handleAdd = () => {
    if (!formData.title.trim()) return;
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: formData.title,
      excerpt: formData.excerpt,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: formData.readTime || "3 min read",
      tag: formData.tag || "General",
      tagColor: formData.tagColor,
      slug: formData.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    };
    savePosts([newPost, ...posts]);
    setShowModal(false);
    setFormData({ title: "", excerpt: "", tag: "", readTime: "", tagColor: "accent1" });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this blog post?")) {
      savePosts(posts.filter((p) => p.id !== id));
    }
  };

  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-dm tracking-widest uppercase text-white/30 mb-3">
            Thoughts & Writings
          </p>
          <h2 className="font-syne text-4xl md:text-5xl font-bold">
            Latest{" "}
            <span className="gradient-text">Blog Posts</span>
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-accent1 to-accent2 mx-auto" />
        </div>

        {/* Admin: Add Button */}
        {isAdmin && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => {
                setFormData({ title: "", excerpt: "", tag: "", readTime: "", tagColor: "accent1" });
                setShowModal(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass border border-accent2/30 text-accent2 text-sm font-syne hover:border-accent2/60 transition-all duration-300"
            >
              <span className="text-lg leading-none">+</span> Add Post
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <article
              key={post.id}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`glass border border-white/5 rounded-2xl p-7 flex flex-col gap-4 cursor-pointer transition-all duration-300 group relative ${
                hovered === i
                  ? "border-white/10 scale-[1.01]"
                  : ""
              }`}
            >
              {/* Admin Delete */}
              {isAdmin && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-white/30 hover:text-red-400 hover:border-red-400/40 transition-all duration-300 text-xs z-10"
                  title="Delete"
                >
                  ✕
                </button>
              )}

              {/* Top row */}
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-dm glass border ${colorTag[post.tagColor] || colorTag.accent1}`}
                >
                  {post.tag}
                </span>
                <div className="flex items-center gap-3 text-xs font-dm text-white/30">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-syne text-lg font-bold text-white group-hover:gradient-text transition-all duration-300 leading-snug">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="font-dm text-sm text-white/40 leading-relaxed flex-1">
                {post.excerpt}
              </p>

              {/* Read more */}
              <div className="flex items-center gap-2 mt-auto">
                <span
                  className={`h-px w-6 bg-gradient-to-r ${colorLine[post.tagColor] || colorLine.accent1} transition-all duration-300 group-hover:w-10`}
                />
                <span className="text-xs font-syne font-semibold text-white/30 group-hover:text-white/60 transition-all duration-300 tracking-widest uppercase">
                  Read More
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <a
            href="https://www.linkedin.com/in/rutansh-govardhan-9592b932a"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full glass border border-white/10 hover:border-accent1/30 font-syne text-sm text-white/50 hover:text-white transition-all duration-300"
          >
            View All Posts
            <span className="text-accent2">→</span>
          </a>
        </div>

      </div>

      {/* Add Post Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative glass border border-white/10 rounded-3xl p-8 w-full max-w-lg mx-4 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-syne font-bold text-xl text-white">Add New Post</h3>
              <button onClick={() => setShowModal(false)} className="text-white/30 hover:text-white/60 transition-colors text-lg">✕</button>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Blog post title"
                className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description of the post"
                rows={3}
                className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent resize-none"
              />
            </div>

            {/* Tag & Read Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">Tag</label>
                <input
                  type="text"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="Design, Dev..."
                  className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">Read Time</label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="5 min read"
                  className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent"
                />
              </div>
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

            {/* Submit */}
            <button
              onClick={handleAdd}
              className="glow-btn w-full py-3 rounded-full text-sm font-syne mt-2"
            >
              Publish Post →
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
