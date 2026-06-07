"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/asset-path";
import { sfx } from "@/lib/sfx";
import ProductTerminal, { type ProductTerminalData } from "@/components/ProductTerminal";

const dataMap: Record<string, ProductTerminalData> = {
  coinroom: {
    title: "COINROOM",
    code: "SYS.VER // SHMN-CR-01",
    ai: 80,
    craft: 92,
    status: "SOON",
    platform: "WEB",
    desc: "A themed finance and assistant experience—tools, clarity, and an AI-guided flow inside one cohesive world.",
    image: "/products/coinroom.png",
  },
  mfactory: {
    title: "M-FACTORY",
    code: "SYS.VER // SHMN-MF-02",
    ai: 96,
    craft: 90,
    status: "LIVE",
    platform: "WEB",
    desc: "AI music and video studio—generate or upload tracks, shape your audio, and create beat-synced music videos in cinematic styles, all in one factory-inspired workspace.",
    image: "/products/m-factory.png",
    url: "https://m-factory.app",
  },
  ml: {
    title: "Magic Library",
    code: "SYS.VER // SHMN-ML-03",
    ai: 94,
    craft: 88,
    status: "SOON",
    platform: "WEB",
    desc: "An AI platform for writing and building fictional worlds—craft stories, shape characters, and explore narrative realms in a mystical library theme.",
    image: "/products/ml.png",
  },
  myc: {
    title: "mYcutter",
    code: "SYS.VER // SHMN-MYC-04",
    ai: 72,
    craft: 90,
    status: "LIVE",
    platform: "DESKTOP",
    desc: "A local-first video editor for precise trim-and-cut workflows—fast on your machine, with AI assistance built in to speed up edits without leaving your timeline.",
    image: "/products/myc.png",
    url: "https://mycutter.app",
  },
  ss: {
    title: "SellSnap",
    code: "SYS.VER // SHMN-SS-05",
    ai: 86,
    craft: 80,
    status: "SOON",
    platform: "MOBILE",
    desc: "A mobile app for sellers—polish product visuals faster, then generate SEO-friendly copy and captions so listings look sharp and ship in less time.",
    image: "/products/ss.png",
  },
  tt: {
    title: "TalkTask",
    code: "SYS.VER // SHMN-TT-06",
    ai: 82,
    craft: 78,
    status: "SOON",
    platform: "MOBILE",
    desc: "A mobile app that turns voice notes into organized tasks—capture by speaking, split and structure what you said, then get reminders so nothing slips through.",
    image: "/products/tt.png",
  },
};

const cartridges = [
  { id: "coinroom", code: "SHMN-CR-01", label: "COINROOM", image: "/products/coinroom.png" },
  { id: "mfactory", code: "SHMN-MF-02", label: "M-FACTORY", image: "/products/m-factory.png" },
  { id: "ml", code: "SHMN-ML-03", label: "Magic Library", image: "/products/ml.png" },
  { id: "myc", code: "SHMN-MYC-04", label: "mYcutter", image: "/products/myc.png" },
  { id: "ss", code: "SHMN-SS-05", label: "SellSnap", image: "/products/ss.png" },
  { id: "tt", code: "SHMN-TT-06", label: "TalkTask", image: "/products/tt.png" },
] as const;

function delayClass(index: number) {
  if (index % 3 === 1) return "delay-100";
  if (index % 3 === 2) return "delay-200";
  return "";
}

export default function ProductsPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeData = activeId ? dataMap[activeId] : null;

  // On mobile/tablet the detail opens as an accordion under the tapped card —
  // bring it into view so the user sees the result of their tap.
  const detailRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (activeId && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeId]);

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

        {/* single column below lg so the accordion sits directly under the tapped
            card; multi-column only on desktop where the side panel is used */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-margin">
          {cartridges.map((cart, index) => {
            const isActive = activeId === cart.id;
            return (
              <Fragment key={cart.id}>
              <button
                type="button"
                onClick={() => { sfx.blip(); setActiveId((prev) => (prev === cart.id ? null : cart.id)); }}
                aria-pressed={isActive}
                aria-expanded={isActive}
                aria-controls={`product-detail-${cart.id}`}
                aria-label={`View status for ${cart.label}`}
                className={`text-left w-full glitch-anim ${delayClass(index)} bg-surface-container-highest border-4 p-2 h-64 flex flex-col hard-shadow hard-shadow-hover transition-transform cursor-pointer relative group focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary ${
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
                  <div className="bg-on-surface text-on-primary dark:bg-surface-container-highest dark:text-on-surface w-full p-1 font-label-sm text-label-sm text-center uppercase tracking-widest border-b-4 border-on-surface">
                    {cart.code}
                  </div>
                  <div className="flex-1 flex items-center justify-center bg-surface-container relative p-3">
                    <div className="absolute inset-0 dither-bg opacity-10" />
                    <div
                      className={`relative z-10 flex items-center justify-center bg-white border-2 border-on-surface p-2 shadow-[2px_2px_0px_0px_rgb(var(--c-shadow))] transition-transform group-hover:scale-105 ${isActive ? "scale-105" : ""}`}
                    >
                      <span className="glitch-icon inline-flex">
                        <Image
                          src={assetPath(cart.image)}
                          alt={cart.label}
                          width={160}
                          height={160}
                          className="max-h-[72px] w-auto object-contain select-none"
                          sizes="160px"
                          loading="eager"
                          draggable={false}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="bg-surface w-full p-2 border-t-4 border-on-surface text-center">
                    <span className="font-headline-lg-mobile text-lg font-bold text-on-surface leading-none whitespace-nowrap block">
                      {cart.label}
                    </span>
                  </div>
                </div>
              </button>
              {isActive && (
                <div
                  ref={detailRef}
                  id={`product-detail-${cart.id}`}
                  role="region"
                  aria-label={`${cart.label} status`}
                  className="col-span-full lg:hidden"
                >
                  <ProductTerminal data={activeData} />
                </div>
              )}
              </Fragment>
            );
          })}
        </div>
      </section>

      {/* desktop side panel; mobile uses the inline accordion above */}
      <aside className="hidden lg:flex w-full lg:w-1/3 flex-col">
        <ProductTerminal data={activeData} />
      </aside>
    </div>
  );
}
