"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface ServiceEntry {
  title: string;
  code: string;
  label: string;
  body: string;
  customization: string;
  saas?: string;
  metricA: { label: string; value: number };
  metricB: { label: string; value: number };
}

const dataMap: Record<string, ServiceEntry> = {
  apps: {
    title: "APP & MOBILE",
    code: "SVC.01 // APP",
    label: "APPS",
    body: "Native and cross-platform apps built around your workflow—UI customization, feature modules, and releases tuned for real users, not demo slides.",
    customization:
      "White-label shells, branded flows, integrations, and phased rollouts tailored to your product roadmap.",
    saas:
      "Subscription-ready releases when your model is recurring—accounts, billing hooks, and update cadence built in from the start.",
    metricA: { label: "UX FIT", value: 92 },
    metricB: { label: "SHIP SPEED", value: 86 },
  },
  ai: {
    title: "AI, PLATFORMS & SAAS",
    code: "SVC.02 // AI",
    label: "AI PLATFORMS",
    body: "AI-assisted platforms and internal tools—prompt flows, agents, dashboards, and automation embedded in a cohesive product world. Delivered as software-as-a-service when you need a hosted, always-on product.",
    customization:
      "Model choice, guardrails, data hooks, and operator UX customized to your team and compliance needs.",
    saas:
      "Software as a Service (SaaS): cloud-hosted platforms, tenant-aware releases, subscriptions, and ops so your product stays live after launch.",
    metricA: { label: "INTELLIGENCE", value: 96 },
    metricB: { label: "CONTROL", value: 88 },
  },
  worlds: {
    title: "GAMES & WORLDS",
    code: "SVC.03 // WLD",
    label: "GAMES & WORLDS",
    body: "Playable and interactive worlds with strong theme—mechanics, narrative framing, and visual identity that feel like one deliberate universe.",
    customization:
      "Art direction, lore systems, progression, and live-ops hooks shaped to your IP or campaign.",
    saas:
      "Live-service delivery—seasonal content, hosted builds, and ongoing updates when your world runs as a service.",
    metricA: { label: "THEME DEPTH", value: 94 },
    metricB: { label: "IMMERSION", value: 90 },
  },
  engage: {
    title: "ENGAGEMENT MODEL",
    code: "SVC.04 // ENG",
    label: "ENGAGE",
    body: "We partner on fixed-scope builds, milestone phases, SaaS retainers, or longer co-build agreements—scope, timeline, and customization level agreed up front.",
    customization:
      "From MVP customization to full greenfield builds; you keep the theme, we bring engineering, design, and AI craft.",
    saas:
      "SaaS engagements: hosting, monitoring, feature cadence, and per-client or per-tier customization after go-live.",
    metricA: { label: "CLARITY", value: 98 },
    metricB: { label: "FLEX SCOPE", value: 84 },
  },
};

const cartridges = [
  { id: "apps", code: "SVC-01", label: "APPS", icon: "phone" },
  { id: "ai", code: "SVC-02", label: "AI", icon: "chip" },
  { id: "worlds", code: "SVC-03", label: "GAMES & WORLDS", icon: "game" },
  { id: "engage", code: "SVC-04", label: "ENGAGE", icon: "handshake" },
] as const;

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
        <path d="M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
      </svg>
    ),
    chip: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
        <path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2h2v-2h-2V9h2zM8 5h8v14H8V5z" />
      </svg>
    ),
    game: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
        <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    ),
    handshake: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
      </svg>
    ),
  };
  return icons[name] || null;
}

function delayClass(index: number) {
  if (index % 4 === 1) return "delay-100";
  if (index % 4 === 2) return "delay-200";
  if (index % 4 === 3) return "delay-300";
  return "";
}

function isServiceModule(id: string | null): id is keyof typeof dataMap {
  return id !== null && id in dataMap;
}

function ServicesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeData = activeId ? dataMap[activeId] : null;

  useEffect(() => {
    const moduleParam = searchParams.get("module");
    if (isServiceModule(moduleParam)) {
      setActiveId(moduleParam);
    }
  }, [searchParams]);

  const selectModule = (id: string) => {
    setActiveId(id);
    router.replace(`/services?module=${id}`, { scroll: false });
  };

  return (
    <div className="w-full flex flex-col gap-margin lg:flex-row min-h-[716px]">
      <section className="w-full lg:w-2/3 flex flex-col gap-margin">
        <header className="border-b-4 border-on-surface pb-unit">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2 uppercase">
            Services &amp; Customization
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
            BESPOKE BUILDS // CUSTOMIZATION // SAAS
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant mt-4 max-w-2xl leading-relaxed">
            We ship our own worlds—and build customized apps, AI platforms, and Software as a
            Service (SaaS) experiences for partners who need a distinct theme, scope, and craft.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-margin">
          {cartridges.map((cart, index) => {
            const isActive = activeId === cart.id;
            return (
              <button
                type="button"
                key={cart.id}
                onClick={() => selectModule(cart.id)}
                aria-pressed={isActive}
                aria-label={`View service module ${cart.label}`}
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
                  <div className="bg-on-surface text-on-primary w-full p-1 font-label-sm text-label-sm text-center uppercase tracking-widest border-b-4 border-on-surface">
                    {cart.code}
                  </div>
                  <div className="flex-1 flex items-center justify-center bg-surface-container relative">
                    <div className="absolute inset-0 dither-bg opacity-10" />
                    <div
                      className={`relative z-10 text-primary group-hover:scale-110 transition-transform ${isActive ? "scale-110" : ""}`}
                    >
                      <Icon name={cart.icon} />
                    </div>
                  </div>
                  <div className="bg-surface w-full p-2 border-t-4 border-on-surface text-center">
                    <span className="font-headline-lg-mobile text-base font-bold text-on-surface leading-tight block">
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
            className="neo-brutal-btn bg-primary-container text-on-surface font-label-sm text-label-sm uppercase px-6 py-3 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none transition-all inline-block"
          >
            View Catalog
          </Link>
          <Link
            href="/contact"
            className="neo-brutal-btn bg-secondary text-on-secondary font-label-sm text-label-sm uppercase px-6 py-3 hover-glow inline-block"
          >
            Open Channel
          </Link>
        </div>
      </section>

      <aside className="w-full lg:w-1/3 flex flex-col">
        <div className="bg-on-surface border-4 border-outline text-on-primary h-full flex flex-col hard-shadow relative">
          <div className="bg-outline text-on-surface px-4 py-2 flex justify-between items-center border-b-4 border-outline-variant relative z-30">
            <span className="font-label-sm text-label-sm uppercase font-bold">
              Terminal_04 // SERVICE DESK
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
                  aria-hidden
                >
                  <path d="M22.7 19.3 17.5 14l-5.2 5.3-1.4-1.4 5.3-5.3-5.3-5.3-1.4 1.4 5.3 5.3-5.3 5.2 1.4 1.4 5.2-5.3 5.3 5.3 1.4-1.4zm-10.7-7.3 2.5-2.5c.39-.39 1.02-.39 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41L14.5 15.5l-2.5-2.5 2.5-2.5zM3 21h8v-8l-2.5-2.5L3 17.5V21z" />
                </svg>
                <p className="font-label-sm text-label-sm uppercase blink-cursor">
                  AWAITING BRIEF...
                </p>
                <p className="font-body-md text-body-md mt-2">
                  &gt; SELECT A SERVICE MODULE
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
                  <div className="mt-6 border-l-4 border-secondary pl-4 space-y-4">
                    <p className="font-body-md text-body-md text-primary-fixed leading-relaxed">
                      {activeData.body}
                    </p>
                    <div className="border-t-2 border-dashed border-outline-variant pt-4">
                      <p className="font-label-sm text-label-sm text-secondary uppercase mb-2">
                        CUSTOMIZATION
                      </p>
                      <p className="font-body-md text-body-md text-primary-fixed leading-relaxed">
                        {activeData.customization}
                      </p>
                    </div>
                    {activeData.saas ? (
                      <div className="border-t-2 border-dashed border-outline-variant pt-4">
                        <p className="font-label-sm text-label-sm text-secondary uppercase mb-2">
                          SOFTWARE AS A SERVICE (SAAS)
                        </p>
                        <p className="font-body-md text-body-md text-primary-fixed leading-relaxed">
                          {activeData.saas}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mt-auto pt-4">
                  <Link
                    href="/contact"
                    className="w-full block text-center bg-secondary text-on-secondary font-label-sm text-label-sm py-3 border-4 border-on-surface uppercase tracking-widest hard-shadow-active hover:bg-secondary-container transition-colors relative z-30"
                  >
                    &gt; OPEN CHANNEL &lt;
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[716px] flex items-center justify-center font-label-sm text-label-sm text-primary uppercase">
          Loading service desk...
        </div>
      }
    >
      <ServicesPageContent />
    </Suspense>
  );
}
