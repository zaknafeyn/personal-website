import { Ubuntu_Mono } from "next/font/google";

export const ubuntuMono = Ubuntu_Mono({
  weight: ["400", "700"],
  variable: "--font-ubuntu",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["monospace"],
  subsets: ["latin"],
});
