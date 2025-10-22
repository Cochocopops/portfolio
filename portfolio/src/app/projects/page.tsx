"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ALL_CATEGORIES, PROJECTS } from "./data";
import { useEffect } from "react";

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
        <h2>Categories</h2>
        <button className={`cat ${active === 'ALL' ? 'active' : ''}`} onClick={() => setActive('ALL')}>All</button>
        {ALL_CATEGORIES.map(cat => (
          <button key={cat} className={`cat ${active === cat ? 'active' : ''}`} onClick={() => setActive(cat)}>
            {cat}
          </button>
        ))}
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

