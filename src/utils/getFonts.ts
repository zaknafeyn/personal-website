import localFont from "next/font/local";

export const ubuntuMono = localFont({
  src: [
    {
      path: "../../public/fonts/ubuntu-mono-latin-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ubuntu-mono-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ubuntu",
  display: "swap",
  preload: true,
  fallback: ["monospace"],
});
