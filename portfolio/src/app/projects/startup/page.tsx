"use client";
import Link from "next/link";
import { PROJECTS } from "../data";

export default function ProjectsStartupPage() {
  // Filtrer les projets entrepreneuriaux (ceux avec Product Design ou Florya)
  const startupProjects = PROJECTS.filter(p => 
    p.categories.includes('Product Design') ||
    p.slug === 'florya'
  );

  return (
    <main className="projects-page">
      <aside className="projects-sidebar">
        <h2>STARTUP & ENTREPRENEURSHIP</h2>
        <p style={{ fontSize: '0.95rem', color: '#666', marginTop: '1rem', maxWidth: '300px' }}>
          Projects focused on entrepreneurship and product development
        </p>
      </aside>

      <section className="projects-grid">
        {startupProjects.map(p => (
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


