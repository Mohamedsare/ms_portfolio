# Portfolio — Next.js + Supabase

Site portfolio (Mohamed SARE) : **Next.js 16**, Tailwind, Framer Motion, shadcn-style UI, **Supabase** pour les données et le formulaire de contact.

## Démarrage

```bash
npm install
cp .env.example .env.local
# Renseigner NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, etc.
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Base de données

1. Dans le dashboard Supabase, exécuter le SQL : `supabase/schema.sql`.
2. Si vous migrez depuis l’ancienne base Django locale :  
   `python scripts/export_sqlite_to_supabase.py`  
   puis exécuter le fichier généré `scripts/supabase_seed_from_sqlite.sql` dans l’éditeur SQL Supabase.
3. Les fichiers média Django ont été copiés sous `public/media/` ; les `image_url` du type `/media/...` fonctionnent tel quel sur le site.

## Déploiement

- **Vercel** (recommandé) : importer le dépôt, variables d’environnement comme dans `.env.example`.
- **Heroku** : `Procfile` lance `npm run start` (après `npm run build`).

## Assets

- Logique UI héritée : `public/js/main.js`, feuilles CSS dans `src/styles/legacy/`.
