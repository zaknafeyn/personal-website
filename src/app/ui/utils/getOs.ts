"use client";

export type TOperatingSystem = "Windows" | "MacOS" | "UNIX" | "Linux" | "Other";

export const getOs = (): TOperatingSystem => {
  const userAgent = window.navigator.userAgent;

  switch (true) {
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
