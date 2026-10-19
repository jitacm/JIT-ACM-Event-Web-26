"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Diamond } from "@/components/ui/Diamond";
import { Hairline } from "@/components/ui/Hairline";
import { usePrefersReducedMotion } from "@/lib/motion/tokens";
import { registerScrollTrigger, gsap } from "@/lib/motion/gsap";

const COMMUNITY_PILLARS = [
  "01 · PRACTICAL ENGINEERING",
  "02 · TECHNICAL WORKSHOPS",
  "03 · OPEN SOURCE",
  "04 · PEER MENTORSHIP",
];

export function OpeningSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const editorialRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const pillarsRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Subtle interactive parallax response to cursor movements
  useEffect(() => {
    if (reducedMotion || !containerRef.current || !editorialRef.current) return;
    const isPaused = document.documentElement.getAttribute("data-motion") === "paused";
    if (isPaused) return;

    const setX = gsap.quickTo(editorialRef.current, "x", { duration: 0.8, ease: "power2.out" });
    const setY = gsap.quickTo(editorialRef.current, "y", { duration: 0.8, ease: "power2.out" });

    const handlePointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;
      setX(nx * 8);
      setY(ny * 6);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion]);

  useEffect(() => {
    // If reduced motion is requested or motion is paused, ensure hero is immediately fully visible
    if (reducedMotion || (typeof document !== "undefined" && document.documentElement.getAttribute("data-motion") === "paused")) {
      const elements = [metaRef.current, titleRef.current, contentRef.current, ctaRef.current, pillarsRef.current, containerRef.current];
      elements.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, clearProps: "opacity,transform" });
      });
      return;
    }

    const ctx = gsap.context(() => {
      let hasRevealed = false;
      let failsafeTimer: NodeJS.Timeout | null = null;

      const playReveal = () => {
        if (hasRevealed) return;
        hasRevealed = true;

        const elements = [metaRef.current, titleRef.current, contentRef.current, ctaRef.current, pillarsRef.current];

        // Failsafe: guarantee all hero text elements are 100% visible after at most 2.5s
        failsafeTimer = setTimeout(() => {
          elements.forEach((el) => {
            if (el) gsap.set(el, { opacity: 1, clearProps: "opacity,transform" });
          });
        }, 2500);

        // Cinematic editorial entrance
        const tl = gsap.timeline({
          delay: 0.1,
          onComplete: () => {
            if (failsafeTimer) clearTimeout(failsafeTimer);
            elements.forEach((el) => {
              if (el) gsap.set(el, { opacity: 1, clearProps: "opacity,transform" });
            });
          },
        });

        if (metaRef.current) {
          tl.fromTo(
            metaRef.current,
            { opacity: 0, y: -12 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
          );
        }

        if (titleRef.current) {
          tl.fromTo(
            titleRef.current,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.4"
          );
        }

        if (contentRef.current) {
          tl.fromTo(
            contentRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.5"
          );
        }

        if (ctaRef.current) {
          tl.fromTo(
            ctaRef.current,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
            "-=0.4"
          );
        }

        if (pillarsRef.current) {
          tl.fromTo(
            pillarsRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
            "-=0.4"
          );
        }
      };

      // Check whether opening overlay is active
      const isOpeningActive =
        typeof document !== "undefined" &&
        document.documentElement.getAttribute("data-opening") === "1";

      if (isOpeningActive) {
        // Wait until opening experience completes or is dismissed
        const handleOpeningComplete = () => {
          playReveal();
        };

        window.addEventListener("acm:opening-complete", handleOpeningComplete, { once: true });

        // MutationObserver fallback watching for data-opening removal
        const observer = new MutationObserver(() => {
          if (document.documentElement.getAttribute("data-opening") !== "1") {
            observer.disconnect();
            playReveal();
          }
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-opening"] });

        // Maximum wait safety timeout (overlay duration is max 9.0s)
        const openingTimeout = setTimeout(() => {
          observer.disconnect();
          playReveal();
        }, 9500);

        // Store cleanup handles
        return () => {
          window.removeEventListener("acm:opening-complete", handleOpeningComplete);
          observer.disconnect();
          clearTimeout(openingTimeout);
          if (failsafeTimer) clearTimeout(failsafeTimer);
        };
      } else {
        // No opening overlay — reveal immediately on normal page load / refresh
        playReveal();
      }

      // Spatial scroll choreography: Home gently recedes into depth as scroll begins
      const ScrollTrigger = registerScrollTrigger();
      if (ScrollTrigger && containerRef.current) {
        gsap.to(containerRef.current, {
          y: -90,
          scale: 0.94,
          opacity: 0,
          ease: "power1.in",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "15% top",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        // Ensure ScrollTrigger coordinates update accurately after fonts, images, and layout settle
        const refreshST = () => {
          ScrollTrigger.refresh();
        };

        if (typeof document !== "undefined" && "fonts" in document) {
          document.fonts.ready.then(refreshST).catch(() => {});
        }

        if (typeof window !== "undefined") {
          if (document.readyState === "complete") {
            requestAnimationFrame(refreshST);
          } else {
            window.addEventListener("load", refreshST, { once: true });
          }
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="JIT ACM Student Chapter Introduction"
      className="relative w-full min-h-[92svh] sm:min-h-[100svh] flex flex-col justify-between pt-28 sm:pt-32 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-16 text-white overflow-hidden will-change-transform"
    >
      <span id="opening" className="sr-only" aria-hidden="true" />
      <div className="w-full max-w-[1440px] mx-auto flex flex-col justify-between flex-1 relative">
        {/* Top Meta Line: Chapter Identity */}
        <div
          ref={metaRef}
          className="flex items-center justify-between font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-white/50 border-b border-white/[0.14] pb-5 relative z-10"
        >
          <div className="flex items-center gap-3">
            <Image
              src="/images/jit-acm-logo.png"
              alt="JIT ACM Student Chapter Logo"
              width={28}
              height={28}
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0"
              priority
            />
            <span className="text-white/90 font-medium">JIT ACM STUDENT CHAPTER</span>
          </div>
          <div className="flex items-center gap-2 text-sky-300/80 text-[10px] sm:text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">ACTIVE CHAPTER</span>
          </div>
        </div>

        {/* Main Editorial Core with Deep Negative Space and Balanced Rhythm */}
        <div 
          ref={editorialRef}
          className="relative z-10 my-auto py-10 sm:py-16 lg:py-20 max-w-5xl transition-transform duration-300 ease-out will-change-transform"
        >
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-[0.24em] text-sky-300/80 mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <Diamond size={5} filled={true} className="text-sky-400" />
            <span>STUDENT CHAPTER OF THE ACM</span>
          </div>

          {/* <h1> JIT ACM Student Chapter </h1> */}
          <h1
            ref={titleRef}
            aria-label="JIT ACM Student Chapter"
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-light tracking-tight text-white leading-[1.0] mb-6 select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
            style={{ fontWeight: 300 }}
          >
            JIT ACM
            <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-sky-200/90 font-light mt-2 sm:mt-3 tracking-normal">
              Student Chapter
            </span>
          </h1>

          {/* Authoritative Primary Statement */}
          <div ref={contentRef} className="space-y-4 max-w-3xl drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-light text-white/95 leading-[1.2] tracking-tight uppercase">
              Advancing Computing. Building People.
            </h2>

            <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
              The official ACM student chapter at JIT. Fostering computational curiosity, engineering rigor, and collaborative innovation across disciplines.
            </p>
          </div>

          {/* Primary & Secondary Calls to Action (CTAs) */}
          <div
            ref={ctaRef}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4 relative z-10"
          >
            <a
              href="#events"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById("events");
                if (target) {
                  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
                  target.focus({ preventScroll: true });
                }
              }}
              className="px-6 py-3 rounded-full font-mono text-xs uppercase tracking-[0.16em] font-medium bg-white text-black hover:bg-sky-200 transition-all duration-200 shadow-[0_0_24px_rgba(255,255,255,0.2)] hover:shadow-[0_0_28px_rgba(56,189,248,0.4)] inline-flex items-center gap-2 cursor-pointer focus-visible:outline-white"
            >
              <span>Explore Events</span>
              <span>→</span>
            </a>

            <a
              href="#team"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById("team");
                if (target) {
                  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
                  target.focus({ preventScroll: true });
                }
              }}
              className="px-6 py-3 rounded-full font-mono text-xs uppercase tracking-[0.16em] font-medium border border-white/25 bg-black/60 text-white/90 hover:text-white hover:border-white/60 hover:bg-white/[0.08] transition-all duration-200 inline-flex items-center gap-2 cursor-pointer focus-visible:outline-white"
            >
              <span>Meet the Team</span>
            </a>

            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById("projects");
                if (target) {
                  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
                  target.focus({ preventScroll: true });
                }
              }}
              className="px-5 py-3 rounded-full font-mono text-xs uppercase tracking-[0.16em] text-white/60 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer focus-visible:outline-white"
            >
              <span>Our Projects ↗</span>
            </a>
          </div>

          {/* Four Community Pillar Badges */}
          <div
            ref={pillarsRef}
            className="mt-10 sm:mt-12 pt-6 border-t border-white/[0.10] flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-[0.18em] text-white/50 relative z-10"
          >
            {COMMUNITY_PILLARS.map((pillar) => (
              <div key={pillar} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400/60" />
                <span className="hover:text-white transition-colors">{pillar}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Scroll Anchor & Hairline */}
        <div className="pt-6 relative z-10">
          <Hairline orientation="horizontal" className="mb-6" />
          <div className="flex items-center justify-between font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-white/50">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById("about");
                if (target) {
                  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
                  target.focus({ preventScroll: true });
                }
              }}
              className="flex items-center gap-2 hover:text-white transition-colors py-2 focus-visible:outline-white group"
            >
              <Diamond size={5} filled={false} />
              <span className="group-hover:translate-y-0.5 transition-transform text-white/80 group-hover:text-white">
                EXPLORE CHAPTER ↓
              </span>
            </a>
            <div className="flex items-center gap-3 text-white/40">
              <span className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
              <span className="hidden md:inline-block">JIT ACM STUDENT CHAPTER · ADVANCING COMPUTING</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
