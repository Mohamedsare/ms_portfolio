"use client";

import Script from "next/script";
import { HashScroll } from "@/components/site/hash-scroll";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { PageMotion } from "@/components/site/page-motion";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="loader">
        <div className="loader-text">
          {["M", "O", "H", "A", "M", "E", "D", " ", " ", "S", "A", "R", "E"].map(
            (ch, i) => (
              <span key={i} className="letter">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ),
          )}
        </div>
      </div>
      <div className="cursor" />
      <div className="cursor-follower" />
      <Navbar />
      <HashScroll />
      <main>
        <PageMotion>{children}</PageMotion>
      </main>
      <Footer />
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}
