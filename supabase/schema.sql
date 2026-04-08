-- Portfolio Next.js + Supabase — schéma aligné sur les modèles Django
-- Exécuter dans l’éditeur SQL Supabase (ou via CLI).

create extension if not exists "pgcrypto";

-- Articles
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null default '',
  content text not null default '',
  image_url text,
  category text not null default 'web',
  author text default 'Mohamed SARE',
  published_date timestamptz not null default now(),
  is_published boolean not null default true,
  views_count integer not null default 0
);

create index if not exists articles_published_date_idx on public.articles (published_date desc);

-- Projets
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null default '',
  description text not null default '',
  image_url text,
  category text not null default 'web',
  status text not null default 'completed',
  technologies text,
  github_url text,
  live_url text,
  demo_url text,
  start_date date,
  end_date date,
  featured boolean not null default false,
  "order" integer not null default 0,
  views_count integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists projects_order_idx on public.projects ("order", created_at desc);

-- Compétences
create table if not exists public.skill_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  "order" integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.skill_categories (id) on delete cascade,
  name text not null,
  skill_type text not null default 'bar',
  percentage integer not null check (percentage >= 0 and percentage <= 100),
  "order" integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists skills_category_idx on public.skills (category_id);

-- Messages de contact
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Inscriptions newsletter (RGPD : consentement explicite requis à l’insertion)
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists newsletter_subscribers_email_unique
  on public.newsletter_subscribers (lower(trim(email)));

-- RLS : lecture publique des contenus + insertion contact pour anon (si vous n’utilisez pas la service role)
alter table public.articles enable row level security;
alter table public.projects enable row level security;
alter table public.skill_categories enable row level security;
alter table public.skills enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "articles_select_public"
  on public.articles for select
  using (is_published = true);

create policy "projects_select_public"
  on public.projects for select
  using (true);

create policy "skill_categories_select_public"
  on public.skill_categories for select
  using (is_active = true);

create policy "skills_select_public"
  on public.skills for select
  using (is_active = true);

create policy "contact_insert_public"
  on public.contact_messages for insert
  with check (true);

create policy "newsletter_insert_public"
  on public.newsletter_subscribers for insert
  with check (marketing_consent = true);

-- Aucune lecture publique des messages ni des inscriptions (admin / service role)
