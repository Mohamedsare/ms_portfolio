import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container" style={{ padding: "6rem 1rem", textAlign: "center" }}>
      <h1 className="section-title" style={{ marginBottom: "1rem" }}>
        Page <span>introuvable</span>
      </h1>
      <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
        La page demandée n&apos;existe pas ou a été déplacée.
      </p>
      <Link href="/" className="main-btn">
        <i className="fas fa-home" />
        <span>Retour à l&apos;accueil</span>
      </Link>
    </section>
  );
}
