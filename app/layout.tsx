import type { Metadata } from "next";
import { Anybody, JetBrains_Mono, Courier_Prime } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FooterRunner from "@/components/FooterRunner";
import ScanlinesOverlay from "@/components/ScanlinesOverlay";
import ImageProtection from "@/components/ImageProtection";

const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["700"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://shamantech.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SHAMAN TECHNOLOGY",
  description:
    "We summon worlds out of code — apps, platforms, and games, each with its own kind of magic.",
  openGraph: {
    title: "SHAMAN TECHNOLOGY",
    description:
      "We summon worlds out of code — apps, platforms, and games, each with its own kind of magic.",
    url: siteUrl,
    siteName: "Shaman Technology",
    type: "website",
    images: [
      {
        url: "/og-2.png",
        width: 1200,
        height: 630,
        alt: "Shaman Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHAMAN TECHNOLOGY",
    description:
      "We summon worlds out of code — apps, platforms, and games, each with its own kind of magic.",
    images: ["/og-2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anybody.variable} ${jetbrainsMono.variable} ${courierPrime.variable}`}
    >
      <head>
        {/* Apply saved/OS theme before first paint to avoid a flash (FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-body-md antialiased min-h-screen flex flex-col selection:bg-secondary-container selection:text-on-secondary">
        <ScanlinesOverlay />
        <ImageProtection />
        <Header />
        <main className="flex-grow flex flex-col items-center w-full max-w-container-max mx-auto px-gutter py-12 gap-16">
          {children}
        </main>
        <FooterRunner />
        <Footer />
      </body>
    </html>
  );
}
