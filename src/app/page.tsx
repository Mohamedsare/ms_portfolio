import Link from "next/link";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { HeroParticles } from "@/components/site/hero-particles";
import { HeroTypedText } from "@/components/site/hero-typed-text";
import { fetchLatestArticles } from "@/lib/queries";
import { formatDateFr } from "@/lib/format";

export default async function HomePage() {
  const latestArticles = await fetchLatestArticles(3);

  return (
    <>
      <section id="accueil" className="hero">
        <HeroParticles />
        <div className="hero-container">
          <h1 className="hero-heading">
            Bienvenue, je suis <HeroTypedText />
          </h1>
          <p className="hero-description">
            Développeur Full-Stack. <br />
            (Mohamed SARE)
          </p>
          <a href="/#projets" className="main-btn">
            <i className="fas fa-rocket" />
            <span>Voir mes projets</span>
          </a>
        </div>
        <div className="scroll-down">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section id="citations" className="quote">
        <div className="quote-container">
          <div className="quote-slide active">
            <p>&quot;La créativité est l&apos;intelligence qui s&apos;amuse.&quot;</p>
            <span>- Albert Einstein</span>
          </div>
          <div className="quote-slide">
            <p>&quot;Le code est de la poésie qui fait fonctionner le monde.&quot;</p>
            <span>- Anonyme</span>
          </div>
          <div className="quote-slide">
            <p>
              &quot;L&apos;innovation distingue un leader d&apos;un suiveur.&quot;
            </p>
            <span>- Steve Jobs</span>
          </div>
          <div className="quote-dots">
            <span className="dot active" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      </section>

      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ServicesSection />
      <PricingSection />

      <section id="blog" className="blog">
        <div className="container">
          <h2 className="section-title">
            Derniers <span>Articles</span>
          </h2>
          <div className="blog-container">
            {latestArticles.length > 0 ? (
              latestArticles.map((article) => (
                <article key={article.id} className="blog-card">
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="blog-img"
                    />
                  ) : (
                    <img
                      src={`https://via.placeholder.com/400x220/6c63ff/ffffff?text=${encodeURIComponent(article.title.slice(0, 20))}`}
                      alt={article.title}
                      className="blog-img"
                    />
                  )}
                  <div className="blog-content">
                    <h3 className="blog-title">{article.title}</h3>
                    <p className="blog-date">
                      {formatDateFr(article.published_date)}
                    </p>
                    <p className="blog-summary">{article.summary}</p>
                    <Link
                      href={`/article/${article.slug}`}
                      className="blog-btn"
                    >
                      Lire plus
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="no-articles">
                <p>Aucun article disponible pour le moment.</p>
                <p>
                  Revenez bientôt pour découvrir de nouveaux contenus — ou
                  connectez Supabase et importez vos articles.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <NewsletterSection />

      <ContactSection />
    </>
  );
}
