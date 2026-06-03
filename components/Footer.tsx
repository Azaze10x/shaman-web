import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "PRODUCTS", href: "/products" },
  { label: "INFO", href: "/info" },
  { label: "CONTACT", href: "/contact" },
] as const;

const footerLinkClass =
  "font-label-sm text-label-sm tracking-widest text-on-primary font-bold uppercase transition-colors hover:text-primary-fixed-dim";

export default function Footer() {
  return (
    <footer className="bg-on-primary-fixed border-t-8 border-double border-outline mt-auto w-full">
      <div className="flex flex-col items-center justify-center py-12 gap-unit w-full max-w-container-max mx-auto px-gutter">
        <Link href="/" className="block shrink-0 mb-4 float-8bit">
          <Image
            src="/logos/black_one-Photoroom.png"
            alt="Shaman Tech"
            width={1150}
            height={250}
            className="h-12 w-[260px] object-contain"
            sizes="260px"
            priority
          />
        </Link>
        <nav className="flex flex-wrap justify-center gap-6 mb-8">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className={footerLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="font-label-sm text-label-sm tracking-widest text-primary-fixed uppercase">
          &copy;1989 SHAMAN TECHNOLOGY - ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
}
