import Image from "next/image";

export function AboutSection() {
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
                  <Image
                    src="/img/mhd.jpeg"
                    alt="Mohamed SARE"
                    width={900}
                    height={1200}
                    className="h-full w-full object-cover"
                    priority={false}
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

        <div className="about-method-media">
          <h2 className="section-title">
            Ma <span>Méthode</span>
          </h2>
          <div className="about-method-card" role="img" aria-label="Schéma de méthode de travail">
            <Image
              src="/img/methode-sombre.png"
              alt=""
              width={1600}
              height={900}
              className="about-method-img about-method-img--dark"
              priority={false}
            />
            <Image
              src="/img/methode-claire.png"
              alt=""
              width={1600}
              height={900}
              className="about-method-img about-method-img--light"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
