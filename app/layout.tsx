import type { Metadata } from "next";
import { Anybody, JetBrains_Mono, Courier_Prime } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScanlinesOverlay from "@/components/ScanlinesOverlay";

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

export const metadata: Metadata = {
  title: "SHAMAN TECHNOLOGY",
  description: "Upgrade your systems with superior technology. Experience the 8-bit power of the 21st century.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anybody.variable} ${jetbrainsMono.variable} ${courierPrime.variable}`}
    >
      <body className="font-body-md antialiased min-h-screen flex flex-col selection:bg-secondary-container selection:text-on-secondary">
        <ScanlinesOverlay />
        <Header />
        <main className="flex-grow flex flex-col items-center w-full max-w-container-max mx-auto px-gutter py-12 gap-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
