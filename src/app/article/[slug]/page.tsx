import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import {
  fetchArticleBySlug,
  fetchSimilarArticles,
} from "@/lib/queries";
import { articleCategoryLabel } from "@/lib/article-categories";
import { formatDateFr } from "@/lib/format";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

async function siteUrl(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: `${article.title} - Portfolio Mohamed SARE`,
    description: article.summary.slice(0, 160),
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  if (!article) notFound();

  const similar = await fetchSimilarArticles(article.category, slug, 3);
  const base = await siteUrl();
  const canonical = `${base}/article/${slug}`;
  const author = article.author ?? "Mohamed SARE";
  const catLabel = articleCategoryLabel(article.category);

  return (
    <section className="article-detail">
      <div className="container">
        <article className="article-content">
          <header className="article-header">
            <div className="article-meta">
              <span className="article-category">
                <i className="fas fa-tag" /> {catLabel}
              </span>
              <span className="article-date">
                <i className="fas fa-calendar-alt" />{" "}
                {formatDateFr(article.published_date)}
              </span>
              <span className="article-author">
                <i className="fas fa-user" /> Par {author}
              </span>
              <span className="article-views">
                <i className="fas fa-eye" /> {article.views_count ?? 0} vue
                {(article.views_count ?? 0) > 1 ? "s" : ""}
              </span>
            </div>
            <h1 className="article-title">{article.title}</h1>
            {article.image_url && (
              <div className="article-image">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-auto"
                />
              </div>
            )}
          </header>
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <footer className="article-footer">
            <div className="article-tags">
              <span className="tag">{catLabel}</span>
            </div>
            <div className="article-share">
              <h4>Partager cet article :</h4>
              <div className="share-buttons">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn facebook"
                >
                  <i className="fab fa-facebook-f" /> Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(canonical)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn twitter"
                >
                  <i className="fab fa-twitter" /> Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn linkedin"
                >
                  <i className="fab fa-linkedin-in" /> LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </article>

        {similar.length > 0 && (
          <section className="similar-articles">
            <h3>Articles similaires</h3>
            <div className="articles-grid">
              {similar.map((sa) => (
                <article key={sa.id} className="similar-article-card">
                  {sa.image_url ? (
                    <img
                      src={sa.image_url}
                      alt={sa.title}
                      className="similar-article-img"
                    />
                  ) : (
                    <img
                      src={`https://via.placeholder.com/300x200/6c63ff/ffffff?text=${encodeURIComponent(sa.title.slice(0, 20))}`}
                      alt={sa.title}
                      className="similar-article-img"
                    />
                  )}
                  <div className="similar-article-content">
                    <h4 className="similar-article-title">{sa.title}</h4>
                    <p className="similar-article-date">
                      {formatDateFr(sa.published_date)}
                    </p>
                    <p className="similar-article-summary">{sa.summary}</p>
                    <Link
                      href={`/article/${sa.slug}`}
                      className="similar-article-link"
                    >
                      Lire plus
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
