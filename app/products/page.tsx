"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductData {
  title: string;
  code: string;
  cpu: string;
  ram: string;
  desc: string;
  image: string;
}

const dataMap: Record<string, ProductData> = {
  coinroom: {
    title: "COINROOM",
    code: "SYS.VER // SHMN-CR-01",
    cpu: "92",
    ram: "88",
    desc: "A themed finance and assistant experience—tools, clarity, and an AI-guided flow inside one cohesive world.",
    image: "/products/coinroom.png",
  },
  mfactory: {
    title: "M-FACTORY",
    code: "SYS.VER // SHMN-MF-02",
    cpu: "85",
    ram: "76",
    desc: "Music production workspace for creating, shaping, and publishing audio with a bold factory-inspired identity.",
    image: "/products/m-factory.png",
  },
  ml: {
    title: "ML",
    code: "SYS.VER // SHMN-ML-03",
    cpu: "78",
    ram: "94",
    desc: "Knowledge and learning world built around curated content, presentation, and discovery in a mystical library theme.",
    image: "/products/ml.png",
  },
  myc: {
    title: "MYC",
    code: "SYS.VER // SHMN-MYC-04",
    cpu: "70",
    ram: "82",
    desc: "Creative tooling for precise edits—trim, cut, and craft media workflows with a focused, minimal interface.",
    image: "/products/myc.png",
  },
  ss: {
    title: "SS",
    code: "SYS.VER // SHMN-SS-05",
    cpu: "88",
    ram: "71",
    desc: "Branded showcase and commerce experience with sharp visual identity and room for themed storytelling.",
    image: "/products/ss.png",
  },
  tt: {
    title: "TT",
    code: "SYS.VER // SHMN-TT-06",
    cpu: "81",
    ram: "90",
    desc: "Communication product for dialogue, messaging, and voice—designed as its own conversational world.",
    image: "/products/tt.png",
  },
};

const cartridges = [
  { id: "coinroom", code: "SHMN-CR-01", label: "COINROOM", image: "/products/coinroom.png" },
  { id: "mfactory", code: "SHMN-MF-02", label: "M-FACTORY", image: "/products/m-factory.png" },
  { id: "ml", code: "SHMN-ML-03", label: "ML", image: "/products/ml.png" },
  { id: "myc", code: "SHMN-MYC-04", label: "MYC", image: "/products/myc.png" },
  { id: "ss", code: "SHMN-SS-05", label: "SS", image: "/products/ss.png" },
  { id: "tt", code: "SHMN-TT-06", label: "TT", image: "/products/tt.png" },
] as const;

function delayClass(index: number) {
  if (index % 3 === 1) return "delay-100";
  if (index % 3 === 2) return "delay-200";
  return "";
}

export default function ProductsPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeData = activeId ? dataMap[activeId] : null;

  return (
    <div className="w-full flex flex-col gap-margin lg:flex-row min-h-[716px]">
      <section className="w-full lg:w-2/3 flex flex-col gap-margin">
        <header className="border-b-4 border-on-surface pb-unit">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2 uppercase">
            Product Catalog
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
            PLEASE SELECT A DATA CARTRIDGE TO VIEW STATUS
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-margin">
          {cartridges.map((cart, index) => {
            const isActive = activeId === cart.id;
            return (
              <div
                key={cart.id}
                onClick={() => setActiveId(cart.id)}
                className={`glitch-anim ${delayClass(index)} bg-surface-container-highest border-4 p-2 h-64 flex flex-col hard-shadow hard-shadow-hover transition-transform cursor-pointer relative group ${
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
                  <div className="flex-1 flex items-center justify-center bg-surface-container relative p-3">
                    <div className="absolute inset-0 dither-bg opacity-10" />
                    <div
                      className={`relative z-10 w-full h-full flex items-center justify-center transition-transform group-hover:scale-105 ${isActive ? "scale-105" : ""}`}
                    >
                      <Image
                        src={cart.image}
                        alt={cart.label}
                        width={160}
                        height={160}
                        className="max-h-[88px] w-auto object-contain"
                        sizes="160px"
                      />
                    </div>
                  </div>
                  <div className="bg-surface w-full p-2 border-t-4 border-on-surface text-center">
                    <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
                      {cart.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <aside className="w-full lg:w-1/3 flex flex-col">
        <div className="bg-on-surface border-4 border-outline text-on-primary h-full flex flex-col hard-shadow relative">
          <div className="bg-outline text-on-surface px-4 py-2 flex justify-between items-center border-b-4 border-outline-variant relative z-30">
            <span className="font-label-sm text-label-sm uppercase font-bold">
              Terminal_01 // STATUS
            </span>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-secondary rounded-none border border-on-surface" />
              <div className="w-3 h-3 bg-surface rounded-none border border-on-surface" />
            </div>
          </div>
          <div className="p-6 flex flex-col gap-6 flex-1 bg-on-primary-fixed relative overflow-hidden">
            <div className="absolute inset-0 terminal-scanlines pointer-events-none z-20" />
            {!activeData ? (
              <div className="flex flex-col items-center justify-center h-full opacity-50 text-center relative z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-16 h-16 mb-4 animate-pulse"
                >
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
                <p className="font-label-sm text-label-sm uppercase blink-cursor">
                  AWAITING DATA...
                </p>
                <p className="font-body-md text-body-md mt-2">
                  &gt; PLEASE INSERT CARTRIDGE
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6 relative z-10">
                <div className="border-b-2 border-outline-variant pb-4 flex gap-4 items-start">
                  <Image
                    src={activeData.image}
                    alt={activeData.title}
                    width={64}
                    height={64}
                    className="w-14 h-14 object-contain shrink-0"
                  />
                  <div>
                    <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-secondary uppercase tracking-tighter">
                      {activeData.title}
                    </h2>
                    <p className="font-label-sm text-label-sm text-outline mt-1">
                      {activeData.code}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1 uppercase text-tertiary-fixed-dim">
                      <span>PROCESSING POWER (CPU)</span>
                      <span>{activeData.cpu}%</span>
                    </div>
                    <div className="w-full h-4 border-2 border-outline bg-inverse-surface">
                      <div
                        className="h-full pixel-bar transition-all duration-500"
                        style={{ width: `${activeData.cpu}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1 uppercase text-tertiary-fixed-dim">
                      <span>MEMORY (RAM)</span>
                      <span>{activeData.ram}%</span>
                    </div>
                    <div className="w-full h-4 border-2 border-outline bg-inverse-surface">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${activeData.ram}%`,
                          background:
                            "repeating-linear-gradient(90deg, #5d5f5f, #5d5f5f 8px, transparent 8px, transparent 12px)",
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-6 border-l-4 border-secondary pl-4">
                    <p className="font-body-md text-body-md text-primary-fixed leading-relaxed">
                      {activeData.desc}
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    className="w-full bg-secondary text-on-error font-label-sm text-label-sm py-3 border-4 border-on-surface uppercase tracking-widest hard-shadow-active hover:bg-secondary-container transition-colors relative z-30"
                  >
                    &gt; INITIALIZE SYSTEM &lt;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
