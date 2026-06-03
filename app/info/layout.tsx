import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Info | SHAMAN TECHNOLOGY",
  description:
    "Vision, mission, and approach—how Shaman Tech builds themed software, AI platforms, and games.",
};

export default function InfoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
