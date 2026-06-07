"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { assetPath } from "@/lib/asset-path";

/**
 * Hero with the Shaman intro film built into the CRT console.
 *
 * Three modes:
 *  - "poster"  — still poster + welcome copy + PRESS START (default; returning visitors)
 *  - "ambient" — muted, looping video plays as a living background on first visit,
 *                welcome copy still overlaid. A "DON'T SHOW AGAIN" toggle (ticked by
 *                default) persists to localStorage so it won't auto-open next time.
 *  - "feature" — PRESS START / unmute plays the film with sound + native controls,
 *                showing the NOW PLAYING chrome. Returns to "poster" when it ends.
 *
 * Browsers only allow autoplay while muted, so first-visit autoplay is always muted;
 * sound requires the PRESS START / unmute user gesture. Autoplay is skipped for users
 * who prefer reduced motion.
 */

const STORAGE_KEY = "shaman:intro-dismissed";
type Mode = "poster" | "ambient" | "feature";

export default function HeroIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<Mode>("poster");
  const [dontShowAgain, setDontShowAgain] = useState(true);

  // First-visit detection (client-only — localStorage/matchMedia aren't available during static export render).
  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!dismissed && !reduceMotion) setMode("ambient");
  }, []);

  // Persist the default-ticked toggle so the intro auto-opens once, then not again (untick to re-enable).
  useEffect(() => {
    if (dontShowAgain) localStorage.setItem(STORAGE_KEY, "1");
    else localStorage.removeItem(STORAGE_KEY);
  }, [dontShowAgain]);

  // Drive playback off the current mode.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (mode === "ambient") {
      video.muted = true;
      video.play().catch(() => setMode("poster")); // autoplay blocked → fall back to poster
    } else if (mode === "poster") {
      video.pause();
    }
  }, [mode]);

  const startFeature = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    setMode("feature");
    void video.play();
  };

  const handleEnded = () => {
    const video = videoRef.current;
    setMode("poster");
    if (video) video.currentTime = 0;
  };

  const playing = mode !== "poster";
  const statusText =
    mode === "feature" ? "NOW PLAYING" : mode === "ambient" ? "NOW PLAYING // MUTED" : "READY";

  return (
    <section className="w-full boot-reveal bg-surface-container-highest border-4 border-on-surface shadow-[8px_8px_0px_0px_rgb(var(--c-shadow))]">
      {/* Cartridge label plate */}
      <div className="bg-on-surface text-on-primary dark:bg-surface-container-highest dark:text-on-surface w-full p-2 font-label-sm text-label-sm text-center uppercase tracking-widest border-b-4 border-on-surface">
        CARTRIDGE // SHAMAN.INTRO
      </div>

      {/* CRT screen — stacked on mobile, overlaid on md+ */}
      <div className="relative hero-screen md:overflow-hidden">
        {/* Video / poster area */}
        <div className="relative">
          <video
            ref={videoRef}
            suppressHydrationWarning
            className="relative z-0 block w-full aspect-video bg-on-surface"
            poster={assetPath("/video/shaman-intro-poster.jpg")}
            preload="none"
            playsInline
            muted={mode !== "feature"}
            loop={mode === "ambient"}
            controls={mode === "feature"}
            onEnded={handleEnded}
          >
            <source src={assetPath("/video/shaman-intro.mp4")} type="video/mp4" />
          </video>

          {/* Mobile: fade from video into text area below */}
          {mode !== "feature" && (
            <div
              className="md:hidden absolute inset-0 pointer-events-none bg-gradient-to-t from-[#1c1b1b] via-transparent to-black/40"
              aria-hidden
            />
          )}
        </div>

        {/* Desktop: scanlines + scrim overlay */}
        {mode !== "feature" && (
          <>
            <div
              className="hidden md:block absolute inset-0 z-[5] pointer-events-none bg-gradient-to-t from-black/85 via-black/35 to-black/60"
              aria-hidden
            />
            <div
              className="hidden md:block absolute inset-0 z-10 terminal-scanlines pointer-events-none opacity-50"
              aria-hidden
            />
          </>
        )}

        {/* Welcome content — stacks below video on mobile, overlays on md+ */}
        {mode !== "feature" && (
          <div className="relative z-20 flex flex-col items-center justify-center text-center gap-4 md:gap-6 px-gutter py-8 md:absolute md:inset-0 md:py-12">
            <h1
              data-text="WELCOME TO SHAMAN"
              className="glitch-text glitch-line font-headline-lg-mobile text-headline-lg-mobile md:font-display-lg md:text-display-lg text-on-primary uppercase drop-shadow-[4px_4px_0_rgba(186,0,41,1)]"
            >
              WELCOME TO SHAMAN
            </h1>
            <p className="font-body-md text-body-md text-terminal-green max-w-lg blink-cursor [text-shadow:0_0_6px_rgba(93,255,159,0.45)]">
              &gt; We summon worlds out of code — apps, platforms, and games, each with its own kind of magic.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-2">
              <button
                type="button"
                onClick={startFeature}
                className="neo-brutal-btn bg-secondary text-on-secondary font-label-sm text-label-sm uppercase px-8 py-4 hover-glow inline-flex items-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary"
              >
                <span className="w-2.5 h-2.5 bg-on-secondary blink-hard" aria-hidden />
                PRESS START
              </button>
              <Link
                href="/products"
                className="neo-brutal-btn bg-primary-container text-on-surface font-label-sm text-label-sm uppercase px-6 py-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none transition-all inline-block"
              >
                VIEW CATALOG
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Status strip — brutalist media-player chrome */}
      <div className="border-t-4 border-on-surface bg-surface-container px-4 py-2 flex items-center justify-between gap-4 font-label-sm text-label-sm uppercase tracking-widest">
        <span className="flex items-center gap-2 text-on-surface">
          <span
            className={`w-2.5 h-2.5 bg-secondary ${playing ? "blink-hard" : ""}`}
            aria-hidden
          />
          {statusText}
        </span>

        {mode === "ambient" ? (
          <span className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-primary normal-case tracking-normal select-none">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="accent-secondary w-4 h-4 cursor-pointer"
              />
              <span className="uppercase tracking-widest">DON&apos;T SHOW AGAIN</span>
            </label>
            <button
              type="button"
              onClick={startFeature}
              aria-label="Unmute and play the intro with sound"
              className="flex items-center gap-2 text-on-surface hover:text-secondary cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
              SOUND
            </button>
          </span>
        ) : (
          <span className="text-primary">RUNTIME 0:08</span>
        )}
      </div>
    </section>
  );
}
