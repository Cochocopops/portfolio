import { notFound } from 'next/navigation';
import { PROJECTS } from '../data';

type Props = { params: { slug: string } };

export default function ProjectDetailPage({ params }: Props) {
  const project = PROJECTS.find(p => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <main className="project-detail" style={{ minHeight: '100vh', padding: '2rem', paddingTop: 'calc(var(--nav-h) + var(--gap))' }}>
      <h1 style={{ fontFamily: 'BebasNeue, sans-serif', fontSize: '2.6rem', letterSpacing: '1px' }}>{project.title}</h1>
      <p style={{ color: '#444', marginTop: '0.5rem', maxWidth: 800 }}>{project.excerpt}</p>
      <div style={{ marginTop: '1.5rem' }}>
        <img src={project.image} alt={project.title} style={{ width: '100%', maxWidth: 1100, borderRadius: 12, border: '1.5px solid #111' }} />
      </div>
    </main>
  );
}


