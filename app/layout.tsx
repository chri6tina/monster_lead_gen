import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.monsterleadgen.com'),
  title: "Lead Monster | B2B Prospect Data Broker",
  description: "Download verified B2B prospect lists for your local territory. Get direct emails and phone numbers to close more commercial contracts.",
  verification: {
    google: "cGMzbv_GcKZ8OpMZhpVmC9BNKTlVkVL_eiBEv7C9_Bw",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0f18] text-slate-100 relative selection:bg-lime-500/30">
        {children}
      </body>
    </html>
  );
}
