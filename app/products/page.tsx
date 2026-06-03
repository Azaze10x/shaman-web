"use client";

import { useState } from "react";

interface ProductData {
  title: string;
  code: string;
  cpu: string;
  ram: string;
  desc: string;
}

const dataMap: Record<string, ProductData> = {
  ai: {
    title: "ARTIFICIAL INTELLIGENCE",
    code: "SYS.VER // SHMN-AI-01",
    cpu: "98",
    ram: "85",
    desc: "Advanced neural network system designed to analyze and predict trends with quantum accuracy. Supports unlimited deep learning.",
  },
  robo: {
    title: "ROBOTICS",
    code: "SYS.VER // SHMN-RB-88",
    cpu: "60",
    ram: "40",
    desc: "Physical hardware control module with millisecond response times. Built to withstand extreme environments, suitable for heavy industry and military use.",
  },
  cloud: {
    title: "CLOUD NETWORK",
    code: "SYS.VER // SHMN-NW-99",
    cpu: "45",
    ram: "99",
    desc: "Decentralized infrastructure distributing data across multi-layer encrypted nodes. Ensures your data is secure and accessible 24/7.",
  },
};

const cartridges = [
  { id: "ai", code: "SHMN-AI-01", label: "ARTIFICIAL INTELLIGENCE", icon: "memory" },
  { id: "robo", code: "SHMN-RB-88", label: "ROBOTICS", icon: "precision_manufacturing" },
  { id: "cloud", code: "SHMN-NW-99", label: "CLOUD NETWORK", icon: "dns" },
];

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    memory: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
        <path d="M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2v-2h-2V7h-2V5h-2V3H5v2H3v2H1v2H1v6h2v2h2v2h2v2h10v-2h2v-2h2v-2h2V9h-2zM7 17H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V7h2v2zm12 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z" />
      </svg>
    ),
    precision_manufacturing: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.5.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
      </svg>
    ),
    dns: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
        <path d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 5v4H5V5h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5z" />
      </svg>
    ),
  };
  return icons[name] || null;
}

export default function ProductsPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeData = activeId ? dataMap[activeId] : null;

  return (
    <div className="w-full flex flex-col gap-margin lg:flex-row min-h-[716px]">
      {/* Left Column: Cartridge Grid */}
      <section className="w-full lg:w-2/3 flex flex-col gap-margin">
        {/* Section Header */}
        <header className="border-b-4 border-on-surface pb-unit">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2 uppercase">
            Product Catalog
          </h1>
          <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-secondary">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
            PLEASE SELECT A DATA CARTRIDGE TO VIEW STATUS
          </p>
        </header>
        {/* Cartridge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-margin">
          {cartridges.map((cart, index) => {
            const isActive = activeId === cart.id;
            const delayClass = index === 0 ? "" : index === 1 ? "delay-100" : "delay-200";
            return (
              <div
                key={cart.id}
                onClick={() => setActiveId(cart.id)}
                className={`glitch-anim ${delayClass} bg-surface-container-highest border-4 p-2 h-64 flex flex-col hard-shadow hard-shadow-hover transition-transform cursor-pointer relative group ${
                  isActive ? "border-secondary" : "border-on-surface"
                }`}
              >
                <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none z-20" />
                {/* Top Ridges */}
                <div className="h-6 w-full border-b-4 border-outline flex space-x-1 px-1 overflow-hidden opacity-50 relative z-10">
                  <div className="w-2 h-full bg-outline-variant" />
                  <div className="w-2 h-full bg-outline-variant" />
                  <div className="w-2 h-full bg-outline-variant" />
                  <div className="w-2 h-full bg-outline-variant" />
                  <div className="w-2 h-full bg-outline-variant" />
                  <div className="w-2 h-full bg-outline-variant" />
                </div>
                {/* Label Area */}
                <div className="flex-1 mt-2 bg-on-primary border-4 border-on-surface relative overflow-hidden flex flex-col z-10">
                  <div className="bg-on-surface text-on-primary w-full p-1 font-label-sm text-label-sm text-center uppercase tracking-widest border-b-4 border-on-surface">
                    {cart.code}
                  </div>
                  <div className="flex-1 flex items-center justify-center bg-surface-container relative">
                    <div className="absolute inset-0 dither-bg opacity-10" />
                    <div className={`relative z-10 text-secondary group-hover:scale-110 transition-transform ${isActive ? "text-secondary" : ""}`}>
                      <Icon name={cart.icon} />
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

      {/* Right Column: Stats Window */}
      <aside className="w-full lg:w-1/3 flex flex-col">
        <div className="bg-on-surface border-4 border-outline text-on-primary h-full flex flex-col hard-shadow relative">
          {/* Terminal Header */}
          <div className="bg-outline text-on-surface px-4 py-2 flex justify-between items-center border-b-4 border-outline-variant relative z-30">
            <span className="font-label-sm text-label-sm uppercase font-bold">
              Terminal_01 // STATUS
            </span>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-secondary rounded-none border border-on-surface" />
              <div className="w-3 h-3 bg-surface rounded-none border border-on-surface" />
            </div>
          </div>
          {/* Stats Content */}
          <div className="p-6 flex flex-col gap-6 flex-1 bg-on-primary-fixed relative overflow-hidden">
            <div className="absolute inset-0 terminal-scanlines pointer-events-none z-20" />
            {!activeData ? (
              <div className="flex flex-col items-center justify-center h-full opacity-50 text-center relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16 mb-4 animate-pulse">
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
                <div className="border-b-2 border-outline-variant pb-4">
                  <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-secondary uppercase tracking-tighter">
                    {activeData.title}
                  </h2>
                  <p className="font-label-sm text-label-sm text-outline mt-1">
                    {activeData.code}
                  </p>
                </div>
                <div className="space-y-4">
                  {/* Stat Row */}
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
                  {/* Stat Row */}
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
                          background: "repeating-linear-gradient(90deg, #5d5f5f, #5d5f5f 8px, transparent 8px, transparent 12px)",
                        }}
                      />
                    </div>
                  </div>
                  {/* Text block */}
                  <div className="mt-6 border-l-4 border-secondary pl-4">
                    <p className="font-body-md text-body-md text-primary-fixed leading-relaxed">
                      {activeData.desc}
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-6">
                  <button className="w-full bg-secondary text-on-error font-label-sm text-label-sm py-3 border-4 border-on-surface uppercase tracking-widest hard-shadow-active hover:bg-secondary-container transition-colors relative z-30">
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
