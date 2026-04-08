"""
Exporte db.sqlite3 Django vers du SQL INSERT pour les tables Supabase (public.*).
python scripts/export_sqlite_to_supabase.py
Sortie : scripts/supabase_seed_from_sqlite.sql
"""
from __future__ import annotations

import sqlite3
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DB = ROOT / "db.sqlite3"
OUT = Path(__file__).resolve().parent / "supabase_seed_from_sqlite.sql"


def esc(s: str | None) -> str:
    if s is None:
        return "NULL"
    return "'" + str(s).replace("'", "''") + "'"


def media_url(path: str | None) -> str | None:
    if not path:
        return None
    p = str(path).replace("\\", "/")
    if p.startswith("/media/"):
        return p
    return "/media/" + p.lstrip("/")


def bool_pg(v) -> str:
    if v in (1, True, "1"):
        return "TRUE"
    return "FALSE"


def main() -> int:
    if not DB.exists():
        print("db.sqlite3 introuvable — aucun export.", file=sys.stderr)
        OUT.write_text("-- Pas de base SQLite locale.\n", encoding="utf-8")
        return 0

    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    now = datetime.now(timezone.utc).isoformat()

    lines: list[str] = [
        "-- Généré par scripts/export_sqlite_to_supabase.py",
        "-- Exécutez d'abord le fichier supabase/schema.sql (racine du dépôt) sur votre projet Supabase.",
        "BEGIN;",
        "TRUNCATE public.contact_messages, public.skills, public.skill_categories, public.projects, public.articles RESTART IDENTITY CASCADE;",
    ]

    rows = con.execute("SELECT * FROM ms_portfolio_article").fetchall()
    for r in rows:
        img = media_url(r["image"])
        lines.append(
            f"""INSERT INTO public.articles (title, slug, summary, content, image_url, category, author, published_date, is_published, views_count)
VALUES ({esc(r['title'])}, {esc(r['slug'])}, {esc(r['summary'])}, {esc(r['content'])}, {esc(img) if img else 'NULL'}, {esc(r['category'])}, {esc(r['author'])}, {esc(r['published_date'])}, {bool_pg(r['is_published'])}, {int(r['views_count'] or 0)});"""
        )

    rows = con.execute("SELECT * FROM ms_portfolio_project").fetchall()
    for r in rows:
        img = media_url(r["image"])
        cr = r["created_at"] if r["created_at"] else now
        lines.append(
            f"""INSERT INTO public.projects (title, slug, summary, description, image_url, category, status, technologies, github_url, live_url, demo_url, start_date, end_date, featured, "order", views_count, created_at)
VALUES ({esc(r['title'])}, {esc(r['slug'])}, {esc(r['summary'])}, {esc(r['description'])}, {esc(img) if img else 'NULL'}, {esc(r['category'])}, {esc(r['status'])}, {esc(r['technologies'])}, {esc(r['github_url']) if r['github_url'] else 'NULL'}, {esc(r['live_url']) if r['live_url'] else 'NULL'}, {esc(r['demo_url']) if r['demo_url'] else 'NULL'}, {esc(r['start_date']) if r['start_date'] else 'NULL'}, {esc(r['end_date']) if r['end_date'] else 'NULL'}, {bool_pg(r['featured'])}, {int(r['order'] or 0)}, {int(r['views_count'] or 0)}, {esc(cr)});"""
        )

    cat_map: dict[int, str] = {}
    rows = con.execute(
        'SELECT * FROM ms_portfolio_skillcategory ORDER BY "order", name'
    ).fetchall()
    for r in rows:
        uid = str(uuid.uuid4())
        cat_map[int(r["id"])] = uid
        cr = r["created_at"] if r["created_at"] else now
        lines.append(
            f"""INSERT INTO public.skill_categories (id, name, description, "order", is_active, created_at)
VALUES ('{uid}'::uuid, {esc(r['name'])}, {esc(r['description']) if r['description'] else 'NULL'}, {int(r['order'] or 0)}, {bool_pg(r['is_active'])}, {esc(cr)});"""
        )

    rows = con.execute(
        'SELECT * FROM ms_portfolio_skill ORDER BY category_id, "order", name'
    ).fetchall()
    for r in rows:
        cid = int(r["category_id"])
        if cid not in cat_map:
            continue
        uid = str(uuid.uuid4())
        cr = r["created_at"] if r["created_at"] else now
        lines.append(
            f"""INSERT INTO public.skills (id, category_id, name, skill_type, percentage, "order", is_active, created_at)
VALUES ('{uid}'::uuid, '{cat_map[cid]}'::uuid, {esc(r['name'])}, {esc(r['skill_type'])}, {int(r['percentage'] or 0)}, {int(r['order'] or 0)}, {bool_pg(r['is_active'])}, {esc(cr)});"""
        )

    lines.append("COMMIT;")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Écrit {OUT} ({len(lines)} lignes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
