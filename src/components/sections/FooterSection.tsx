"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FOOTER_FOCUS_NAV, FOOTER_DATA } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/motion/tokens";
import { registerScrollTrigger, gsap } from "@/lib/motion/gsap";



interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
  phase: number;
  phaseSpeed: number;
  sparkleTimer: number;
  isSparkling: boolean;
  sparkleLife: number;
}

/**
 * Luminous signature with subtle warm champagne-gold glow, soft mist aura,
 * and drifting glowing dust particles with occasional delicate sparkles.
 */
function LuminousSignature({
  name,
  reducedMotion,
}: {
  name: string;
  reducedMotion: boolean;
}) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const PALETTE = [
      "rgba(255, 250, 240,", // warm white / ivory
      "rgba(246, 222, 175,", // soft champagne-gold
      "rgba(235, 205, 150,", // gentle gold
      "rgba(255, 245, 230,", // luminous white
    ];

    const count = 18;
    const particles: DustParticle[] = [];

    for (let i = 0; i < count; i++) {
      const colorBase = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      particles.push({
        x: Math.random() * (width || 200),
        y: Math.random() * (height || 40),
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.06 - Math.random() * 0.12,
        radius: 0.5 + Math.random() * 0.9,
        baseAlpha: 0.25 + Math.random() * 0.45,
        color: colorBase,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.012 + Math.random() * 0.018,
        sparkleTimer: 60 + Math.random() * 240,
        isSparkling: false,
        sparkleLife: 0,
      });
    }

    if (reducedMotion) {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.save();
        ctx.shadowColor = `${p.color}0.6)`;
        ctx.shadowBlur = 4;
        ctx.fillStyle = `${p.color}${p.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      return;
    }

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const p = particles[i];

        p.x += p.vx + Math.sin(p.phase) * 0.08;
        p.y += p.vy;
        p.phase += p.phaseSpeed;

        p.sparkleTimer--;
        if (p.sparkleTimer <= 0) {
          p.isSparkling = true;
          p.sparkleLife = 24 + Math.floor(Math.random() * 20);
          p.sparkleTimer = 180 + Math.random() * 320;
        }

        let currentAlpha = p.baseAlpha * (0.75 + Math.sin(p.phase) * 0.25);
        let currentRadius = p.radius;

        if (p.isSparkling) {
          p.sparkleLife--;
          const sparkleProgress = Math.sin((p.sparkleLife / 30) * Math.PI);
          currentAlpha = Math.min(1, currentAlpha + sparkleProgress * 0.5);
          currentRadius += sparkleProgress * 0.5;
          if (p.sparkleLife <= 0) {
            p.isSparkling = false;
          }
        }

        if (p.y < -4) {
          p.y = height + 4;
          p.x = Math.random() * width;
        } else if (p.y > height + 4) {
          p.y = -4;
          p.x = Math.random() * width;
        }

        if (p.x < -4) {
          p.x = width + 4;
        } else if (p.x > width + 4) {
          p.x = -4;
        }

        ctx.save();
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.shadowBlur = p.isSparkling ? 6 : 3;
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        if (p.isSparkling && currentAlpha > 0.6) {
          ctx.strokeStyle = `${p.color}${currentAlpha * 0.75})`;
          ctx.lineWidth = 0.5;
          const flareLen = currentRadius * 2.2;
          ctx.beginPath();
          ctx.moveTo(p.x - flareLen, p.y);
          ctx.lineTo(p.x + flareLen, p.y);
          ctx.moveTo(p.x, p.y - flareLen);
          ctx.lineTo(p.x, p.y + flareLen);
          ctx.stroke();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion]);

  return (
    <span
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-flex items-center justify-center px-1.5 py-0.5 -mx-1.5 group cursor-default"
    >
      {/* 1. Soft glowing mist aura directly behind the name */}
      <span
        aria-hidden="true"
        className={`absolute -inset-x-3 -inset-y-2 pointer-events-none select-none rounded-full blur-md transition-opacity duration-1000 ${
          isHovered ? "opacity-90" : "opacity-60"
        } ${reducedMotion ? "animate-none" : "animate-mist-breathe"}`}
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(246, 222, 175, 0.22) 0%, rgba(220, 185, 130, 0.08) 50%, transparent 80%)",
        }}
      />

      {/* 2. Micro canvas for drifting luminous dust motes */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute -inset-x-5 -inset-y-3 w-[calc(100%+2.5rem)] h-[calc(100%+1.5rem)] pointer-events-none select-none z-[1]"
      />

      {/* 3. Luminous crisp text with breathing warm-gold glow */}
      <span
        className={`relative z-[2] font-medium tracking-[0.2em] transition-all duration-700 ${
          reducedMotion ? "animate-none" : "animate-name-glow"
        }`}
        style={{
          color: "#fffcf7",
          textShadow:
            "0 0 10px rgba(255, 248, 235, 0.65), 0 0 20px rgba(246, 218, 160, 0.35), 0 0 35px rgba(230, 190, 125, 0.15)",
        }}
      >
        {name}
      </span>
    </span>
  );
}

export function FooterSection() {
  const footerRef = useRef<HTMLElement | null>(null);
  const upperRuleRef = useRef<HTMLDivElement | null>(null);
  const topNavRef = useRef<HTMLDivElement | null>(null);
  const identityRef = useRef<HTMLDivElement | null>(null);
  const identityTextRef = useRef<HTMLHeadingElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const utilityRef = useRef<HTMLDivElement | null>(null);
  const returnTopBtnRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Subtle and restrained editorial reveal sequence:
  // 1. footer upper rule -> 2. navigation/identity -> 3. supporting info -> 4. bottom utility row -> 5. Return to Top
  useEffect(() => {
    if (reducedMotion) {
      [upperRuleRef, topNavRef, identityRef, infoRef, utilityRef, returnTopBtnRef].forEach((ref) => {
        if (ref.current) {
          ref.current.style.opacity = "1";
          ref.current.style.transform = "none";
        }
      });
      return;
    }

    const ScrollTrigger = registerScrollTrigger();
    const footer = footerRef.current;
    if (!ScrollTrigger || !footer) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 82%",
          toggleActions: "play none none none",
          once: true,
          onEnter: () => {
            gsap.delayedCall(1.2, () => {
              if (identityTextRef.current) {
                gsap.to(identityTextRef.current, {
                  y: 3,
                  duration: 3,
                  ease: "sine.inOut",
                  repeat: -1,
                  yoyo: true,
                });
              }
            });
          },
        },
      });

      // 1. Footer upper rule
      if (upperRuleRef.current) {
        tl.fromTo(
          upperRuleRef.current,
          { opacity: 0, scaleX: 0.85, transformOrigin: "left center" },
          { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.out" }
        );
      }

      // 2. Navigation & Identity
      if (topNavRef.current) {
        tl.fromTo(
          topNavRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );
      }

      if (identityRef.current) {
        tl.fromTo(
          identityRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );
      }

      // 3. Supporting information (Institutional statement + authentic GitHub link)
      if (infoRef.current) {
        tl.fromTo(
          infoRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.35"
        );
      }

      // 4. Bottom utility row
      if (utilityRef.current) {
        tl.fromTo(
          utilityRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );
      }

      // 5. Return to Top
      if (returnTopBtnRef.current) {
        tl.fromTo(
          returnTopBtnRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
          "-=0.2"
        );
      }
    }, footer);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleReturnToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });

    const hero = document.getElementById("hero") || document.documentElement;
    hero.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });

    setTimeout(() => {
      const h1 = document.querySelector("h1");
      if (h1) {
        h1.setAttribute("tabindex", "-1");
        h1.focus({ preventScroll: true });
      }
    }, 400);
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      aria-label="Site Footer and Architectural Index"
      className="relative w-full pt-16 sm:pt-24 lg:pt-32 pb-20 sm:pb-28 lg:pb-32 text-white select-none overflow-hidden"
    >
      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col">
        {/* 1. FOOTER UPPER RULE */}
        <div
          ref={upperRuleRef}
          aria-hidden="true"
          className="w-full border-t border-white/[0.08] mb-10 sm:mb-14 will-change-transform"
        />

        {/* 2. NAVIGATION AREA: Focus Navigation with Generous Negative Space */}
        <div ref={topNavRef} className="will-change-transform mb-10 sm:mb-14">
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6 sm:gap-10 lg:gap-14">
            {FOOTER_FOCUS_NAV.map((item) => {
              const targetId = item.href.replace("#", "");
              const handleFooterNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                const target = document.getElementById(targetId);
                if (target) {
                  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
                  target.focus({ preventScroll: true });
                }
              };
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleFooterNavClick}
                  className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors focus-visible:outline-sky-400 py-1"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* STRONG IDENTITY / WORDMARK */}
        <div ref={identityRef} className="will-change-transform mb-8 sm:mb-12 flex items-center gap-4 sm:gap-6 lg:gap-8">
          <Image
            src="/images/jit-acm-logo.png"
            alt="JIT ACM Logo"
            width={96}
            height={96}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain shrink-0"
          />
          <h2
            ref={identityTextRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-white select-none leading-none"
          >
            JIT ACM
          </h2>
        </div>

        {/* Directional Hairline 1: Resolves from the LEFT */}
        <div
          aria-hidden="true"
          className="w-full max-w-[85%] border-t border-white/[0.10] mr-auto mb-10 sm:mb-14"
        />

        {/* 3. SUPPORTING INFORMATION AREA (Institutional Statement & Mission) */}
        <div
          ref={infoRef}
          className="will-change-transform flex flex-col md:flex-row md:items-start justify-between gap-10 lg:gap-16 mb-12 sm:mb-16"
        >
          {/* Institutional Statement & Mission */}
          <div className="space-y-3 max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white font-medium">
              {FOOTER_DATA.wordmark}
            </p>
            <p className="text-base sm:text-lg font-light tracking-tight text-white/90 uppercase leading-snug">
              {FOOTER_DATA.tagline}
            </p>
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-white/60 leading-relaxed pt-1">
              {FOOTER_DATA.institutionalNote}
            </p>
          </div>
        </div>

        {/* Directional Hairline 2: Resolves from the RIGHT */}
        <div
          aria-hidden="true"
          className="w-full max-w-[90%] border-t border-white/[0.10] ml-auto mb-10 sm:mb-12"
        />

        {/* 4. BOTTOM UTILITY ROW: © JIT ACM + Return to Top */}
        <div
          ref={utilityRef}
          className="will-change-transform flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/55"
        >
          {/* Left: Small Copyright */}
          <span>{FOOTER_DATA.copyright}</span>

          {/* Right: Small Quiet Return to Top Control */}
          <button
            ref={returnTopBtnRef}
            type="button"
            onClick={handleReturnToTop}
            aria-label="Return to top of page"
            className="group inline-flex items-center gap-2 uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors focus-visible:outline-sky-400 cursor-pointer py-1"
          >
            <span
              className="text-sky-400 group-hover:-translate-y-0.5 transition-transform"
              aria-hidden="true"
            >
              ↑
            </span>
            <span>RETURN TO TOP</span>
          </button>
        </div>

        {/* 5. REFINED WEBMASTER CREDIT: Luminous Signature with Glowing Dust Effect */}
        <div className="pt-6 sm:pt-8 border-t border-white/[0.06] mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/40">
          <div className="flex items-center gap-2">
            <LuminousSignature name="Pranjali Santani" reducedMotion={reducedMotion} />
            <span className="text-white/25 select-none" aria-hidden="true">·</span>
            <span className="text-white/50">Webmaster</span>
          </div>
          <div className="flex items-center gap-2 text-[9px] text-white/30 tracking-[0.22em]">
            <Image
              src="/images/jit-acm-logo.png"
              alt="JIT ACM"
              width={14}
              height={14}
              className="w-3.5 h-3.5 object-contain opacity-60"
            />
            <span>JIT ACM STUDENT CHAPTER</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
