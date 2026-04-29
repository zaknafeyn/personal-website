import type { Metadata } from "next";
import type { Viewport } from 'next'

import { Providers } from './providers'
import "./globals.css";
import { ubuntuMono } from "../utils/getFonts";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const siteUrl = "https://vradchuk.info";
const siteTitle = "Valentyn Radchuk - Full Stack Software Engineer";
const siteDescription =
  "Personal website of Valentyn Radchuk, a full stack software engineer.";
const previewImage = "https://github.com/zaknafeyn.png?size=1200";

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "Valentyn Radchuk - personal website",
  authors: { url: "https://github.com/zaknafeyn", name: "Valentyn Radchuk" },
  generator: "next.js",
  keywords: ["react", "nextjs", "personal website", "Valentyn", "Radchuk"],
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Valentyn Radchuk",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 1200,
        alt: "Valentyn Radchuk",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: previewImage,
        alt: "Valentyn Radchuk",
      },
    ],
  },
  manifest: './manifest.json'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntuMono.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
