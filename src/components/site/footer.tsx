import { SITE_SOCIAL_LINKS } from "@/lib/social-links";

export function Footer() {
  return (
    <footer className="footer site-footer">
      <div className="footer-container site-footer-main">
        <div className="footer-logo site-footer-brand">
          <a href="/#accueil">Mohamed SARE</a>
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
              <a href="/#accueil">Accueil</a>
            </li>
            <li>
              <a href="/#apropos">À propos</a>
            </li>
            <li>
              <a href="/#projets">Projets</a>
            </li>
            <li>
              <a href="/#competences">Compétences</a>
            </li>
            <li>
              <a href="/#services">Services</a>
            </li>
            <li>
              <a href="/#tarifs">Tarifs</a>
            </li>
            <li>
              <a href="/#newsletter">Newsletter</a>
            </li>
            <li>
              <a href="/#contact">Contact</a>
            </li>
            <li>
              <a href="/confidentialite">Confidentialité</a>
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
