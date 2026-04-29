"use client";

import React, { useState, useRef } from "react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/rutansh-07",
    color: "hover:text-white hover:border-white/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/rutansh-govardhan",
    color: "hover:text-[#0a66c2] hover:border-[#0a66c2]/40",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    color: "hover:text-white hover:border-white/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

type FormState = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    // Simulate async submit (replace with real API call)
    await new Promise((r) => setTimeout(r, 1800));
    setFormState("success");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--theme-accent1), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--theme-accent2), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-dm tracking-widest uppercase text-white/30 mb-3">
            Let&apos;s Connect
          </p>
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-white">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-accent1 to-accent2 mx-auto" />
          <p className="font-dm text-white/40 text-base mt-5 max-w-md mx-auto leading-relaxed">
            Have a project in mind, want to collaborate, or just want to say
            hi? I&apos;d love to hear from you.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* ── Left: Info Panel ── */}
          <div className="flex flex-col gap-6">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 glass rounded-2xl w-fit">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: "var(--theme-accent2)" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ backgroundColor: "var(--theme-accent2)" }}
                />
              </span>
              <span className="font-dm text-sm text-white/60">
                Currently available for freelance &amp; internships
              </span>
            </div>

            {/* Contact cards */}
            <div className="flex flex-col gap-4">
              {/* Email */}
              <a
                href="mailto:rutanshgovardhan07@gmail.com"
                className="group flex items-center gap-5 glass rounded-2xl px-6 py-5 transition-all duration-300 hover:shadow-glow1"
                style={
                  {
                    "--tw-shadow-color": "var(--theme-glow)",
                  } as React.CSSProperties
                }
              >
                <span
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background:
                      "color-mix(in srgb, var(--theme-accent1) 12%, transparent)",
                    border:
                      "1px solid color-mix(in srgb, var(--theme-accent1) 25%, transparent)",
                    color: "var(--theme-accent1)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
                    />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="font-syne text-xs font-semibold text-white/30 uppercase tracking-widest mb-0.5">
                    Email
                  </p>
                  <p className="font-dm text-sm text-white/60 group-hover:text-white transition-colors duration-300 truncate">
                    rutanshgovardhan07@gmail.com
                  </p>
                </div>
                <span className="ml-auto text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300 text-lg shrink-0">
                  →
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+919327016966"
                className="group flex items-center gap-5 glass rounded-2xl px-6 py-5 transition-all duration-300 hover:shadow-glow2"
              >
                <span
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background:
                      "color-mix(in srgb, var(--theme-accent2) 12%, transparent)",
                    border:
                      "1px solid color-mix(in srgb, var(--theme-accent2) 25%, transparent)",
                    color: "var(--theme-accent2)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </span>
                <div>
                  <p className="font-syne text-xs font-semibold text-white/30 uppercase tracking-widest mb-0.5">
                    Phone
                  </p>
                  <p className="font-dm text-sm text-white/60 group-hover:text-white transition-colors duration-300">
                    +91 93270 16966
                  </p>
                </div>
                <span className="ml-auto text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300 text-lg shrink-0">
                  →
                </span>
              </a>

              {/* Location */}
              <div className="flex items-center gap-5 glass rounded-2xl px-6 py-5">
                <span
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "color-mix(in srgb, var(--theme-accent3) 12%, transparent)",
                    border:
                      "1px solid color-mix(in srgb, var(--theme-accent3) 25%, transparent)",
                    color: "var(--theme-accent3)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>
                <div>
                  <p className="font-syne text-xs font-semibold text-white/30 uppercase tracking-widest mb-0.5">
                    Location
                  </p>
                  <p className="font-dm text-sm text-white/60">
                    Gujarat, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              <p className="font-syne text-xs font-semibold text-white/30 uppercase tracking-widest">
                Find me on
              </p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`w-11 h-11 rounded-xl glass flex items-center justify-center text-white/40 transition-all duration-300 ${s.color} hover:-translate-y-1`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="glass rounded-3xl p-8 relative overflow-hidden">
            {/* Subtle inner gradient accent */}
            <div
              className="pointer-events-none absolute top-0 right-0 w-48 h-48 rounded-bl-full opacity-5"
              style={{
                background:
                  "radial-gradient(circle, var(--theme-accent1), transparent)",
              }}
            />

            {formState === "success" ? (
              <div className="flex flex-col items-center justify-center gap-5 h-full py-16 text-center">
                <span
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      "color-mix(in srgb, var(--theme-accent2) 15%, transparent)",
                    border:
                      "1px solid color-mix(in srgb, var(--theme-accent2) 30%, transparent)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-8 h-8"
                    style={{ color: "var(--theme-accent2)" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-syne text-xl font-bold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="font-dm text-white/50 text-sm">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </div>
                <button
                  onClick={() => setFormState("idle")}
                  className="font-dm text-xs text-white/40 hover:text-white/70 transition-colors duration-200 underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 relative z-10"
              >
                <div>
                  <h3 className="font-syne text-xl font-bold text-white mb-1">
                    Send a Message
                  </h3>
                  <p className="font-dm text-white/40 text-sm">
                    I typically reply within 24 hours.
                  </p>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="font-syne text-xs font-semibold text-white/40 uppercase tracking-widest"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Rutansh Govardhan"
                    className="w-full rounded-xl px-4 py-3 font-dm text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:ring-2"
                    style={{
                      background:
                        "color-mix(in srgb, var(--theme-textprimary) 4%, transparent)",
                      border:
                        "1px solid color-mix(in srgb, var(--theme-textprimary) 8%, transparent)",
                      // @ts-ignore
                      "--tw-ring-color":
                        "color-mix(in srgb, var(--theme-accent1) 40%, transparent)",
                    }}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="font-syne text-xs font-semibold text-white/40 uppercase tracking-widest"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl px-4 py-3 font-dm text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:ring-2"
                    style={{
                      background:
                        "color-mix(in srgb, var(--theme-textprimary) 4%, transparent)",
                      border:
                        "1px solid color-mix(in srgb, var(--theme-textprimary) 8%, transparent)",
                    }}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="font-syne text-xs font-semibold text-white/40 uppercase tracking-widest"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Hey Rutansh, I'd love to work with you on..."
                    className="w-full rounded-xl px-4 py-3 font-dm text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:ring-2 resize-none"
                    style={{
                      background:
                        "color-mix(in srgb, var(--theme-textprimary) 4%, transparent)",
                      border:
                        "1px solid color-mix(in srgb, var(--theme-textprimary) 8%, transparent)",
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="glow-btn w-full py-3.5 rounded-xl font-syne text-sm font-semibold tracking-wide flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === "loading" ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          d="M12 3v3m0 12v3M3 12h3m12 0h3"
                          opacity={0.3}
                        />
                        <path
                          strokeLinecap="round"
                          d="M12 3a9 9 0 010 18"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </>
                  )}
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