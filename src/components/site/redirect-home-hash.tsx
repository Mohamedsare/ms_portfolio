"use client";

import { useEffect } from "react";

/** Anciennes routes → une seule page avec ancre */
export function RedirectHomeHash({ section }: { section: string }) {
  useEffect(() => {
    window.location.replace(`/#${section}`);
  }, [section]);

  return (
    <p style={{ padding: "4rem", textAlign: "center" }}>
      Redirection vers l&apos;accueil…
    </p>
  );
}
