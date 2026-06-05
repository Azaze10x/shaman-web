import Link from "next/link";

const featuredWorlds = [
  {
    plate: "PORTAL // APP",
    serviceId: "apps",
    title: "APPLICATIONS",
    description:
      "Software and mobile apps—each its own themed world, built for real use.",
    iconClass: "text-primary",
    icon: (
      <path d="M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
    ),
  },
  {
    plate: "SPELL // AI",
    serviceId: "ai",
    title: "AI PLATFORM",
    description:
      "Intelligence woven into our stack—and the spell inside many products.",
    iconClass: "text-primary",
    icon: (
      <path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2h2v-2h-2V9h2zM8 5h8v14H8V5z" />
    ),
  },
  {
    plate: "REALM // GME",
    serviceId: "worlds",
    title: "GAMES & WORLDS",
    description:
      "Playable realms where theme, craft, and story become the adventure.",
    iconClass: "text-primary",
    icon: (
      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    ),
  },
] as const;

export default function Home() {
  return (
    <>
      {/* Hero Section — CRT main screen */}
      <section className="boot-reveal w-full pixel-border hero-screen relative overflow-hidden">
        <div className="hero-stars" />
        <div className="synthwave-grid" />
        <div className="absolute inset-0 terminal-scanlines pointer-events-none z-20 opacity-60" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-7 px-gutter py-20 sm:py-28">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-56 h-56 rounded-full bg-secondary opacity-20 blur-2xl" />
            <div className="float-8bit">
              <div
                className="shaman-idle select-none"
                role="img"
                aria-label="Shaman Technology mascot"
              />
            </div>
          </div>

          <h1 className="font-display-lg text-display-lg text-surface uppercase drop-shadow-[4px_4px_0_rgba(186,0,41,1)] float-8bit">
            WELCOME TO SHAMAN
          </h1>

          <p className="font-body-md text-body-md text-terminal-green max-w-lg blink-cursor [text-shadow:0_0_6px_rgba(93,255,159,0.45)]">
            &gt; We summon worlds out of code — apps, platforms, and games, each with its own kind of magic.
          </p>

          <Link
            href="/products"
            className="neo-brutal-btn bg-secondary text-on-secondary font-label-sm text-label-sm uppercase px-8 py-4 mt-4 hover-glow inline-flex items-center gap-3"
          >
            <span className="w-2.5 h-2.5 bg-on-secondary blink-hard" aria-hidden />
            PRESS START
          </Link>
        </div>
      </section>

      {/* Featured Highlights */}
      <section className="w-full flex flex-col gap-margin">
        <header className="border-b-4 border-on-surface pb-unit">
          <h2 className="font-display-lg text-display-lg text-on-surface mb-2 uppercase">
            FEATURED WORLDS
          </h2>
          <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-secondary"
            >
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
            SELECT A PORTAL TO EXPLORE
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {featuredWorlds.map((world) => (
            <Link
              key={world.plate}
              href={`/services?module=${world.serviceId}`}
              className="reveal-item bg-surface-container-highest border-4 border-on-surface p-6 hard-shadow hard-shadow-hover transition-transform cursor-pointer block hover:border-secondary focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary"
            >
              <div className="bg-on-surface text-on-primary w-full p-2 font-label-sm text-label-sm text-center uppercase tracking-widest border-b-4 border-on-surface mb-4">
                {world.plate}
              </div>
              <div className="flex items-center justify-center h-24 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className={`w-16 h-16 ${world.iconClass}`}
                  aria-hidden
                >
                  {world.icon}
                </svg>
              </div>
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase text-center">
                {world.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-center mt-2">
                {world.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full bg-surface-container border-4 border-on-surface shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 relative overflow-hidden">
        <div className="absolute inset-0 dither-bg opacity-30 z-0" />
        <div className="relative z-10 flex flex-col items-center text-center gap-6">
          <h2 className="font-display-lg text-display-lg text-on-surface uppercase drop-shadow-[4px_4px_0_rgba(186,0,41,1)]">
            OUR MISSION
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
            We make software that feels like somewhere. Apps, platforms, AI tools, games — each
            built as its own world, with AI woven quietly into the craft. We’d rather make a few
            things people fall for than a pile they scroll past.
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              href="/products"
              className="neo-brutal-btn bg-secondary text-on-secondary font-label-sm text-label-sm uppercase px-6 py-3 hover-glow inline-block"
            >
              VIEW CATALOG
            </Link>
            <Link
              href="/contact"
              className="neo-brutal-btn bg-primary-container text-on-surface font-label-sm text-label-sm uppercase px-6 py-3 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none transition-all inline-block"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
