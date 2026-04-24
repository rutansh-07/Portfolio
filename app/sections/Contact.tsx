
"use client";

import React from "react";

const Contact = () => {
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

        {/* Contact Info */}
        <div className="max-w-xl mx-auto flex flex-col gap-5">

          <p className="font-dm text-white/50 text-lg leading-relaxed text-center mb-4">
            Have a project in mind, want to collaborate, or just want to say hi?
            Feel free to reach out!
          </p>

          {/* Email */}
          <a
            href="mailto:rutanshgovardhan07@gmail.com"
            className="flex items-center gap-5 glass border border-white/5 rounded-2xl px-6 py-5 transition-all duration-300 group hover:border-accent1/40 hover:shadow-glow1"
          >
            <span className="w-12 h-12 rounded-xl bg-accent1/10 border border-accent1/20 flex items-center justify-center text-accent1 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
              </svg>
            </span>
            <div>
              <p className="font-syne text-xs font-semibold text-white/30 uppercase tracking-widest">
                Email
              </p>
              <p className="font-dm text-base text-white/60 group-hover:text-white transition-all duration-300 mt-0.5">
                rutanshgovardhan07@gmail.com
              </p>
            </div>
            <span className="ml-auto text-white/20 group-hover:text-white/50 transition-all duration-300 text-lg">
              →
            </span>
          </a>

          {/* Mobile */}
          <a
            href="tel:+91 9327016966"
            className="flex items-center gap-5 glass border border-white/5 rounded-2xl px-6 py-5 transition-all duration-300 group hover:border-accent2/40 hover:shadow-glow2"
          >
            <span className="w-12 h-12 rounded-xl bg-accent2/10 border border-accent2/20 flex items-center justify-center text-accent2 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </span>
            <div>
              <p className="font-syne text-xs font-semibold text-white/30 uppercase tracking-widest">
                Mobile
              </p>
              <p className="font-dm text-base text-white/60 group-hover:text-white transition-all duration-300 mt-0.5">
                +91 9327016966
              </p>
            </div>
            <span className="ml-auto text-white/20 group-hover:text-white/50 transition-all duration-300 text-lg">
              →
            </span>
          </a>

        </div>

        {/* Availability badge */}
        <div className="flex justify-center mt-10">
          <div className="inline-flex items-center gap-3 px-5 py-3 glass border border-accent2/20 rounded-2xl">
            <span className="w-2 h-2 rounded-full bg-accent2 animate-pulse-slow" />
            <span className="font-dm text-sm text-white/50">
              Currently available for freelance &amp; internships
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;