type PricingPlan = {
  id: string;
  title: string;
  priceEur: number;
  priceXaf: number;
  popular?: boolean;
  features: string[];
  ctaPrimary?: boolean;
};

const PLANS: PricingPlan[] = [
  {
    id: "vitrine",
    title: "Site web vitrine",
    priceEur: 230,
    priceXaf: 150_880,
    popular: true,
    ctaPrimary: true,
    features: [
      "Site responsive",
      "Nom de domaine (2 ans)",
      "Hébergement web (2 ans)",
      "5 e-mails professionnels",
      "Base de données MySQL",
      "SEO de base",
      "Indexation Google / Bing",
      "Formulaire de contact",
      "Support technique 3 mois",
      "Formation 1 h",
    ],
  },
  {
    id: "ecommerce",
    title: "Site web e-commerce",
    priceEur: 459,
    priceXaf: 301_104,
    features: [
      "Site e-commerce complet",
      "Nom de domaine & hébergement (2 ans)",
      "10 e-mails professionnels",
      "MySQL / PostgreSQL",
      "Système de paiement sécurisé",
      "Gestion des stocks & commandes",
      "SEO avancé",
      "Indexation Google / Bing",
      "Support technique 6 mois",
      "Formation administrateur 2 h",
    ],
  },
  {
    id: "app-web",
    title: "Application web",
    priceEur: 619,
    priceXaf: 406_064,
    popular: true,
    ctaPrimary: true,
    features: [
      "Application web sur mesure",
      "Nom de domaine & hébergement (2 ans)",
      "PostgreSQL / MySQL",
      "Gestion des niveaux d’accès",
      "API REST sécurisée",
      "Authentification utilisateurs",
      "Tableau de bord administrateur",
      "Optimisation des performances",
      "Support technique 6 mois",
      "Formation administrateur 3 h",
    ],
  },
  {
    id: "app-mobile",
    title: "Application mobile",
    priceEur: 686,
    priceXaf: 450_016,
    features: [
      "Application mobile cross-platform (Android / iOS)",
      "Publication Google Play & App Store",
      "Base cloud (Firebase / Supabase)",
      "Synchronisation multi-appareils",
      "Notifications push",
      "Support technique 6 mois",
      "Formation 1 h",
    ],
  },
  {
    id: "ia",
    title: "Solution IA",
    priceEur: 915,
    priceXaf: 600_240,
    features: [
      "Développement de modèle IA sur mesure",
      "Intégration d’API (ChatGPT, Claude, etc.)",
      "Interface utilisateur intuitive",
      "Base de données optimisée",
      "Automatisation des processus",
      "Rapports & analytique",
      "Support technique 12 mois",
      "Formation 2 h",
    ],
  },
  {
    id: "excel",
    title: "Formation Excel",
    priceEur: 115,
    priceXaf: 75_440,
    popular: true,
    ctaPrimary: true,
    features: [
      "Formation sur mesure sur 4 semaines",
      "3 séances de 3 h par semaine",
      "Supports de cours complets",
      "Exercices pratiques",
      "Suivi personnalisé",
      "Support post-formation 1 mois",
    ],
  },
  {
    id: "formation-dev",
    title: "Formation développement",
    priceEur: 250,
    priceXaf: 164_000,
    popular: true,
    ctaPrimary: true,
    features: [
      "Formation développement web ou mobile",
      "Durée jusqu’à 6 mois",
      "3 séances de 4 h par semaine",
      "Pédagogie par projets",
      "Supports de cours complets",
      "Environnement de développement",
      "Suivi personnalisé",
      "Projet final encadré",
      "Support post-formation 2 mois",
    ],
  },
  {
    id: "pack-complet",
    title: "Pack complet",
    priceEur: 1835,
    priceXaf: 1_203_760,
    features: [
      "Site web + application mobile",
      "Solution IA intégrée",
      "Formation Excel incluse",
      "Nom de domaine & hébergement (2 ans)",
      "Publication App Store & Play Store",
      "Base complète (SQL ou cloud)",
      "Synchronisation multi-appareils",
      "SEO avancé",
      "Support technique 12 mois",
      "Formation complète 6 h",
    ],
  },
];

function formatXaf(n: number): string {
  return n.toLocaleString("fr-FR");
}

export function PricingSection() {
  return (
    <section id="tarifs" className="pricing-section">
      <div className="container">
        <h2 className="section-title">
          Mes offres &amp; <span>tarifs</span>
        </h2>
        <p className="pricing-intro">
          Des solutions adaptées à tous les budgets et besoins. Tarifs
          transparents avec accompagnement personnalisé et support technique
          inclus. Prenez contact pour tout besoin de devis personnalisé.
        </p>

        <div className="pricing-grid">
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              className={`pricing-card${plan.popular ? " pricing-card-popular" : ""}`}
            >
              {plan.popular && (
                <span className="pricing-badge">Populaire</span>
              )}
              <h3 className="pricing-card-title">{plan.title}</h3>
              <p className="pricing-from">À partir de</p>
              <p className="pricing-eur">
                {plan.priceEur}
                <span className="pricing-currency">€</span>
              </p>
              <p className="pricing-xaf">
                ({formatXaf(plan.priceXaf)} F CFA)
              </p>
              <ul className="pricing-features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <i className="fas fa-check" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/#contact"
                className={
                  plan.ctaPrimary ? "pricing-btn pricing-btn-primary" : "pricing-btn pricing-btn-outline"
                }
              >
                Commander
              </a>
            </article>
          ))}
        </div>

        <div className="pricing-footer-cta">
          <p className="pricing-footer-text">Besoin d&apos;une solution sur mesure ?</p>
          <a href="/#contact" className="pricing-btn pricing-btn-ghost">
            <i className="fas fa-comments" aria-hidden />
            Demander un devis personnalisé
          </a>
        </div>
      </div>
    </section>
  );
}
