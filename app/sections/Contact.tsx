"use client";

import React, { useState } from "react";

const contactLinks = [
  {
    label: "Email",
    value: "rutansh@email.com",
    href: "mailto:rutanshgovardhan07@email.com",
    color: "accent1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/rutansh",
    href: "https://github.com/rutansh-07",
    color: "accent2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rutansh",
    href: "https://www.linkedin.com/in/rutansh-govardhan-9592b932a",
    color: "accent3",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const colorBorder: Record<string, string> = {
  accent1: "hover:border-accent1/40 hover:shadow-glow1",
  accent2: "hover:border-accent2/40 hover:shadow-glow2",
  accent3: "hover:border-accent3/40 hover:shadow-glow3",
};

const colorText: Record<string, string> = {
  accent1: "text-accent1",
  accent2: "text-accent2",
  accent3: "text-accent3",
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate send — replace with your actual API call (e.g., EmailJS or a Next.js API route)
    await new Promise((res) => setTimeout(res, 1500));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-dm tracking-widest uppercase text-white/30 mb-3">
            Let&apos;s Connect
          </p>
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-white">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-accent1 to-accent2 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left — Info */}
          <div className="flex flex-col gap-8">
            <p className="font-dm text-white/50 text-lg leading-relaxed">
              Have a project in mind, want to collaborate, or just want to say hi?
              My inbox is always open. I&apos;ll get back to you as soon as possible!
            </p>

            {/* Contact Links */}
            <div className="flex flex-col gap-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 glass border border-white/5 rounded-2xl px-5 py-4 transition-all duration-300 group ${colorBorder[link.color]}`}
                >
                  <span className={`${colorText[link.color]} transition-all duration-300`}>
                    {link.icon}
                  </span>
                  <div>
                    <p className="font-syne text-xs font-semibold text-white/30 uppercase tracking-widest">
                      {link.label}
                    </p>
                    <p className="font-dm text-sm text-white/60 group-hover:text-white transition-all duration-300">
                      {link.value}
                    </p>
                  </div>
                  <span className="ml-auto text-white/20 group-hover:text-white/50 transition-all duration-300 text-lg">
                    →
                  </span>
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 glass border border-accent2/20 rounded-2xl w-fit">
              <span className="w-2 h-2 rounded-full bg-accent2 animate-pulse-slow" />
              <span className="font-dm text-sm text-white/50">
                Currently available for freelance & internships
              </span>
            </div>
          </div>

          {/* Right — Form */}
          <div className="glass border border-white/5 rounded-3xl p-8 bg-white/[0.02]">
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-accent2/10 border border-accent2/30 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7 text-accent2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-syne text-xl font-bold text-white">
                  Message Sent!
                </h3>
                <p className="font-dm text-white/40 text-sm">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs font-syne text-accent1 hover:text-accent2 transition-colors duration-300 underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-syne font-semibold text-white/30 uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or just say hi..."
                    className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm font-dm text-white placeholder-white/20 focus:outline-none focus:border-accent1/40 transition-all duration-300 bg-transparent resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="glow-btn w-full py-3 rounded-full text-sm font-syne z-10 disabled:opacity-50 disabled:cursor-not-allowed text-white bg-accent1/80 hover:bg-accent1 transition-all"
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;