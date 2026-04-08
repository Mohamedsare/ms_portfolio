"use client";

import { useState } from "react";

type ServiceDef = {
  id: string;
  label: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  /** Variante visuelle du panneau droit */
  art: "web" | "mobile" | "ai" | "project" | "data" | "marketing" | "consulting";
};

const SERVICES: ServiceDef[] = [
  {
    id: "web",
    label: "Développement web",
    icon: "fa-code",
    title: "Développement web",
    description:
      "Création de sites vitrines, plateformes métiers et applications web progressives, avec une attention particulière aux performances, à l’accessibilité et au référencement. Intégration d’APIs, interfaces réactives et expériences utilisateur soignées du wireframe à la mise en production.",
    tags: [
      "HTML5 / CSS3",
      "JavaScript / TypeScript",
      "React",
      "Next.js",
      "Django",
      "REST / GraphQL",
      "Tailwind CSS",
      "SEO technique",
    ],
    art: "web",
  },
  {
    id: "mobile",
    label: "Développement mobile",
    icon: "fa-mobile-screen-button",
    title: "Développement mobile",
    description:
      "Conception d’applications mobiles natives ou cross-platform, adaptées aux contraintes d’ergonomie et de connectivité. Parcours utilisateur fluides, synchronisation de données et publication sur les stores avec une base de code maintenable.",
    tags: [
      "React Native",
      "PWA",
      "API mobiles",
      "UI mobile",
      "Tests",
      "CI/CD",
    ],
    art: "mobile",
  },
  {
    id: "ai",
    label: "Intelligence Artificielle",
    icon: "fa-brain",
    title: "Intelligence Artificielle",
    description:
      "Intégration de modèles d’IA et d’automatisation intelligente dans vos processus : classification, recommandations, traitement du langage ou vision. Je vous aide à définir un périmètre réaliste, à préparer les données et à industrialiser une solution fiable et éthique.",
    tags: [
      "Python",
      "scikit-learn",
      "APIs ML",
      "NLP",
      "Automatisation",
      "MLOps (bases)",
    ],
    art: "ai",
  },
  {
    id: "projets",
    label: "Gestion de projets Informatiques",
    icon: "fa-gears",
    title: "Gestion de projets informatiques",
    description:
      "Pilotage de projets IT de la phase d’expression du besoin à la livraison : planification, gestion des risques, communication avec les parties prenantes et alignement technique / métier. Méthodes agiles ou cycle en V selon le contexte, avec des livrables clairs et traçables.",
    tags: [
      "Agile / Scrum",
      "Planification",
      "Gestion des risques",
      "Documentation",
      "Revues de code",
      "Recette",
    ],
    art: "project",
  },
  {
    id: "data",
    label: "Analyse de données",
    icon: "fa-chart-column",
    title: "Analyse de données",
    description:
      "Transformation de vos données en insights actionnables grâce à des analyses approfondies et des visualisations interactives. Expertise en automatisation des processus, création de tableaux de bord dynamiques et modélisation prédictive. Optimisation de vos prises de décision avec des outils comme Excel, Power BI et Python, pour une approche data-driven.",
    tags: [
      "Microsoft Excel 2019",
      "VBA",
      "Power Query",
      "Power Pivot",
      "Formules avancées",
      "Tableaux croisés dynamiques",
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "scikit-learn",
      "Power BI",
      "SQL",
    ],
    art: "data",
  },
  {
    id: "marketing",
    label: "Stratégie digitale et marketing en ligne",
    icon: "fa-magnifying-glass-chart",
    title: "Stratégie digitale et marketing en ligne",
    description:
      "Définition d’une présence en ligne cohérente avec vos objectifs business : audit de visibilité, structuration des contenus, analytics et amélioration continue. Accompagnement sur le référencement naturel, les campagnes mesurables et l’optimisation des parcours de conversion.",
    tags: [
      "SEO",
      "Analytics",
      "Contenus",
      "SEA (bases)",
      "Réseaux sociaux",
      "Funnel",
    ],
    art: "marketing",
  },
  {
    id: "conseil",
    label: "Conseil en transformation digitale",
    icon: "fa-briefcase",
    title: "Conseil en transformation digitale",
    description:
      "Accompagnement des organisations dans l’adoption de nouveaux outils et processus numériques : diagnostic, priorisation des chantiers, conduite du changement et formation des équipes. Vision à moyen terme pour sécuriser vos investissements technologiques.",
    tags: [
      "Audit SI",
      "Roadmap",
      "Change management",
      "Formation",
      "Sécurité (sensibilisation)",
      "Gouvernance données",
    ],
    art: "consulting",
  },
];

function ServiceArt({ variant }: { variant: ServiceDef["art"] }) {
  const primary = "#6c63ff";
  const muted = "#94a3b8";
  const dark = "#1e293b";

  return (
    <div className="service-panel-art" aria-hidden>
      <svg
        viewBox="0 0 320 240"
        className="service-panel-art-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="320" height="240" rx="16" fill="#f8fafc" />
        {variant === "data" && (
          <>
            <rect x="40" y="40" width="100" height="70" rx="8" fill="#fff" stroke={muted} />
            <path
              d="M52 95 L70 72 L88 82 L106 58 L124 68"
              fill="none"
              stroke={primary}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <rect x="155" y="45" width="50" height="50" rx="25" fill="none" stroke={primary} strokeWidth="8" strokeDasharray="78 40" transform="rotate(-90 180 70)" />
            <rect x="220" y="50" width="16" height="55" rx="4" fill={primary} opacity="0.35" />
            <rect x="244" y="35" width="16" height="70" rx="4" fill={primary} />
            <rect x="268" y="60" width="16" height="45" rx="4" fill={dark} opacity="0.4" />
            <rect x="40" y="130" width="240" height="70" rx="8" fill="#fff" stroke={muted} />
            <rect x="56" y="175" width="40" height="18" rx="3" fill={primary} opacity="0.5" />
            <rect x="104" y="165" width="40" height="28" rx="3" fill={primary} opacity="0.75" />
            <rect x="152" y="155" width="40" height="38" rx="3" fill={primary} />
            <circle cx="90" cy="152" r="14" fill={primary} opacity="0.2" />
            <circle cx="90" cy="152" r="6" fill={primary} />
          </>
        )}
        {variant === "web" && (
          <>
            <rect x="60" y="50" width="200" height="130" rx="10" fill="#fff" stroke={muted} />
            <path d="M60 75 H260" stroke={primary} strokeWidth="2" />
            <circle cx="78" cy="62" r="4" fill="#ef4444" />
            <circle cx="94" cy="62" r="4" fill="#eab308" />
            <circle cx="110" cy="62" r="4" fill="#22c55e" />
            <text x="160" y="130" textAnchor="middle" fill={primary} fontSize="28" fontFamily="monospace" fontWeight="bold">
              {"</>"}
            </text>
          </>
        )}
        {variant === "mobile" && (
          <>
            <rect x="120" y="40" width="80" height="160" rx="14" fill={dark} />
            <rect x="128" y="52" width="64" height="120" rx="4" fill="#f1f5f9" />
            <circle cx="160" cy="182" r="6" fill={muted} />
            <rect x="138" y="68" width="44" height="8" rx="2" fill={primary} opacity="0.4" />
            <rect x="138" y="88" width="36" height="8" rx="2" fill={primary} opacity="0.25" />
          </>
        )}
        {variant === "ai" && (
          <>
            <path
              d="M160 48 C120 48 100 88 120 120 C100 152 140 188 160 188 C180 188 220 152 200 120 C220 88 200 48 160 48 Z"
              fill="none"
              stroke={primary}
              strokeWidth="3"
            />
            <circle cx="140" cy="100" r="8" fill={primary} />
            <circle cx="180" cy="100" r="8" fill={primary} />
            <path d="M130 135 Q160 155 190 135" fill="none" stroke={primary} strokeWidth="3" />
            <circle cx="160" cy="175" r="22" fill={primary} opacity="0.15" />
            <path d="M160 160 V190 M145 175 H175" stroke={primary} strokeWidth="3" />
          </>
        )}
        {variant === "project" && (
          <>
            <circle cx="100" cy="100" r="50" fill="none" stroke={primary} strokeWidth="4" strokeDasharray="8 6" />
            <rect x="180" y="60" width="90" height="90" rx="8" fill="#fff" stroke={muted} />
            <path d="M200 85 H250 M200 105 H240 M200 125 H245" stroke={primary} strokeWidth="3" strokeLinecap="round" />
            <polygon points="160,175 200,145 240,175 200,205" fill={primary} opacity="0.2" />
          </>
        )}
        {variant === "marketing" && (
          <>
            <circle cx="140" cy="110" r="50" fill="none" stroke={primary} strokeWidth="3" />
            <line x1="175" y1="145" x2="230" y2="185" stroke={primary} strokeWidth="4" strokeLinecap="round" />
            <rect x="230" y="175" width="24" height="24" rx="4" fill={primary} />
            <path d="M70 180 L100 140 L130 160 L170 100 L250 180" fill="none" stroke={dark} strokeWidth="2" opacity="0.3" />
          </>
        )}
        {variant === "consulting" && (
          <>
            <rect x="90" y="70" width="140" height="100" rx="8" fill="#fff" stroke={muted} />
            <path d="M110 95 H210 M110 115 H190 M110 135 H200" stroke={primary} strokeWidth="2" opacity="0.5" />
            <rect x="130" y="165" width="60" height="20" rx="4" fill={primary} />
            <path d="M160 50 L160 70" stroke={primary} strokeWidth="3" />
          </>
        )}
      </svg>
    </div>
  );
}

export function ServicesSection() {
  const [active, setActive] = useState(4);

  const current = SERVICES[active];

  return (
    <section id="services" className="services services-tabs-section">
      <div className="container">
        <h2 className="section-title">
          Mes <span>Services</span>
        </h2>
        <p className="services-intro">
          Solutions technologiques complètes pour accompagner votre transformation
          digitale. De la conception au déploiement, je vous propose des services
          adaptés à vos besoins spécifiques.
        </p>

        <div
          className="services-tablist"
          role="tablist"
          aria-label="Choisir un service"
        >
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`service-tab-${s.id}`}
              aria-selected={active === i}
              aria-controls={`service-panel-${s.id}`}
              className={`service-tab${active === i ? " service-tab-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <i className={`fas ${s.icon}`} aria-hidden />
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        <div
          className="service-detail-card"
          role="tabpanel"
          id={`service-panel-${current.id}`}
          aria-labelledby={`service-tab-${current.id}`}
        >
          <div className="service-detail-text">
            <h3 className="service-detail-title">{current.title}</h3>
            <p className="service-detail-desc">{current.description}</p>
            <h4 className="service-detail-sub">Technologies &amp; Outils</h4>
            <ul className="service-tag-list">
              {current.tags.map((tag) => (
                <li key={tag} className="service-tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="service-detail-visual">
            <ServiceArt variant={current.art} />
          </div>
        </div>
      </div>
    </section>
  );
}
