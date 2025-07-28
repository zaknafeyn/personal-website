import type { Metadata } from "next";
import type { Viewport } from 'next'

import { Roboto_Mono } from "next/font/google";

import { Providers } from './providers'
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});
 
export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "Valentyn Radchuk - Full Stack Software Engineer",
  description: "Personal web site",
  applicationName: "Valentyn Radchuk - personal website",
  authors: { url: "https://github.com/zaknafeyn", name: "Valentyn Radchuk" },
  generator: "next.js",
  keywords: ["react", "nextjs", "personal website", "Valentyn", "Radchuk"],
  robots: { index: true, follow: true },
  manifest: './manifest.json'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoMono.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
