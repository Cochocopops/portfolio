"use client";
import Link from "next/link";
import { PROJECTS } from "../data";

export default function ProjectsAcademicPage() {
  // Filtrer les projets académiques (ceux avec "Tutorials" ou certains projets spécifiques)
  const academicProjects = PROJECTS.filter(p => 
    p.categories.includes('Tutorials') || 
    p.categories.includes('Biomaterials') ||
    p.slug === 'drone-detection' ||
    p.slug === 'drone-hackathon'
  );

  return (
    <main className="projects-page">
      <aside className="projects-sidebar">
        <h2>ACADEMIC PROJECTS</h2>
        <p style={{ fontSize: '0.95rem', color: '#666', marginTop: '1rem', maxWidth: '300px' }}>
          Projects developed during academic research and studies
        </p>
      </aside>

      <section className="projects-grid">
        {academicProjects.map(p => (
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
