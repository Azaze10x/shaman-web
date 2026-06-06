import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

export type ProductTerminalData = {
  title: string;
  code: string;
  image: string;
  ai: string;
  craft: string;
  status: string;
  platform: string;
  desc: string;
  url?: string;
};

/**
 * The "TERMINAL_01 // STATUS" detail card for a selected product. Used both as
 * the desktop side panel and as the inline accordion that opens under a tapped
 * cartridge on mobile. `data` is null → the AWAITING / insert-cartridge state.
 */
export default function ProductTerminal({ data }: { data: ProductTerminalData | null }) {
  return (
    <div className="bg-on-surface border-4 border-outline text-on-primary dark:bg-surface-container dark:text-on-surface h-full flex flex-col hard-shadow relative">
      <div className="bg-outline text-on-surface px-4 py-2 flex justify-between items-center border-b-4 border-outline-variant relative z-30">
        <span className="font-label-sm text-label-sm uppercase font-bold">
          Terminal_01 // STATUS
        </span>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-secondary rounded-none border border-on-surface" />
          <div className="w-3 h-3 bg-surface rounded-none border border-on-surface" />
        </div>
      </div>
      <div className="p-6 flex flex-col gap-6 flex-1 crt-screen relative overflow-hidden">
        <div className="absolute inset-0 terminal-scanlines pointer-events-none z-20" />
        {!data ? (
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
              <div className="bg-white border-2 border-on-surface p-2 shadow-[2px_2px_0px_0px_rgb(var(--c-shadow))] shrink-0">
                <Image
                  src={assetPath(data.image)}
                  alt={data.title}
                  width={64}
                  height={64}
                  className="w-12 h-12 object-contain select-none"
                  draggable={false}
                />
              </div>
              <div>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-secondary uppercase tracking-tighter">
                  {data.title}
                </h2>
                <p className="font-label-sm text-label-sm text-outline mt-1">{data.code}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 font-label-sm text-label-sm uppercase">
              <span className="text-outline">
                STATUS:{" "}
                <span className={data.status === "LIVE" ? "text-terminal-green" : "text-terminal-amber"}>
                  {data.status}
                </span>
              </span>
              <span className="text-outline">
                PLATFORM: <span className="text-terminal-green">{data.platform}</span>
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1 uppercase text-terminal-green">
                  <span>CRAFT</span>
                  <span>{data.craft}%</span>
                </div>
                <div className="w-full h-4 border-2 border-outline bg-black/40">
                  <div
                    className="h-full pixel-bar transition-all duration-500"
                    style={{ width: `${data.craft}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1 uppercase text-terminal-green">
                  <span>AI POWER</span>
                  <span>{data.ai}%</span>
                </div>
                <div className="w-full h-4 border-2 border-outline bg-black/40">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${data.ai}%`,
                      background:
                        "repeating-linear-gradient(90deg, rgb(var(--c-terminal-green)), rgb(var(--c-terminal-green)) 8px, transparent 8px, transparent 12px)",
                    }}
                  />
                </div>
              </div>
              <div className="mt-6 border-l-4 border-secondary pl-4">
                <p className="font-body-md text-body-md text-primary-fixed leading-relaxed">
                  {data.desc}
                </p>
              </div>
            </div>
            <div className="mt-auto pt-6">
              {data.url ? (
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center bg-secondary text-on-secondary font-label-sm text-label-sm py-3 border-4 border-on-surface uppercase tracking-widest hard-shadow-active hover:bg-secondary-container transition-colors relative z-30"
                >
                  &gt; INITIALIZE SYSTEM &lt;
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full bg-secondary text-on-secondary font-label-sm text-label-sm py-3 border-4 border-on-surface uppercase tracking-widest hard-shadow-active opacity-60 cursor-not-allowed relative z-30"
                >
                  &gt; INITIALIZE SYSTEM &lt;
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
