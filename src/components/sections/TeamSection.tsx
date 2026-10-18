"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { TEAM_MEMBERS } from "@/content/team";
import { ALUMNI_MEMBERS } from "@/content/alumni";
import { MemberItem, AlumniItem, MemberLink } from "@/types";
import { usePrefersReducedMotion } from "@/lib/motion/tokens";

function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46V10.9M7.85 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function findLink(links: MemberLink[] | undefined, kind: "github" | "linkedin"): string | undefined {
  return links?.find((link) => link.label.toLowerCase().includes(kind))?.url;
}

/**
 * Single Member Profile Block (Equal visual weight, compact, unique DOM instance)
 */
function MemberCard({
  member,
  onLinkClick,
}: {
  member: MemberItem;
  onLinkClick?: (e: React.MouseEvent) => void;
}) {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(member.name);
  const githubUrl = findLink(member.links, "github");
  const linkedinUrl = findLink(member.links, "linkedin");

  const linkHitAreaStyle = {
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties;

  const showPhoto = Boolean(member.photo && !member.placeholder && !imageError);

  return (
    <div className="flex flex-col min-w-[130px] max-w-[170px] w-full sm:min-w-[150px] md:min-w-[170px] shrink-0 select-none group">
      {/* Compact Portrait Frame with solid dark backdrop preventing particle bleed-through */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#0d0f14] border border-white/[0.08] group-hover:border-white/20 transition-colors duration-300 mb-2 sm:mb-2.5 flex items-center justify-center">
        {showPhoto ? (
          <Image
            src={member.photo!}
            alt={member.name}
            fill
            unoptimized
            draggable={false}
            className="object-cover select-none pointer-events-none"
            sizes="(max-width: 640px) 130px, (max-width: 768px) 150px, 170px"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/[0.12] bg-white/[0.04] flex items-center justify-center font-mono text-xs sm:text-sm font-light tracking-[0.14em] text-white/90">
            {initials}
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="text-xs sm:text-sm font-medium tracking-tight text-white leading-snug truncate">
        {member.name}
      </h3>

      {/* Designation / Role */}
      <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.10em] text-white/55 mt-0.5 leading-tight truncate">
        {member.role}
      </p>

      {/* Social Links */}
      {(linkedinUrl || githubUrl) && (
        <div className="flex items-center gap-2.5 mt-1.5 text-white/40">
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onLinkClick}
              aria-label={`${member.name} on LinkedIn`}
              className="hover:text-white transition-colors focus-visible:outline-sky-400"
              style={linkHitAreaStyle}
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onLinkClick}
              aria-label={`${member.name} on GitHub`}
              className="hover:text-white transition-colors focus-visible:outline-sky-400"
              style={linkHitAreaStyle}
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// Combined roster: TEAM_MEMBERS + ALUMNI_MEMBERS
const ALUMNI_AS_MEMBERS: MemberItem[] = ALUMNI_MEMBERS.map((alumnus: AlumniItem) => ({
  id: alumnus.id,
  name: alumnus.name,
  role: alumnus.formerRole,
  bio: alumnus.contributions,
  photo: alumnus.photo,
  links: alumnus.links,
  placeholder: false,
}));

const ALL_PEOPLE: MemberItem[] = [...TEAM_MEMBERS, ...ALUMNI_AS_MEMBERS];

export function TeamSection() {
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastShifts = useRef<number[]>([]);

  // Carousel layout metrics
  const metrics = useRef<{
    cardWidth: number;
    pitch: number;
    totalWidth: number;
    baseOffsets: number[];
  }>({
    cardWidth: 170,
    pitch: 190,
    totalWidth: 13 * 190,
    baseOffsets: [],
  });

  // Continuous unified horizontal coordinate (increases as cards drift leftwards)
  const scrollPos = useRef<number>(0);

  // Interaction & momentum state
  const isDragging = useRef<boolean>(false);
  const isInteracting = useRef<boolean>(false);
  const isHovering = useRef<boolean>(false);
  const dragStartX = useRef<number>(0);
  const dragStartY = useRef<number>(0);
  const dragStartScrollPos = useRef<number>(0);
  const lastDragX = useRef<number>(0);
  const lastDragTime = useRef<number>(0);
  const momentumVel = useRef<number>(0);
  const hasMoved = useRef<boolean>(false);
  const isHorizontalDrag = useRef<boolean>(false);
  const isVerticalScroll = useRef<boolean>(false);
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Measure card sizes, pitch, and offsets directly from the DOM
  const updateMetrics = useCallback(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length < 2) return;

    const cardWidth = cards[0].offsetWidth || 170;
    const firstOffset = cards[0].offsetLeft;
    const secondOffset = cards[1].offsetLeft;
    const pitch = secondOffset - firstOffset || (cardWidth + 20);
    const totalWidth = cards.length * pitch;
    const baseOffsets = cards.map((c) => c.offsetLeft);

    metrics.current = {
      cardWidth,
      pitch,
      totalWidth,
      baseOffsets,
    };
  }, []);

  // Update carousel positions: translates main track and recycles cards that exit the left edge
  const renderCarousel = useCallback(() => {
    const { cardWidth, pitch, totalWidth, baseOffsets } = metrics.current;
    if (!trackRef.current || totalWidth <= 0 || baseOffsets.length === 0) return;

    const s = scrollPos.current;

    // Move track smoothly
    trackRef.current.style.transform = `translate3d(${-s}px, 0, 0)`;

    // Seamless recycling: when a card exits the left boundary, recycle it to the right end
    // without duplicating DOM cards or creating visual gaps
    const minPos = -(cardWidth + (pitch - cardWidth));

    for (let i = 0; i < cardRefs.current.length; i++) {
      const card = cardRefs.current[i];
      if (!card) continue;

      const baseOffset = baseOffsets[i] ?? (i * pitch);
      const unshiftedPos = baseOffset - s;

      // Wrap visual coordinate smoothly into [minPos, minPos + totalWidth)
      const relPos = unshiftedPos - minPos;
      const wrappedRelPos = ((relPos % totalWidth) + totalWidth) % totalWidth;
      const targetVisualPos = wrappedRelPos + minPos;

      const shift = targetVisualPos - unshiftedPos;

      if (lastShifts.current[i] !== shift) {
        lastShifts.current[i] = shift;
        card.style.transform = shift !== 0 ? `translate3d(${shift}px, 0, 0)` : "";
      }
    }
  }, []);

  // Pause helper with auto-resume after idle delay
  const pauseAutoScrollTemporarily = useCallback((idleDelayMs = 1500) => {
    isInteracting.current = true;
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
    }
    resumeTimeout.current = setTimeout(() => {
      isInteracting.current = false;
    }, idleDelayMs);
  }, []);

  // Main continuous animation loop with delta-time constant speed
  useEffect(() => {
    updateMetrics();
    renderCarousel();

    let animId: number;
    let lastTime: number | null = null;
    const baseSpeed = 34; // Constant smooth drift speed (px/sec)

    const tick = (time: number) => {
      if (lastTime === null) lastTime = time;
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Inertial momentum decay after user release
      if (Math.abs(momentumVel.current) > 0.1) {
        scrollPos.current += momentumVel.current;
        momentumVel.current *= 0.94;
        renderCarousel();
      } else {
        momentumVel.current = 0;
        // Continuous forward movement in one direction
        if (!isDragging.current && !isInteracting.current && !isHovering.current && !reducedMotion) {
          scrollPos.current += baseSpeed * dt;
          renderCarousel();
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    // ResizeObserver to recalibrate on breakpoint changes, font loading, or orientation change
    const ro = new ResizeObserver(() => {
      updateMetrics();
      lastShifts.current = [];
      renderCarousel();
    });

    if (trackRef.current) {
      ro.observe(trackRef.current);
    }

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    };
  }, [reducedMotion, renderCarousel, updateMetrics]);

  // Pointer Down (Desktop mouse click-and-drag start)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    // Mobile touches are handled via touch listeners to avoid pointer capture gesture conflicts
    if (e.pointerType === "touch") return;

    isDragging.current = true;
    isInteracting.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);

    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    dragStartScrollPos.current = scrollPos.current;
    lastDragX.current = e.clientX;
    lastDragTime.current = performance.now();
    momentumVel.current = 0;
    hasMoved.current = false;
    isHorizontalDrag.current = false;
    isVerticalScroll.current = false;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture not supported
    }
  };

  // Pointer Move (Desktop mouse drag with direction locking)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || isVerticalScroll.current) return;

    const dx = e.clientX - dragStartX.current;
    const dy = e.clientY - dragStartY.current;

    // Direction locking: If vertical delta dominates, immediately yield to normal vertical page scroll
    if (!isHorizontalDrag.current && !isVerticalScroll.current) {
      if (Math.abs(dy) > 7 && Math.abs(dy) > Math.abs(dx)) {
        isVerticalScroll.current = true;
        isDragging.current = false;
        pauseAutoScrollTemporarily(1000);
        return;
      }
      if (Math.abs(dx) > 6) {
        isHorizontalDrag.current = true;
      }
    }

    if (isHorizontalDrag.current) {
      hasMoved.current = true;
      const now = performance.now();
      const dt = now - lastDragTime.current;
      if (dt > 0) {
        const instantSpeed = -((e.clientX - lastDragX.current) / dt) * 16.6;
        momentumVel.current = Math.min(Math.max(instantSpeed, -24), 24);
      }
      lastDragX.current = e.clientX;
      lastDragTime.current = now;

      scrollPos.current = dragStartScrollPos.current - dx;
      renderCarousel();
    }
  };

  // Pointer Up / Cancel
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    pauseAutoScrollTemporarily(1500);

    // Suppress clicks on member links for a brief moment after dragging
    setTimeout(() => {
      hasMoved.current = false;
    }, 120);
  };

  // Touch Handlers (Mobile touch-based horizontal swipe with vertical scroll protection)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    isInteracting.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);

    dragStartX.current = e.touches[0].clientX;
    dragStartY.current = e.touches[0].clientY;
    dragStartScrollPos.current = scrollPos.current;
    lastDragX.current = e.touches[0].clientX;
    lastDragTime.current = performance.now();
    momentumVel.current = 0;
    hasMoved.current = false;
    isHorizontalDrag.current = false;
    isVerticalScroll.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1 || isVerticalScroll.current) return;

    const dx = e.touches[0].clientX - dragStartX.current;
    const dy = e.touches[0].clientY - dragStartY.current;

    // Direction locking: If vertical delta dominates, yield immediately to normal browser page scroll
    if (!isHorizontalDrag.current && !isVerticalScroll.current) {
      if (Math.abs(dy) > 7 && Math.abs(dy) > Math.abs(dx)) {
        isVerticalScroll.current = true;
        pauseAutoScrollTemporarily(1000);
        return;
      }
      if (Math.abs(dx) > 6) {
        isHorizontalDrag.current = true;
      }
    }

    if (isHorizontalDrag.current) {
      hasMoved.current = true;
      const now = performance.now();
      const dt = now - lastDragTime.current;
      if (dt > 0) {
        const instantSpeed = -((e.touches[0].clientX - lastDragX.current) / dt) * 16.6;
        momentumVel.current = Math.min(Math.max(instantSpeed, -24), 24);
      }
      lastDragX.current = e.touches[0].clientX;
      lastDragTime.current = now;

      scrollPos.current = dragStartScrollPos.current - dx;
      renderCarousel();
    }
  };

  const handleTouchEnd = () => {
    pauseAutoScrollTemporarily(1500);
    setTimeout(() => {
      hasMoved.current = false;
    }, 120);
  };

  // Hover handlers to pause auto-movement while reading cards
  const handleMouseEnter = () => {
    isHovering.current = true;
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
  };

  // Trackpad / Shift-Wheel horizontal scroll handler
  const handleWheel = (e: React.WheelEvent) => {
    // If trackpad horizontal scroll or user holding Shift
    if (Math.abs(e.deltaX) > 0 || (e.shiftKey && Math.abs(e.deltaY) > 0)) {
      const delta = Math.abs(e.deltaX) > 0 ? e.deltaX : e.deltaY;
      scrollPos.current += delta;
      renderCarousel();
      pauseAutoScrollTemporarily(1500);
    }
  };

  // Keyboard navigation for accessible horizontal scrolling
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      pauseAutoScrollTemporarily(2000);
      scrollPos.current -= 180;
      renderCarousel();
    } else if (e.key === "ArrowRight") {
      pauseAutoScrollTemporarily(2000);
      scrollPos.current += 180;
      renderCarousel();
    }
  };

  const handleFocus = () => {
    pauseAutoScrollTemporarily(3000);
  };

  // Prevent link click when user has been dragging
  const handleLinkClick = (e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section
      id="team"
      aria-label="People: Team and Alumni Roster"
      className="relative w-full text-white bg-transparent py-10 sm:py-16 lg:py-20 select-none overflow-hidden"
    >
      <span id="people" className="sr-only" aria-hidden="true" />
      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col mb-6 sm:mb-8">
        {/* Clean PEOPLE Header (Member-count label removed) */}
        <div className="border-b border-white/[0.08] pb-3">
          <h2 className="text-xs sm:text-sm font-mono tracking-[0.24em] uppercase text-white/80 font-medium">
            PEOPLE
          </h2>
        </div>
      </div>

      {/* Single Horizontal Row: Seamless Continuous Circular Loop (Unique Members Only, No Clones) */}
      <div className="relative w-full max-w-full min-w-0 overflow-hidden select-none">
        {/* Lateral gradient edge fade masks */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"
        />

        {/* Scrollable Track with Continuous Circular Loop + Manual Drag/Touch/Wheel */}
        <div
          role="region"
          aria-label="Team Members Roster"
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className="w-full min-w-0 max-w-full overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing px-6 sm:px-10 lg:px-12 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400/50"
        >
          <div
            ref={trackRef}
            className="flex items-start gap-3 sm:gap-4 md:gap-5 w-max shrink-0 py-1 will-change-transform"
          >
            {ALL_PEOPLE.map((member, idx) => (
              <div
                key={member.id || `member-${idx}`}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="shrink-0 will-change-transform"
              >
                <MemberCard
                  member={member}
                  onLinkClick={handleLinkClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
