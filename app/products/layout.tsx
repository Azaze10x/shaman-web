import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Catalog | SHAMAN TECHNOLOGY",
  description:
    "Browse Shaman Technology products — AI, robotics, and cloud network solutions.",
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
