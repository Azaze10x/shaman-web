"use client";

import { useEffect, useState } from "react";

// Short, panicky/annoyed one-liners — the shaman fleeing the cat.
const LINES = [
  "NOT TODAY!",
  "NOPE NOPE!",
  "AAAH!",
  "WHY ME?!",
  "BAD KITTY!",
  "LEAVE ME BE!",
  "HELP!",
  "TOO CLOSE!",
  "GO AWAY!",
  "EEEK!",
  "NICE CAT... NO!",
  "RUN!",
];

/**
 * Random speech bubble above the fleeing shaman in the footer runner.
 * Pops up a random line at random intervals, then hides. Decorative.
 */
export default function RunnerSpeech() {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const loop = () => {
      const wait = 2500 + Math.random() * 6000; // gap between lines
      showTimer = setTimeout(() => {
        if (cancelled) return;
        setMsg(LINES[Math.floor(Math.random() * LINES.length)]);
        hideTimer = setTimeout(() => {
          if (cancelled) return;
          setMsg(null);
          loop();
        }, 2200); // how long the bubble stays
      }, wait);
    };
    loop();

    return () => {
      cancelled = true;
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!msg) return null;
  return (
    <span className="runner-bubble" aria-hidden>
      {msg}
    </span>
  );
}
