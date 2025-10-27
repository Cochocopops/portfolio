"use client";
import Link from "next/link";
import { PROJECTS } from "../data";

export default function ProjectsLatestPage() {
  // Les projets sont déjà triés du plus récent au plus ancien dans data.ts
  // On prend les 3 premiers
  const latestProjects = PROJECTS.slice(0, 3);

  return (
    <main className="projects-page">
      <aside className="projects-sidebar">
        <h2>LATEST PROJECTS</h2>
        <p style={{ fontSize: '0.95rem', color: '#666', marginTop: '1rem', maxWidth: '300px' }}>
          Discover the 3 most recent projects
        </p>
      </aside>

      <section className="projects-grid">
        {latestProjects.map(p => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="project-card">
            <div className="project-image-wrapper">
              <img src={p.image} alt={p.title} className="project-thumb" />
              <div className="project-overlay">
                <h3 className="project-overlay-title">{p.title}</h3>
              </div>
            </div>
            <h3>{p.title}</h3>
            <p>{p.excerpt}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

