"use client";

import { useEffect, useState } from "react";

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"drawing" | "fadeout">("drawing");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fadeout"), 2200);
    const doneTimer = setTimeout(() => onComplete(), 2700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-opacity duration-500 ${
        phase === "fadeout" ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Background glow blob */}
      <div
        className="absolute rounded-full"
        style={{
          width: "400px",
          height: "200px",
          background:
            "radial-gradient(ellipse, rgba(100,160,255,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative flex flex-col items-center gap-8">
        <svg
          viewBox="0 0 400 200"
          style={{ width: "min(85vw, 380px)", height: "auto" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Silver gradient along stroke */}
            <linearGradient
              id="silverGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%"   stopColor="#6080c0" />
              <stop offset="15%"  stopColor="#90b8f0" />
              <stop offset="30%"  stopColor="#c8dcff" />
              <stop offset="50%"  stopColor="#ffffff" />
              <stop offset="70%"  stopColor="#c8dcff" />
              <stop offset="85%"  stopColor="#90b8f0" />
              <stop offset="100%" stopColor="#6080c0" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Outer glow filter */}
            <filter id="outerGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
              </feMerge>
            </filter>

            {/* Dot glow */}
            <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Sparkle radial */}
            <radialGradient id="sparkle" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#6090ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/*
            Perfect lemniscate (infinity) path:
            Center: 200, 100
            Right loop center: 290, 100
            Left loop center: 110, 100
          */}
          {/* Outer glow path */}
      {/* Outer glow path */}
<path
  d="M 200,100 C 215,60 270,30 300,60 C 330,90 330,110 300,140 C 270,170 215,140 200,100 C 185,60 130,30 100,60 C 70,90 70,110 100,140 C 130,170 185,140 200,100 Z"
  stroke="rgba(80,140,255,0.4)"
  strokeWidth="14"
  strokeLinecap="round"
  fill="none"
  filter="url(#outerGlow)"
  style={{
    strokeDasharray: 900,
    strokeDashoffset: 900,
    animation: "drawInfinity 2s cubic-bezier(0.4,0,0.2,1) forwards",
  }}
/>

{/* Mid glow path */}
<path
  d="M 200,100 C 215,60 270,30 300,60 C 330,90 330,110 300,140 C 270,170 215,140 200,100 C 185,60 130,30 100,60 C 70,90 70,110 100,140 C 130,170 185,140 200,100 Z"
  stroke="rgba(140,180,255,0.5)"
  strokeWidth="6"
  strokeLinecap="round"
  fill="none"
  filter="url(#glow)"
  style={{
    strokeDasharray: 900,
    strokeDashoffset: 900,
    animation: "drawInfinity 2s cubic-bezier(0.4,0,0.2,1) forwards",
    animationDelay: "0.05s",
  }}
/>

{/* Main silver path */}
<path
  d="M 200,100 C 215,60 270,30 300,60 C 330,90 330,110 300,140 C 270,170 215,140 200,100 C 185,60 130,30 100,60 C 70,90 70,110 100,140 C 130,170 185,140 200,100 Z"
  stroke="url(#silverGrad)"
  strokeWidth="2.5"
  strokeLinecap="round"
  fill="none"
  filter="url(#glow)"
  style={{
    strokeDasharray: 900,
    strokeDashoffset: 900,
    animation: "drawInfinity 2s cubic-bezier(0.4,0,0.2,1) forwards",
    animationDelay: "0.08s",
  }}
/>

          {/* Moving bright dot */}
          <circle r="6" fill="white" filter="url(#dotGlow)">
            <animateMotion
  dur="2s"
  begin="0s"
  fill="freeze"
  calcMode="spline"
  keyTimes="0;1"
  keySplines="0.4 0 0.2 1"
  path="M 200,100 C 215,60 270,30 300,60 C 330,90 330,110 300,140 C 270,170 215,140 200,100 C 185,60 130,30 100,60 C 70,90 70,110 100,140 C 130,170 185,140 200,100 Z"
/>
          </circle>

          {/* Sparkle particles around path */}
          {[
            { cx: 330, cy: 100, d: "0.4s" },
            { cx: 70,  cy: 100, d: "0.8s" },
            { cx: 280, cy: 50,  d: "0.6s" },
            { cx: 120, cy: 50,  d: "1.0s" },
            { cx: 280, cy: 150, d: "1.2s" },
            { cx: 120, cy: 150, d: "1.4s" },
            { cx: 200, cy: 55,  d: "1.6s" },
            { cx: 200, cy: 145, d: "1.8s" },
          ].map((s, i) => (
            <circle
              key={i}
              cx={s.cx}
              cy={s.cy}
              r="2"
              fill="white"
              filter="url(#dotGlow)"
              style={{
                opacity: 0,
                animation: `sparkleAnim 0.6s ease forwards`,
                animationDelay: s.d,
              }}
            />
          ))}
        </svg>

        {/* Name */}
        <p
          className="font-syne tracking-[0.5em] uppercase text-xs"
          style={{
            color: "#90b8f0",
            opacity: 0,
            animation: "fadeInText 0.5s ease forwards",
            animationDelay: "1.2s",
          }}
        >
          Rutansh
        </p>
      </div>

      <style>{`
        @keyframes drawInfinity {
          0%   { stroke-dashoffset: 900; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes fadeInText {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: scale(0); }
          50%  { opacity: 1; transform: scale(1.5); }
          100% { opacity: 0; transform: scale(0); }
        }
      `}</style>
    </div>
  );
};

export default Loader;