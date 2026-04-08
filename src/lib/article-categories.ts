export const ARTICLE_CATEGORY_LABELS: Record<string, string> = {
  web: "Développement Web",
  design: "Design & UX",
  tech: "Technologies",
  tips: "Conseils & Astuces",
  news: "Actualités",
};

export function articleCategoryLabel(code: string): string {
  return ARTICLE_CATEGORY_LABELS[code] ?? code;
}
