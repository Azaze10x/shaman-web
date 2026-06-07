"use client";

/**
 * Retro RPG-style pixel block stat bar.
 *
 * Renders a label + 10 square blocks (filled / empty) instead of a
 * percentage progress bar.  No fake numbers — just block segments.
 *
 * TODO(Option B): add `tags` prop to render tech-stack chips instead.
 */

interface PixelStatProps {
  label: string;
  value: number; // 0–100, maps to 0–10 blocks
}

export default function PixelStat({ label, value }: PixelStatProps) {
  const filled = Math.max(0, Math.min(10, Math.round(value / 10)));

  return (
    <div className="flex items-center gap-3">
      <span className="font-label-sm text-label-sm uppercase text-terminal-green w-28 shrink-0">
        {label}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 ${
              i < filled
                ? "bg-terminal-green"
                : "bg-outline-variant"
            }`}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
