"use client";

import Link from "next/link";
import { useState } from "react";

interface DossierEntry {
  title: string;
  code: string;
  label: string;
  body: string;
  metricA: { label: string; value: number };
  metricB: { label: string; value: number };
}

const dataMap: Record<string, DossierEntry> = {
  vision: {
    title: "VISION",
    code: "FILE.01 // VSN",
    label: "VISION",
    body: "To build digital products that feel complete—distinct themes, deliberate experiences, and quality people notice in the first minute and remember afterward.",
    metricA: { label: "THEME CLARITY", value: 95 },
    metricB: { label: "CRAFT DEPTH", value: 92 },
  },
  mission: {
    title: "MISSION",
    code: "FILE.02 // MSN",
    label: "MISSION",
    body: "Shaman Tech is a product studio building software, mobile applications, AI platforms, and games. We treat every release as its own world—clear theme, deliberate experience, and craft you can feel in the details. Artificial intelligence is integrated by design, not added as an afterthought.",
    metricA: { label: "AI INTEGRATION", value: 98 },
    metricB: { label: "WORLD BUILDING", value: 94 },
  },
  principles: {
    title: "STUDIO PROTOCOL",
    code: "FILE.03 // PRT",
    label: "PRINCIPLES",
    body: "Every product ships with a recognizable world—not a generic shell. AI supports the experience; it does not replace the idea. We combine engineering, design, and narrative craft in one studio. Quality means users return because the product earns trust.",
    metricA: { label: "DISCIPLINE", value: 90 },
    metricB: { label: "USER TRUST", value: 96 },
  },
};

const cartridges = [
  { id: "vision", code: "FILE-01", label: "VISION", icon: "eye" },
  { id: "mission", code: "FILE-02", label: "MISSION", icon: "star" },
  { id: "principles", code: "FILE-03", label: "PRINCIPLES", icon: "article" },
] as const;

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    eye: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </svg>
    ),
    star: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
      </svg>
    ),
    article: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
  };
  return icons[name] || null;
}

export default function InfoPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeData = activeId ? dataMap[activeId] : null;

  return (
    <div className="w-full flex flex-col gap-margin lg:flex-row min-h-[716px]">
      <section className="w-full lg:w-2/3 flex flex-col gap-margin">
        <header className="border-b-4 border-on-surface pb-unit">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2 uppercase">
            Company Dossier
          </h1>
          <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-secondary"
            >
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
            PLEASE SELECT A DATA CARTRIDGE TO READ FILE
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-margin">
          {cartridges.map((cart, index) => {
            const isActive = activeId === cart.id;
            const delayClass = index === 0 ? "" : index === 1 ? "delay-100" : "delay-200";
            return (
              <button
                type="button"
                key={cart.id}
                onClick={() => setActiveId(cart.id)}
                aria-pressed={isActive}
                aria-label={`Read file ${cart.label}`}
                className={`text-left w-full glitch-anim ${delayClass} bg-surface-container-highest border-4 p-2 h-64 flex flex-col hard-shadow hard-shadow-hover transition-transform cursor-pointer relative group focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary ${
                  isActive ? "border-secondary" : "border-on-surface"
                }`}
              >
                <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none z-20" />
                <div className="h-6 w-full border-b-4 border-outline flex space-x-1 px-1 overflow-hidden opacity-50 relative z-10">
                  <div className="w-2 h-full bg-outline-variant" />
                  <div className="w-2 h-full bg-outline-variant" />
                  <div className="w-2 h-full bg-outline-variant" />
                  <div className="w-2 h-full bg-outline-variant" />
                  <div className="w-2 h-full bg-outline-variant" />
                  <div className="w-2 h-full bg-outline-variant" />
                </div>
                <div className="flex-1 mt-2 bg-on-primary border-4 border-on-surface relative overflow-hidden flex flex-col z-10">
                  <div className="bg-on-surface text-on-primary w-full p-1 font-label-sm text-label-sm text-center uppercase tracking-widest border-b-4 border-on-surface">
                    {cart.code}
                  </div>
                  <div className="flex-1 flex items-center justify-center bg-surface-container relative">
                    <div className="absolute inset-0 dither-bg opacity-10" />
                    <div
                      className={`relative z-10 text-primary group-hover:scale-110 transition-transform ${isActive ? "text-primary" : ""}`}
                    >
                      <Icon name={cart.icon} />
                    </div>
                  </div>
                  <div className="bg-surface w-full p-2 border-t-4 border-on-surface text-center">
                    <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
                      {cart.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/products"
            className="neo-brutal-btn bg-secondary text-on-secondary font-label-sm text-label-sm uppercase px-6 py-3 hover-glow inline-block"
          >
            View Catalog
          </Link>
          <Link
            href="/contact"
            className="neo-brutal-btn bg-primary-container text-on-surface font-label-sm text-label-sm uppercase px-6 py-3 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none transition-all inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <aside className="w-full lg:w-1/3 flex flex-col">
        <div className="bg-on-surface border-4 border-outline text-on-primary h-full flex flex-col hard-shadow relative">
          <div className="bg-outline text-on-surface px-4 py-2 flex justify-between items-center border-b-4 border-outline-variant relative z-30">
            <span className="font-label-sm text-label-sm uppercase font-bold">
              Terminal_02 // ARCHIVE
            </span>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-secondary rounded-none border border-on-surface" />
              <div className="w-3 h-3 bg-surface rounded-none border border-on-surface" />
            </div>
          </div>
          <div className="p-6 flex flex-col gap-6 flex-1 crt-screen relative overflow-hidden">
            <div className="absolute inset-0 terminal-scanlines pointer-events-none z-20" />
            {!activeData ? (
              <div className="flex flex-col items-center justify-center h-full opacity-50 text-center relative z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-16 h-16 mb-4 animate-pulse"
                >
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H6V4h2v3h8V4h2v14z" />
                </svg>
                <p className="font-label-sm text-label-sm uppercase blink-cursor">
                  AWAITING FILE...
                </p>
                <p className="font-body-md text-body-md mt-2">
                  &gt; PLEASE INSERT CARTRIDGE
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6 relative z-10">
                <div className="border-b-2 border-outline-variant pb-4">
                  <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-secondary uppercase tracking-tighter">
                    {activeData.title}
                  </h2>
                  <p className="font-label-sm text-label-sm text-outline mt-1">
                    {activeData.code}
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1 uppercase text-terminal-green">
                      <span>{activeData.metricA.label}</span>
                      <span>{activeData.metricA.value}%</span>
                    </div>
                    <div className="w-full h-4 border-2 border-outline bg-inverse-surface">
                      <div
                        className="h-full pixel-bar transition-all duration-500"
                        style={{ width: `${activeData.metricA.value}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1 uppercase text-terminal-green">
                      <span>{activeData.metricB.label}</span>
                      <span>{activeData.metricB.value}%</span>
                    </div>
                    <div className="w-full h-4 border-2 border-outline bg-inverse-surface">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${activeData.metricB.value}%`,
                          background:
                            "repeating-linear-gradient(90deg, #5d5f5f, #5d5f5f 8px, transparent 8px, transparent 12px)",
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-6 border-l-4 border-secondary pl-4">
                    <p className="font-body-md text-body-md text-primary-fixed leading-relaxed">
                      {activeData.body}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
