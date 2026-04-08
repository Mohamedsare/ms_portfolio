import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchProjectBySlug,
  fetchSimilarProjects,
} from "@/lib/queries";
import {
  PROJECT_STATUS_LABELS,
  projectCategoryLabel,
  technologiesList,
} from "@/lib/constants";
import { formatDateFr, formatDuration } from "@/lib/format";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) return { title: "Projet introuvable" };
  return {
    title: `${project.title} - Portfolio Mohamed SARE`,
    description: project.summary.slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) notFound();

  const similar = await fetchSimilarProjects(project.category, slug, 3);
  const categoryLabel = projectCategoryLabel(project.category);
  const statusLabel =
    PROJECT_STATUS_LABELS[project.status] ?? project.status;
  const techs = technologiesList(project.technologies);

  return (
    <section className="project-detail">
      <div className="container">
        <article className="project-content">
          <header className="project-header">
            <div className="project-meta">
              <span className="project-category">
                <i className="fas fa-tag" /> {categoryLabel}
              </span>
              <span className={`project-status ${project.status}`}>
                <i className="fas fa-circle" /> {statusLabel}
              </span>
              <span className="project-duration">
                <i className="fas fa-clock" />{" "}
                {formatDuration(project.start_date, project.end_date)}
              </span>
              <span className="project-views">
                <i className="fas fa-eye" /> {project.views_count ?? 0} vue
                {(project.views_count ?? 0) > 1 ? "s" : ""}
              </span>
            </div>
            <h1 className="project-title">{project.title}</h1>
            {project.image_url && (
              <div className="project-image">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-auto"
                />
              </div>
            )}
          </header>
          <div className="project-summary">
            <p>{project.summary}</p>
          </div>
          <div className="project-technologies-section">
            <h3>Technologies utilisées</h3>
            <div className="technologies-grid">
              {techs.map((t) => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="project-description">
            <h3>Description du projet</h3>
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>
          <div className="project-links-section">
            <h3>Liens du projet</h3>
            <div className="project-links-grid">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-card github"
                >
                  <i className="fab fa-github" />
                  <span>Voir le code source</span>
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-card live"
                >
                  <i className="fas fa-external-link-alt" />
                  <span>Voir en ligne</span>
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-card demo"
                >
                  <i className="fas fa-play" />
                  <span>Voir la démo</span>
                </a>
              )}
            </div>
          </div>
          <div className="project-info">
            <div className="info-grid">
              {project.start_date && (
                <div className="info-item">
                  <h4>Date de début</h4>
                  <p>{formatDateFr(project.start_date)}</p>
                </div>
              )}
              {project.end_date && (
                <div className="info-item">
                  <h4>Date de fin</h4>
                  <p>{formatDateFr(project.end_date)}</p>
                </div>
              )}
              <div className="info-item">
                <h4>Statut</h4>
                <p className={`status-text ${project.status}`}>{statusLabel}</p>
              </div>
              <div className="info-item">
                <h4>Durée</h4>
                <p>{formatDuration(project.start_date, project.end_date)}</p>
              </div>
            </div>
          </div>
        </article>

        {similar.length > 0 && (
          <section className="similar-projects">
            <h3>Projets similaires</h3>
            <div className="projects-grid">
              {similar.map((sp) => {
                const spCat = projectCategoryLabel(sp.category);
                return (
                  <article key={sp.id} className="similar-project-card">
                    {sp.image_url ? (
                      <img
                        src={sp.image_url}
                        alt={sp.title}
                        className="similar-project-img"
                      />
                    ) : (
                      <img
                        src={`https://via.placeholder.com/300x200/6c63ff/ffffff?text=${encodeURIComponent(sp.title.slice(0, 20))}`}
                        alt={sp.title}
                        className="similar-project-img"
                      />
                    )}
                    <div className="similar-project-content">
                      <h4 className="similar-project-title">{sp.title}</h4>
                      <p className="similar-project-category">{spCat}</p>
                      <p className="similar-project-summary">
                        {sp.summary.split(/\s+/).slice(0, 15).join(" ")}
                        {sp.summary.split(/\s+/).length > 15 ? "…" : ""}
                      </p>
                      <Link
                        href={`/project/${sp.slug}`}
                        className="similar-project-link"
                      >
                        Voir plus
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        <div className="back-to-projects">
          <Link href="/#projets" className="back-btn">
            <i className="fas fa-arrow-left" /> Retour aux projets
          </Link>
        </div>
      </div>
    </section>
  );
}
