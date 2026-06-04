import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Customization | SHAMAN TECHNOLOGY",
  description:
    "Custom apps, AI platforms, SaaS delivery, and themed experiences—bespoke builds and full customization from Shaman Tech.",
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
