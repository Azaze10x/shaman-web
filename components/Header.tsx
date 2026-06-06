"use client";

import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/asset-path";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "START", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "INFO", href: "/info" },
  { label: "Contact", href: "/contact" },
] as const;

const navLinkClass = (isActive: boolean) =>
  `font-label-md text-label-md uppercase px-2 py-1 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none ${
    isActive
      ? "text-secondary-container bg-on-secondary-fixed-variant"
      : "text-on-surface hover:text-secondary"
  }`;

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-surface-container border-b-4 border-on-surface shadow-[4px_4px_0px_0px_rgb(var(--c-shadow))] sticky top-0 z-50">
      <div className="relative flex justify-between items-center px-gutter py-4 w-full max-w-container-max mx-auto">
        <Link href="/" className="block shrink-0 float-8bit">
          {/* dark "TECH" wordmark for light bg; light "TECH" wordmark for dark bg */}
          <Image
            src={assetPath("/logos/white_one-Photoroom.png")}
            alt="Shaman Tech"
            width={1150}
            height={260}
            className="h-12 w-[260px] object-contain select-none block dark:hidden"
            sizes="260px"
            priority
            draggable={false}
          />
          <Image
            src={assetPath("/logos/black_one-Photoroom.png")}
            alt="Shaman Tech"
            width={1150}
            height={250}
            className="h-12 w-[260px] object-contain select-none hidden dark:block"
            sizes="260px"
            priority
            draggable={false}
          />
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={navLinkClass(pathname === item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden text-on-surface border-2 border-on-surface p-1"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              {menuOpen ? (
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              ) : (
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen ? (
        <nav className="md:hidden border-t-4 border-on-surface bg-surface-container px-gutter py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={navLinkClass(pathname === item.href)}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
