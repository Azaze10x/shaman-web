import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Catalog | SHAMAN TECHNOLOGY",
  description:
    "Browse Shaman Technology products — CoinRoom, M-Factory, ML, MYC, SS, and TT.",
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
