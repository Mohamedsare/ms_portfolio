export function AboutSection() {
  const year = new Date().getFullYear();

  return (
    <section id="apropos" className="about about-section">
      <div className="container">
        <h2 className="section-title">
          À <span>propos</span>
        </h2>
        <p className="about-intro">
          Développeur full-stack passionné par des produits web solides, accessibles
          et prêts à grandir. Voici un aperçu de mon parcours et de ce qui me motive
          au quotidien.
        </p>
        <div className="about-container">
          <div className="about-img">
            <div className="img-card">
              <div className="img-card-inner">
                <div className="img-card-front">
                  <img
                    src="/img/mhd.jpeg"
                    alt="Mohamed SARE"
                    loading="lazy"
                  />
                </div>
                <div className="img-card-back">
                  <h3>Mohamed SARE</h3>
                  <p>Développeur Full-Stack</p>
                  <p>Python/Django/React</p>
                  <p>Créatif & Innovant</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-text">
            <h3>Qui suis-je ?</h3>
            <p>
              Je suis Mohamed SARE, étudiant en Génie Informatique originaire du
              Burkina Faso, spécialisé dans la conception de solutions web et
              logicielles à forte valeur ajoutée. J’aide les entreprises et
              porteurs de projets à transformer leurs idées en produits
              numériques fiables, modernes et évolutifs.
            </p>
            <p>
              Curieux, rigoureux et orienté performance, je conçois des
              architectures techniques sécurisées et optimisées, capables de
              soutenir la croissance des organisations et de répondre à des
              exigences professionnelles réelles.
            </p>
            <div className="soft-skills">
              <h3>Compétences transversales</h3>
              <div className="skills-container">
                {[
                  "Créativité",
                  "Travail d'équipe",
                  "Communication",
                  "Résolution de problèmes",
                  "Adaptabilité",
                  "Gestion de projet",
                ].map((skill) => (
                  <span key={skill} className="skill" data-skill={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="timeline about-timeline-card">
          <h3>
            Mon <span>Parcours</span>
          </h3>
          <div className="timeline-container">
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>{year} - Présent</h4>
                <p>
                  Étudiant en Génie Informatique à l&apos;École Supérieure de
                  Technologie de Casablanca (Morocco)
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2022 - 2023</h4>
                <p>
                  Baccalauréat Scientifique au Lycée Privé Marie Véronique de
                  Ouagadougou (Burkina Faso)
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2020 - 2021</h4>
                <p>
                  Premiers pas en Algorithme et Programmation C (découverte de
                  la programmation)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
