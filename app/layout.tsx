import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kareem Tosin — Fullstack Developer",
  description: "Fullstack developer building production-grade AI products — from database to deployment.",
  openGraph: {
    title: "Kareem Tosin — Fullstack Developer",
    description: "Fullstack developer building production-grade AI products.",
    url: "https://kareemdeveloper.vercel.app",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
