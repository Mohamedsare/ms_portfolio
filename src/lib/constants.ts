/** Libellés pour toutes les catégories (y compris celles sans bouton filtre). */
export const PROJECT_CATEGORY_LABELS: Record<string, string> = {
  web: "Application Web",
  mobile: "Application Mobile",
  desktop: "Application Desktop",
  design: "Design & UI/UX",
  ai: "Intelligence Artificielle",
  game: "Jeux Vidéo",
  other: "Autre",
};

/** Boutons de filtre sur la page projets (sans « Jeux Vidéo »). */
export const PROJECT_CATEGORIES: { code: string; label: string }[] = [
  "web",
  "mobile",
  "desktop",
  "design",
  "ai",
  "other",
].map((code) => ({ code, label: PROJECT_CATEGORY_LABELS[code] }));

export function projectCategoryLabel(code: string): string {
  return PROJECT_CATEGORY_LABELS[code] ?? code;
}

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  completed: "Terminé",
  in_progress: "En cours",
  planned: "Planifié",
  on_hold: "En pause",
};

export function technologiesList(technologies: string | null): string[] {
  if (!technologies) return [];
  return technologies
    .replace(/\n/g, ",")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
