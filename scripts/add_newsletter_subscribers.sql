-- À exécuter sur un projet Supabase existant si la table n’existe pas encore.
-- (Le fichier supabase/schema.sql contient déjà ces définitions pour les nouveaux déploiements.)

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists newsletter_subscribers_email_unique
  on public.newsletter_subscribers (lower(trim(email)));

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "newsletter_insert_public" on public.newsletter_subscribers;

create policy "newsletter_insert_public"
  on public.newsletter_subscribers for insert
  with check (marketing_consent = true);
