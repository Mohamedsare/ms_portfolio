import { getSupabaseServer } from "@/lib/supabase/server";

export type ArticleRow = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string | null;
  category: string;
  author: string | null;
  published_date: string;
  is_published: boolean;
  views_count: number | null;
};

export type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image_url: string | null;
  category: string;
  status: string;
  technologies: string | null;
  github_url: string | null;
  live_url: string | null;
  demo_url: string | null;
  start_date: string | null;
  end_date: string | null;
  featured: boolean | null;
  order: number | null;
  views_count: number | null;
  created_at?: string;
};

export type SkillCategoryRow = {
  id: string;
  name: string;
  description: string | null;
  order: number | null;
  is_active: boolean | null;
};

export type SkillRow = {
  id: string;
  category_id: string;
  name: string;
  skill_type: string;
  percentage: number;
  order: number | null;
  is_active: boolean | null;
};

export async function fetchLatestArticles(limit = 3): Promise<ArticleRow[]> {
  const sb = getSupabaseServer();
  if (!sb) return [];
  const now = new Date().toISOString();
  const { data, error } = await sb
    .from("articles")
    .select("*")
    .eq("is_published", true)
    .lte("published_date", now)
    .order("published_date", { ascending: false })
    .limit(limit);
  if (error) return [];
  return (data ?? []) as ArticleRow[];
}

export async function fetchArticleBySlug(
  slug: string,
): Promise<ArticleRow | null> {
  const sb = getSupabaseServer();
  if (!sb) return null;
  const { data, error } = await sb
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error || !data) return null;
  return data as ArticleRow;
}

export async function fetchSimilarArticles(
  category: string,
  excludeSlug: string,
  limit = 3,
): Promise<ArticleRow[]> {
  const sb = getSupabaseServer();
  if (!sb) return [];
  const { data, error } = await sb
    .from("articles")
    .select("*")
    .eq("category", category)
    .eq("is_published", true)
    .neq("slug", excludeSlug)
    .order("published_date", { ascending: false })
    .limit(limit);
  if (error) return [];
  return (data ?? []) as ArticleRow[];
}

export async function fetchProjects(): Promise<ProjectRow[]> {
  const sb = getSupabaseServer();
  if (!sb) return [];
  const { data, error } = await sb
    .from("projects")
    .select("*")
    .order("order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as ProjectRow[];
}

export async function fetchProjectBySlug(
  slug: string,
): Promise<ProjectRow | null> {
  const sb = getSupabaseServer();
  if (!sb) return null;
  const { data, error } = await sb
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return data as ProjectRow;
}

export async function fetchSimilarProjects(
  category: string,
  excludeSlug: string,
  limit = 3,
): Promise<ProjectRow[]> {
  const sb = getSupabaseServer();
  if (!sb) return [];
  const { data, error } = await sb
    .from("projects")
    .select("*")
    .eq("category", category)
    .neq("slug", excludeSlug)
    .order("order", { ascending: true })
    .limit(limit);
  if (error) return [];
  return (data ?? []) as ProjectRow[];
}

export async function fetchSkillsGrouped(): Promise<{
  bar: Map<string, { category: SkillCategoryRow; skills: SkillRow[] }>;
  circle: Map<string, { category: SkillCategoryRow; skills: SkillRow[] }>;
}> {
  const sb = getSupabaseServer();
  const bar = new Map<
    string,
    { category: SkillCategoryRow; skills: SkillRow[] }
  >();
  const circle = new Map<
    string,
    { category: SkillCategoryRow; skills: SkillRow[] }
  >();
  if (!sb) return { bar, circle };

  const { data: categories, error: catErr } = await sb
    .from("skill_categories")
    .select("*")
    .eq("is_active", true)
    .order("order", { ascending: true })
    .order("name", { ascending: true });
  if (catErr || !categories?.length) return { bar, circle };

  const { data: skills, error: skErr } = await sb
    .from("skills")
    .select("*")
    .eq("is_active", true)
    .order("order", { ascending: true })
    .order("name", { ascending: true });
  if (skErr || !skills) return { bar, circle };

  const catMap = new Map(
    (categories as SkillCategoryRow[]).map((c) => [c.id, c]),
  );

  for (const s of skills as SkillRow[]) {
    const cat = catMap.get(s.category_id);
    if (!cat) continue;
    const target = s.skill_type === "circle" ? circle : bar;
    const cur = target.get(cat.id) ?? { category: cat, skills: [] };
    cur.skills.push(s);
    target.set(cat.id, cur);
  }

  return { bar, circle };
}
