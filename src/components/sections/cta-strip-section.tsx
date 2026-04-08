import Link from "next/link";

const WHATSAPP_HREF =
  "https://wa.me/212771668069?text=" +
  encodeURIComponent(
    "Bonjour, je souhaite échanger au sujet d'un projet. Pouvez-vous me recontacter ?",
  );

export function CtaStripSection() {
  return (
    <section
      id="cta-projet"
      className="cta-strip-section cta-strip-parallax no-scroll-animate relative isolate flex w-full flex-col items-center px-4 py-16 md:min-h-[min(85vh,48rem)] md:py-24"
    >
      <div className="cta-strip-inner flex w-full max-w-4xl shrink-0 flex-col items-center text-center">
        <div className="cta-strip-card w-full">
          <p className="cta-strip-eyebrow m-0 mb-4 flex flex-wrap items-center justify-center gap-x-2 text-[0.7rem] font-bold uppercase sm:text-xs">
            <span className="cta-strip-eyebrow-accent" aria-hidden>
              ●
            </span>
            <span>
              <span className="cta-strip-eyebrow-accent">IA</span>
              <span className="text-white/45"> · </span>
              <span>digital &amp; sur mesure</span>
            </span>
          </p>

          <h2 className="cta-strip-title m-0 text-2xl font-bold leading-[1.15] tracking-tight sm:text-3xl md:text-[2.15rem]">
            Prêt à transformer votre{" "}
            <span className="cta-strip-title-gradient">projet</span> ?
          </h2>

          <p className="cta-strip-lead mx-auto mt-5 max-w-2xl text-[0.95rem] leading-relaxed md:text-lg">
            Ne laissez pas vos idées rester des idées. Contactez-moi dès aujourd&apos;hui
            pour discuter de votre projet et découvrir comment je peux vous aider à
            atteindre vos objectifs digitaux.
          </p>

          <div className="cta-strip-actions mt-10 flex flex-col items-stretch justify-center gap-3.5 sm:mt-11 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Link
              href="/#contact"
              className="cta-btn cta-btn-chat inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white"
            >
              <i className="fas fa-comments text-sm" aria-hidden />
              <span className="text-xs sm:text-[0.8125rem]">Discutons de votre projet</span>
              <i className="fas fa-arrow-right text-xs opacity-90 sm:text-[0.8125rem]" aria-hidden />
            </Link>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-whatsapp self-center sm:self-auto"
              aria-label="Écrire sur WhatsApp"
            >
              <i className="fab fa-whatsapp" aria-hidden />
            </a>
          </div>

          <div className="cta-strip-divider-gradient mx-auto mt-12" aria-hidden />

          <ul className="cta-strip-trust mx-auto mt-8 flex max-w-3xl flex-col flex-wrap items-center justify-center gap-3 sm:flex-row sm:gap-3 md:text-[0.95rem]">
            <li>
              <span className="cta-strip-trust-pill">
                <span aria-hidden>⚡</span>
                <span>Réponse garantie sous 24h</span>
              </span>
            </li>
            <li>
              <span className="cta-strip-trust-pill">
                <span aria-hidden>🌍</span>
                <span>Disponible partout dans le monde</span>
              </span>
            </li>
            <li>
              <span className="cta-strip-trust-pill">
                <span aria-hidden>🎯</span>
                <span>Solutions sur mesure</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
