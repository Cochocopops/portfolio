import { notFound, redirect } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import { PROJECTS } from '../data';
import DynamicProjectRender from './dynamic-render';

type Props = { params: { slug: string } };

type ContentSection = {
  type: 'text' | 'youtube' | 'pdf';
  title?: string;
  content?: string;
  url?: string;
};

type UserProject = {
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  image: string;
  date: string;
  sections?: ContentSection[];
  technologies?: string[];
};

// List of slugs that have custom pages
const CUSTOM_PAGES = [
  'kombucha-biohybrid',
  'mycelium-sofa',
  'drone-detection',
  'pen-3d-print-tutorial',
  'rythme-car-game',
  'atlas-butterflies',
  'florya',
  'drone-hackathon',
  'high-voltage-fog-harvesting',
];

async function getUserProjects(): Promise<UserProject[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'user-projects.json');
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = params;

  // If it's a custom page, redirect to the specific page
  if (CUSTOM_PAGES.includes(slug)) {
    redirect(`/projects/${slug}`);
  }

  // Check if it's in the static projects list (for metadata)
  const staticProject = PROJECTS.find(p => p.slug === slug);
  
  // Load user projects
  const userProjects = await getUserProjects();
  const userProject = userProjects.find(p => p.slug === slug);

  // If not found anywhere
  if (!staticProject && !userProject) {
    return notFound();
  }

  // If it's a user project with sections, use dynamic render
  if (userProject && userProject.sections && userProject.sections.length > 0) {
    return <DynamicProjectRender project={userProject} />;
  }

  // Otherwise, show simple project page
  const project = userProject || staticProject;
  
  if (!project) {
    return notFound();
  }

  return (
    <main className="project-detail" style={{ 
      minHeight: '100vh', 
      padding: '2rem', 
      paddingTop: 'calc(var(--nav-h) + var(--gap))' 
    }}>
      <h1 style={{ 
        fontFamily: 'BebasNeue, sans-serif', 
        fontSize: '2.6rem', 
        letterSpacing: '1px' 
      }}>
        {project.title}
      </h1>
      <p style={{ color: '#444', marginTop: '0.5rem', maxWidth: 800 }}>
        {project.excerpt}
      </p>
      {project.image && (
        <div style={{ marginTop: '1.5rem' }}>
          <img 
            src={project.image} 
            alt={project.title} 
            style={{ 
              width: '100%', 
              maxWidth: 1100, 
              borderRadius: 12, 
              border: '1.5px solid #111' 
            }} 
          />
        </div>
      )}
    </main>
  );
}
