import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'user-projects.json');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

type UserProject = {
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  image: string; // public path like /uploads/xxx.png
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
    const { title, excerpt, categories, imageBase64, imageExt } = body ?? {};
    if (!title || !excerpt) {
      return NextResponse.json({ error: 'Missing title or excerpt' }, { status: 400 });
    }
    const slug = String(title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

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

    const categoriesArray: string[] = Array.isArray(categories)
      ? categories
      : String(categories || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);

    const nextProject: UserProject = {
      slug,
      title,
      excerpt,
      categories: categoriesArray,
      image: imagePath,
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


