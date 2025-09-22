"use client";

export type TOperatingSystem = "Mobile" | "Windows" | "MacOS" | "UNIX" | "Linux" | "Other";

function isMobileAgent(userAgent: string) {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(userAgent);
}

export const getOs = (): TOperatingSystem => {
  const userAgent = window.navigator.userAgent;

  const isMobile = isMobileAgent(userAgent)

  switch (true) {
    case isMobile:
      return "Mobile";
    case userAgent.indexOf("Win") != -1:
      return "Windows";
    case userAgent.indexOf("Mac") != -1:
      return "MacOS";
    case userAgent.indexOf("X11") != -1:
      return "UNIX";
    case userAgent.indexOf("Linux") != -1:
      return "Linux";
    default:
      return "Other";
  }
};
