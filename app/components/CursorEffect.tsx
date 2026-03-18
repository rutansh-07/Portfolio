"use client";

import { useEffect, useRef, useState } from "react";

const CursorEffect = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animId: number;

    if (ringRef.current) ringRef.current.style.display = "block";
    if (dotRef.current) dotRef.current.style.display = "block";

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }

      const target = e.target as HTMLElement;
      const isHover = !!target.closest("a, button, [data-hover]");
      if (ringRef.current) {
        ringRef.current.style.width = isHover ? "48px" : "32px";
        ringRef.current.style.height = isHover ? "48px" : "32px";
        ringRef.current.style.borderColor = isHover
          ? "rgba(0, 229, 255, 0.8)"
          : "rgba(124, 106, 255, 0.5)";
        ringRef.current.style.backgroundColor = isHover
          ? "rgba(0, 229, 255, 0.05)"
          : "transparent";
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      if (ringRef.current) {
        const w = parseFloat(ringRef.current.style.width || "32");
        ringRef.current.style.transform = `translate(${ringX - w / 2}px, ${ringY - w / 2}px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border transition-[width,height,border-color,background-color] duration-200 hidden"
        style={{
          width: "32px",
          height: "32px",
          borderColor: "rgba(124, 106, 255, 0.5)",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent1 pointer-events-none z-[9999] hidden"
        style={{ willChange: "transform" }}
      />
    </>
  );
};

export default CursorEffect;