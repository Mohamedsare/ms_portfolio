import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Mohamed SARE",
  description:
    "Informations sur le traitement des données personnelles et la newsletter.",
};

export default function ConfidentialitePage() {
  return (
    <section className="article-detail">
      <div className="container max-w-3xl py-28">
        <h1 className="section-title mb-8 text-left">Politique de confidentialité</h1>
        <div className="prose prose-invert max-w-none space-y-4 text-[var(--text-secondary)]">
          <p>
            Cette page décrit comment vos données peuvent être collectées et utilisées
            lorsque vous utilisez ce site ou que vous vous inscrivez à la newsletter.
          </p>
          <p>
            <strong className="text-[var(--text-primary)]">Newsletter.</strong> Lors de
            l’inscription, nous enregistrons votre nom, votre adresse e-mail et la
            preuve de votre consentement aux e-mails marketing. Vous pouvez retirer ce
            consentement à tout moment (lien de désabonnement dans les e-mails ou
            contact direct).
          </p>
          <p>
            <strong className="text-[var(--text-primary)]">Contact.</strong> Les
            messages envoyés via le formulaire sont stockés afin de pouvoir vous
            répondre ; ils ne sont pas publiés.
          </p>
          <p>
            Pour toute question relative à vos données, écrivez-moi via la section{" "}
            <Link href="/#contact" className="text-[var(--primary-color)] underline">
              Contact
            </Link>
            .
          </p>
        </div>
        <p className="mt-10">
          <Link href="/" className="text-[var(--primary-color)] hover:underline">
            ← Retour à l’accueil
          </Link>
        </p>
      </div>
    </section>
  );
}
