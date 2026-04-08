import Link from "next/link";
import { fetchProjects } from "@/lib/queries";
import {
  PROJECT_CATEGORIES,
  PROJECT_STATUS_LABELS,
  projectCategoryLabel,
  technologiesList,
} from "@/lib/constants";

export async function ProjectsSection() {
  const projects = await fetchProjects();

  return (
    <section id="projets" className="projects projects-section">
      <div className="container">
        <h2 className="section-title">
          Mes <span>Projets</span>
        </h2>
        <p className="projects-intro">
          Une sélection de réalisations : applications web, outils métiers et
          expérimentations techniques. Filtrez par type pour explorer plus vite.
        </p>
        <div className="projects-filter">
          <button type="button" className="filter-btn active" data-filter="all">
            Tous
          </button>
          {PROJECT_CATEGORIES.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              className="filter-btn"
              data-filter={code}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="projects-container">
          {projects.length > 0 ? (
            projects.map((project) => {
              const techs = technologiesList(project.technologies);
              const categoryLabel = projectCategoryLabel(project.category);
              const statusLabel =
                PROJECT_STATUS_LABELS[project.status] ?? project.status;
              return (
                <div
                  key={project.id}
                  className={`project-card ${project.category}`}
                  data-category={project.category}
                >
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="project-img"
                    />
                  ) : (
                    <img
                      src={`https://via.placeholder.com/400x300/6c63ff/ffffff?text=${encodeURIComponent(project.title.slice(0, 20))}`}
                      alt={project.title}
                      className="project-img"
                    />
                  )}
                  <div className="project-overlay">
                    <div className={`project-status ${project.status}`}>
                      <span className="status-badge">{statusLabel}</span>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-category">{categoryLabel}</p>
                    <p className="project-summary">
                      {project.summary.split(/\s+/).slice(0, 15).join(" ")}
                      {project.summary.split(/\s+/).length > 15 ? "…" : ""}
                    </p>
                    <div className="project-technologies">
                      {techs.slice(0, 3).map((t) => (
                        <span key={t} className="tech-tag">
                          {t}
                        </span>
                      ))}
                      {techs.length > 3 && (
                        <span className="tech-tag more">
                          +{techs.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="project-links">
                      <Link
                        href={`/project/${project.slug}`}
                        className="project-link"
                      >
                        Voir plus
                      </Link>
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link github"
                        >
                          <i className="fab fa-github" /> Code
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link live"
                        >
                          <i className="fas fa-external-link-alt" /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-projects">
              <p>Aucun projet disponible pour le moment.</p>
              <p>
                Ajoutez des lignes dans la table Supabase `projects` ou importez
                les données (voir README).
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
