export function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">
          Me <span>Contacter</span>
        </h2>
        <p className="contact-intro">
          Un projet, une question ou un devis ? Écrivez-moi : je réponds dans les
          plus brefs délais. Vous pouvez aussi me joindre directement par e-mail ou
          téléphone.
        </p>

        <div className="contact-layout">
          <aside className="contact-card contact-info">
            <h3 className="contact-card-title">Coordonnées</h3>
            <div className="contact-detail-list">
              <div className="info-item contact-detail">
                <i className="fas fa-map-marker-alt" aria-hidden />
                <p>Casablanca, Maroc</p>
              </div>
              <div className="info-item contact-detail">
                <i className="fas fa-envelope" aria-hidden />
                <p>
                  <a href="mailto:contact@mohamedsare.com">contact@mohamedsare.com</a>
                </p>
              </div>
              <div className="info-item contact-detail">
                <i className="fas fa-phone" aria-hidden />
                <p>
                  <a href="tel:+212771668069">+212 771 668 069</a>
                  <span className="contact-detail-sep"> / </span>
                  <a href="tel:+22664712044">+226 64 71 20 44</a>
                </p>
              </div>
              <div className="info-item contact-detail">
                <i className="fas fa-clock" aria-hidden />
                <p>Disponible 24/7</p>
              </div>
            </div>
            <p className="contact-social-heading">Réseaux</p>
            <div className="contact-social">
              <a
                href="https://www.linkedin.com/in/mohamed-sare-a872a4338?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                title="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                <i className="fab fa-linkedin-in" aria-hidden />
              </a>
              <a
                href="https://github.com/Mohamedsare"
                title="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                <i className="fab fa-github" aria-hidden />
              </a>
              <a href="#" title="Twitter" className="contact-social-link">
                <i className="fab fa-twitter" aria-hidden />
              </a>
              <a
                href="https://www.instagram.com/mohamed.sare.1840070?igsh=MW9zd2Q0dnZnbmxwOQ=="
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                <i className="fab fa-instagram" aria-hidden />
              </a>
            </div>
          </aside>

          <div className="contact-card contact-card-form">
            <h3 className="contact-card-title">Envoyez-moi un message</h3>
            <form id="form" action="/contact/submit/" method="POST">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  inputMode="text"
                />
                <label htmlFor="name">Nom complet</label>
                <span className="error-message" />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                />
                <label htmlFor="email">Adresse email</label>
                <span className="error-message" />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  autoComplete="off"
                  inputMode="text"
                />
                <label htmlFor="subject">Sujet</label>
                <span className="error-message" />
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  required
                  autoComplete="off"
                  inputMode="text"
                  rows={5}
                />
                <label htmlFor="message">Message</label>
                <span className="error-message" />
              </div>
              <button type="submit" className="submit-btn contact-submit-btn">
                <span className="btn-text">Envoyer le message</span>
                <div className="btn-loader" />
              </button>
            </form>
            <div className="form-message" />
          </div>
        </div>
      </div>
    </section>
  );
}
