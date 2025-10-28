"use client";
import { useState, type FormEvent } from 'react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      setIsSubmitting(true);
      
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data?.error || 'An error occurred. Please try again.');
        return;
      }
      
      alert('Message sent successfully. Thank you!');
      form.reset();
    } catch (error) {
      alert('Unable to send message. Please try again later or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="contact-section">
      <div className="contact-header">
        <h1 className="contact-title">Contact</h1>
        <p className="contact-subtitle">Let's discuss your projects, collaborations or opportunities.</p>
      </div>

      <section className="contact-grid">
        {/* Left column: info cards */}
        <aside className="contact-left">
          <div className="contact-card">
            <h2>Contact Information</h2>
            <ul className="contact-list">
              <li>
                <span className="contact-key">Email</span>
                <a className="contact-value" href="mailto:corentin.chantereau@edu.devinci.fr">
                  corentin.chantereau@edu.devinci.fr
                </a>
              </li>
              <li>
                <span className="contact-key">Phone</span>
                <a className="contact-value" href="tel:+33629056027">
                  +33 6 29 05 60 27
                </a>
              </li>
              <li>
                <span className="contact-key">Location</span>
                <span className="contact-value">Rueil-Malmaison, France</span>
              </li>
            </ul>
          </div>

          <div className="contact-card">
            <h2>Social Networks</h2>
            <div className="socials">
              <a 
                className="social-link" 
                href="https://www.linkedin.com/in/corentin-chantereau" 
                target="_blank" 
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a 
                className="social-link" 
                href="https://github.com/corentinchantereau" 
                target="_blank" 
                rel="noreferrer"
              >
                GitHub
              </a>
              <a 
                className="social-link" 
                href="https://x.com/corentinchan" 
                target="_blank" 
                rel="noreferrer"
              >
                X
              </a>
            </div>
          </div>
        </aside>

        {/* Right column: form */}
        <section className="contact-right">
          <div className="contact-form">
            <h2>Send Me a Message</h2>
            <form aria-label="Contact form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    placeholder="Your name" 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="subject">Subject</label>
                <input 
                  id="subject" 
                  name="subject" 
                  type="text" 
                  placeholder="Message subject" 
                  required 
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={6} 
                  placeholder="Your message..." 
                  required 
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-actions">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
                <p className="form-hint">
                  Tip: Be specific for a faster response.
                </p>
              </div>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
