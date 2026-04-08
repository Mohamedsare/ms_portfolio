"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Après navigation vers / avec #section (ex. depuis une page article). */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [pathname]);

  return null;
}
