"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "START", href: "/" },
  { label: "Products", href: "/products" },
  { label: "INFO", href: "/info" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-surface-container border-b-4 border-on-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
      <div className="flex justify-between items-center px-gutter py-4 w-full max-w-container-max mx-auto">
        <Link href="/" className="block shrink-0 float-8bit">
          <Image
            src="/logos/white_one-Photoroom.png"
            alt="Shaman Tech"
            width={1150}
            height={260}
            className="h-12 w-[260px] object-contain"
            sizes="260px"
            priority
          />
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`font-label-md text-label-md uppercase px-2 py-1 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none ${
                  isActive
                    ? "text-secondary-container bg-on-secondary-fixed-variant"
                    : "text-on-surface hover:text-secondary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button className="md:hidden text-on-surface">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
