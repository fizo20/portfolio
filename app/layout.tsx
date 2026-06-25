import type { Metadata } from "next";
import { Inter } from "next/font/google";
// @ts-ignore: CSS side-effect import type declarations not found
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kareem Abdulafeez Tosin — Fullstack Developer",
  description:
    "Fullstack developer building production-grade AI products — from database to deployment.",
  openGraph: {
    title: "Kareem Abdulafeez Tosin — Fullstack Developer",
    description: "Fullstack developer building production-grade AI products.",
    url: "https://portfolio-fizo20s-projects.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
