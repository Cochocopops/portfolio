"use client";
import Link from "next/link";
import { PROJECTS } from "../data";

export default function ProjectsResearchPage() {
  // Filtrer les projets de recherche (ceux avec Electronics, Mechanical Engineering, Code & Software)
  const researchProjects = PROJECTS.filter(p => 
    p.categories.includes('Electronics') || 
    p.categories.includes('Mechanical Engineering') ||
    p.categories.includes('Code & Software')
  );

  return (
    <main className="projects-page">
      <aside className="projects-sidebar">
        <h2>RESEARCH PROJECTS</h2>
        <p style={{ fontSize: '0.95rem', color: '#666', marginTop: '1rem', maxWidth: '300px' }}>
          Experimental and research-based technical projects
        </p>
      </aside>

      <section className="projects-grid">
        {researchProjects.map(p => (
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

