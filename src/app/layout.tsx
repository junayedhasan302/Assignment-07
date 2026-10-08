
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Hind_Siliguri } from "next/font/google";
import Header from "@/components/Header";


const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bazar Dor",
  description: "Bazar Dor web app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn" className={`${hindSiliguri.className} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-bangla">
        <Header/>
        <main className="mx-auto w-full max-w-7xl">{children}</main>
      </body>
    </html>
  );
}