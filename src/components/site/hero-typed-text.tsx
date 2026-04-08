"use client";

import { useEffect, useState } from "react";

/** Mêmes chaînes et délais que l’ancien main.js */
const TEXTS = [
  "Mohamed SARE",
  "Développeur Full-Stack",
  "Administrateur Systèmes",
  "Créateur de Projets Digitaux",
  "Intégrateur WordPress & SEO",
];

const TYPING_DELAY = 200;
const ERASING_DELAY = 100;
const NEW_TEXT_DELAY = 2000;

export function HeroTypedText() {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let cancelled = false;
    let textIndex = 0;
    let charIndex = 0;
    let tid: ReturnType<typeof setTimeout>;

    const schedule = (fn: () => void, ms: number) => {
      clearTimeout(tid);
      tid = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const typeStep = () => {
      const text = TEXTS[textIndex];
      if (charIndex < text.length) {
        setDisplay(text.slice(0, charIndex + 1));
        charIndex += 1;
        schedule(typeStep, TYPING_DELAY);
      } else {
        schedule(eraseStep, NEW_TEXT_DELAY);
      }
    };

    const eraseStep = () => {
      const text = TEXTS[textIndex];
      if (charIndex > 0) {
        setDisplay(text.slice(0, charIndex - 1));
        charIndex -= 1;
        schedule(eraseStep, ERASING_DELAY);
      } else {
        textIndex = (textIndex + 1) % TEXTS.length;
        schedule(typeStep, TYPING_DELAY + 1100);
      }
    };

    schedule(typeStep, NEW_TEXT_DELAY + 250);

    return () => {
      cancelled = true;
      clearTimeout(tid);
    };
  }, []);

  return (
    <>
      <span className="typed-text">{display}</span>
      <span className="cursor-blink">|</span>
    </>
  );
}
