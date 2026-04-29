"use client";

import { useEffect, useState } from "react";

export const CurrentYear = () => {
  const [year, setYear] = useState<number>();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return year;
};
