"use client";

import React, { useState } from "react";

const posts = [
  {
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

const Blog = () => {
  const [hovered, setHovered] = useState<number | null>(null);

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

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`glass border border-white/5 rounded-2xl p-7 flex flex-col gap-4 cursor-pointer transition-all duration-300 group ${
                hovered === i
                  ? "border-white/10 scale-[1.01]"
                  : ""
              }`}
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-dm glass border ${colorTag[post.tagColor]}`}
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
                  className={`h-px w-6 bg-gradient-to-r ${colorLine[post.tagColor]} transition-all duration-300 group-hover:w-10`}
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
            href="/blog"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full glass border border-white/10 hover:border-accent1/30 font-syne text-sm text-white/50 hover:text-white transition-all duration-300"
          >
            View All Posts
            <span className="text-accent2">→</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Blog;
