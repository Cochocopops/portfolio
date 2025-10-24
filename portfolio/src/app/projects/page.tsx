"use client";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { ALL_CATEGORIES, PROJECTS } from "./data";

type UserProject = {
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  image: string;
};

export default function ProjectsIndexPage() {
  const [active, setActive] = useState<string>("ALL");
  const [userProjects, setUserProjects] = useState<UserProject[]>([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => setUserProjects(Array.isArray(data?.projects) ? data.projects : []))
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    const combined = [...userProjects, ...PROJECTS];
    if (active === "ALL") return combined;
    return combined.filter(p => p.categories.includes(active));
  }, [active, userProjects]);

  return (
    <main className="projects-page">
      <aside className="projects-sidebar">
        <h2></h2>
        <ul className="cat-list">
          <li><button className={`cat ${active === 'ALL' ? 'active' : ''}`} onClick={() => setActive('ALL')}>All</button></li>
          {ALL_CATEGORIES.map(cat => (
            <li key={cat}>
              <button className={`cat ${active === cat ? 'active' : ''}`} onClick={() => setActive(cat)}>
                {cat}
              </button>
            </li>
          ))}
        </ul>

        {/* Dropdown mobile/portrait */}
        <div className={`filter-dropdown ${filterMenuOpen ? "open" : ""}`}>
          <button
            className="filter-button"
            aria-haspopup="listbox"
            aria-expanded={filterMenuOpen}
            onClick={() => setFilterMenuOpen((v) => !v)}
            onBlur={() => setFilterMenuOpen(false)}
          >
            Filter
          </button>
          <ul className="filter-menu" role="listbox">
            <li role="option">
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setFilterMenuOpen(false);
                  setActive('ALL');
                }}
              >
                All
              </button>
            </li>
            {ALL_CATEGORIES.map((cat) => (
              <li key={cat} role="option">
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setFilterMenuOpen(false);
                    setActive(cat);
                  }}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <section className="projects-grid">
        {filtered.map(p => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="project-card">
            {/* Placeholder image path; will show once assets are uploaded */}
            <img src={p.image} alt={p.title} className="project-thumb" />
            <h3>{p.title}</h3>
            <p>{p.excerpt}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

