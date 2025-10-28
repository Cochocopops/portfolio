import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'user-projects.json');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

type ContentSection = {
  type: 'text' | 'youtube' | 'pdf' | 'image';
  title?: string;
  content?: string;
  url?: string;
};

type UserProject = {
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  image: string; // public path like /uploads/xxx.png
  date: string; // YYYY-MM-DD
  sections?: ContentSection[];
  technologies?: string[];
};

async function ensureDirs() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

async function readProjects(): Promise<UserProject[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function GET() {
  await ensureDirs();
  const projects = await readProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  try {
    await ensureDirs();
    const body = await request.json();
    const { 
      title, 
      excerpt, 
      categories, 
      imageBase64, 
      imageExt, 
      date,
      sections,
      technologies,
      pdfFiles 
    } = body ?? {};
    
    if (!title || !excerpt) {
      return NextResponse.json({ error: 'Missing title or excerpt' }, { status: 400 });
    }
    
    const slug = String(title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Handle main image
    let imagePath = '';
    if (imageBase64 && imageExt) {
      const safeExt = String(imageExt).replace(/\./g, '').toLowerCase();
      const filename = `${Date.now()}_${slug}.${safeExt}`;
      const filePath = path.join(UPLOAD_DIR, filename);
      const base64 = String(imageBase64).replace(/^data:[^;]+;base64,/, '');
      const buffer = Buffer.from(base64, 'base64');
      await fs.writeFile(filePath, buffer);
      imagePath = `/uploads/${filename}`;
    }

    // Handle PDF files
    const processedSections: ContentSection[] = [];
    if (sections && Array.isArray(sections)) {
      for (const section of sections) {
        if (section.type === 'pdf' && section.pdfBase64 && section.pdfName) {
          const pdfFilename = `${Date.now()}_${section.pdfName}`;
          const pdfPath = path.join(UPLOAD_DIR, pdfFilename);
          const base64 = section.pdfBase64.replace(/^data:[^;]+;base64,/, '');
          const buffer = Buffer.from(base64, 'base64');
          await fs.writeFile(pdfPath, buffer);
          processedSections.push({
            type: 'pdf',
            title: section.title,
            url: `/uploads/${pdfFilename}`,
          });
        } else {
          processedSections.push(section);
        }
      }
    }

    const categoriesArray: string[] = Array.isArray(categories)
      ? categories
      : String(categories || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);

    const technologiesArray: string[] = Array.isArray(technologies)
      ? technologies
      : String(technologies || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);

    const projectDate = date || new Date().toISOString().split('T')[0];

    const nextProject: UserProject = {
      slug,
      title,
      excerpt,
      categories: categoriesArray,
      image: imagePath,
      date: projectDate,
      sections: processedSections.length > 0 ? processedSections : undefined,
      technologies: technologiesArray.length > 0 ? technologiesArray : undefined,
    };

    const existing = await readProjects();
    const updated = [nextProject, ...existing];
    await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), 'utf-8');

    return NextResponse.json({ ok: true, project: nextProject });
  } catch (e) {
    console.error('Create project failed', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}


