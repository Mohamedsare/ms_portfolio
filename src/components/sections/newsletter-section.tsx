"use client";

import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { SITE_SOCIAL_LINKS } from "@/lib/social-links";

export function NewsletterSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFeedback(null);

    if (!consent) {
      setFeedback({
        type: "error",
        text: "Veuillez accepter la réception d’e-mails marketing pour continuer.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ fullName, email, marketingConsent: consent }),
      });
      const data = (await res.json()) as { success?: boolean; message?: string };

      if (data.success) {
        setFeedback({
          type: "success",
          text: data.message ?? "Inscription enregistrée.",
        });
        setFullName("");
        setEmail("");
        setConsent(false);
      } else {
        setFeedback({
          type: "error",
          text: data.message ?? "Une erreur est survenue.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        text: "Impossible de contacter le serveur. Réessayez plus tard.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="newsletter"
      className="newsletter-section newsletter-parallax no-scroll-animate relative isolate flex w-full flex-col items-center px-4 py-16 md:min-h-[min(92vh,56rem)] md:py-28"
    >
      <div className="newsletter-inner w-full max-w-lg shrink-0">
        <div className="newsletter-card-panel shadow-[0_25px_80px_-12px_rgba(0,0,0,0.45)] ring-1 ring-zinc-200/80">
          <header className="newsletter-card-header">
            <div className="newsletter-icon-wrap" aria-hidden>
              <Mail className="h-8 w-8" strokeWidth={2} />
            </div>
            <h2 className="newsletter-card-title m-0 w-full text-2xl font-bold tracking-tight sm:text-3xl">
              Restez informé
            </h2>
            <p className="newsletter-card-desc m-0 mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed">
              Recevez mes derniers articles, conseils techniques et offres exclusives
              directement dans votre boîte mail. Newsletter mensuelle, désabonnement
              facile.
            </p>
          </header>

          <form className="newsletter-form-stack" onSubmit={onSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex min-w-0 flex-col gap-1.5">
                <label
                  htmlFor="newsletter-name"
                  className="newsletter-field-label text-sm font-semibold"
                >
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  id="newsletter-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Votre nom complet"
                  className="newsletter-input w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/25"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-1.5">
                <label
                  htmlFor="newsletter-email"
                  className="newsletter-field-label text-sm font-semibold"
                >
                  Adresse email <span className="text-red-500">*</span>
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="newsletter-input w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/25"
                />
              </div>
            </div>

            <label className="newsletter-checkbox-label flex cursor-pointer items-start gap-3 rounded-lg py-0.5 text-sm leading-snug sm:pl-0.5">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="newsletter-checkbox mt-1 h-4 w-4 shrink-0 rounded border-zinc-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
              />
              <span>
                J&apos;accepte de recevoir des e-mails marketing, conformément à la{" "}
                <Link
                  href="/confidentialite"
                  className="font-medium text-[var(--primary-color)] underline-offset-2 hover:underline"
                >
                  politique de confidentialité
                </Link>
                .
              </span>
            </label>

            {feedback && (
              <p
                role="alert"
                className={
                  feedback.type === "success"
                    ? "newsletter-feedback newsletter-feedback-success rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm"
                    : "newsletter-feedback newsletter-feedback-error rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm"
                }
              >
                {feedback.text}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="newsletter-submit inline-flex items-center gap-2"
            >
              <Send className="h-5 w-5 shrink-0" aria-hidden />
              {loading ? "Inscription…" : "S'inscrire à la newsletter"}
            </button>
          </form>
        </div>

        <div className="newsletter-social-wrap">
          <nav className="newsletter-social-nav" aria-label="Réseaux sociaux">
            {SITE_SOCIAL_LINKS.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                title={label}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="footer-social-icon"
              >
                <i className={icon} aria-hidden />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
