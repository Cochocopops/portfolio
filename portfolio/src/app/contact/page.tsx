"use client";
import type { FormEvent } from 'react';
export default function ContactPage() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi…';
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data?.error || 'Une erreur est survenue.');
        return;
      }
      alert('Message envoyé avec succès. Merci !');
      form.reset();
    } catch (e) {
      alert('Impossible d\'envoyer le message. Réessayez plus tard.');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Envoyer';
      }
    }
  }

  return (
    <main className="contact-section">
      <div className="contact-header">
        <h1 className="contact-title">Contact</h1>
        <p className="contact-subtitle">Discutons de vos projets, collaborations ou opportunités.</p>
      </div>

      <section className="contact-grid">
        {/* Colonne gauche: cartes d'infos */}
        <aside className="contact-left">
          <div className="contact-card">
            <h2>Coordonnées</h2>
            <ul className="contact-list">
              <li>
                <span className="contact-key">Email</span>
                <a className="contact-value" href="mailto:corentin.chantereau@edu.devinci.fr">corentin.chantereau@edu.devinci.fr</a>
              </li>
              <li>
                <span className="contact-key">Téléphone</span>
                <a className="contact-value" href="tel:+33629056027">+33 6 29 05 60 27</a>
              </li>
              <li>
                <span className="contact-key">Localisation</span>
                <span className="contact-value">Rueil-Malmaison, France</span>
              </li>
            </ul>
          </div>

          <div className="contact-card">
            <h2>Réseaux</h2>
            <div className="socials">
              <a className="social-link" href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="social-link" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
              <a className="social-link" href="https://x.com" target="_blank" rel="noreferrer">X</a>
            </div>
          </div>
        </aside>

        {/* Colonne droite: formulaire */}
        <section className="contact-right">
          <div className="contact-form">
            <h2>M’envoyer un message</h2>
            <form aria-label="Formulaire de contact" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" placeholder="Votre nom" required />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="votre@email.com" required />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="subject">Sujet</label>
                <input id="subject" name="subject" type="text" placeholder="Sujet du message" required />
              </div>

              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={6} placeholder="Votre message..." required />
              </div>

              <div className="form-actions">
                <button type="submit">
                  Envoyer
                </button>
                <p className="form-hint">Conseil: soyez précis pour une réponse rapide.</p>
              </div>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
