import Link from "next/link";
import { SITE_SOCIAL_LINKS } from "@/lib/social-links";

export function Footer() {
  return (
    <footer className="footer site-footer">
      <div className="footer-container site-footer-main">
        <div className="footer-logo site-footer-brand">
          <Link href="/#accueil">Mohamed SARE</Link>
          <p>
            Je suis développeur Full-Stack et Administateur Systèmes et Réseaux,
            actuellement étudiant en Génie Informatique. Je combine le
            développement logiciel, l’administration des systèmes et réseaux,
            ainsi que le design numérique pour concevoir des solutions
            technologiques fiables, performantes et évolutives. Orienté
            innovation et excellence technique, je m’adapte rapidement à des
            environnements variés et à des projets complexes, avec pour objectif
            constant de créer de la valeur, d’optimiser les performances et de
            livrer des produits numériques de niveau professionnel.
          </p>
        </div>
        <div className="footer-links site-footer-links">
          <h3>Liens rapides</h3>
          <ul>
            <li>
              <Link href="/#accueil">Accueil</Link>
            </li>
            <li>
              <Link href="/#apropos">À propos</Link>
            </li>
            <li>
              <Link href="/#projets">Projets</Link>
            </li>
            <li>
              <Link href="/#competences">Compétences</Link>
            </li>
            <li>
              <Link href="/#services">Services</Link>
            </li>
            <li>
              <Link href="/#tarifs">Tarifs</Link>
            </li>
            <li>
              <Link href="/#newsletter">Newsletter</Link>
            </li>
            <li>
              <Link href="/#contact">Contact</Link>
            </li>
            <li>
              <Link href="/confidentialite">Confidentialité</Link>
            </li>
          </ul>
        </div>
      </div>

      <nav
        className="footer-social-bar"
        aria-label="Réseaux sociaux"
      >
        <div className="footer-social-bar-inner">
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
        </div>
      </nav>

      <div className="footer-bottom site-footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Mohamed SARE. Tous droits réservés.
        </p>
        <button type="button" className="scroll-top" title="Remonter en haut">
          <i className="fas fa-arrow-up" />
        </button>
      </div>
    </footer>
  );
}
