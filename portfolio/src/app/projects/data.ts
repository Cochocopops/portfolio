export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  image: string; // public path
};

export const ALL_CATEGORIES = [
  '3D PRINT',
  'ARDUINO',
  'BIOMATERIALS',
  'CODE',
  'CONDUCTIVE',
  'DRAW',
  'EXPERIMENTATION',
  'FABRIC',
  'FOOD',
  'GAME',
  'PCB',
  'INSTALLATION',
  'INTERVIEW',
  'LASER CUT',
  'MATERIAL',
  'TUTORIAL',
];

export const PROJECTS: Project[] = [
  {
    slug: 'rythme-car-game',
    title: 'Rythme Car Game',
    excerpt: 'Rhythm-based driving game in Python with interactive menu and score system.',
    categories: ['CODE', 'GAME'],
    image: '/assets/projects/Rythme_Car_Game/data/assets/voiture_icon.png',
  },
  {
    slug: 'florya',
    title: 'Florya – Kickstarter Project',
    excerpt: 'Vegetable‑tanned leather diffuser and artisanal product design.',
    categories: ['BIOMATERIALS', 'LASER CUT', 'MATERIAL'],
    image: '/assets/projects/Project_2/Project2.png',
  },
  {
    slug: 'atlas-butterflies',
    title: 'Atlas Butterflies – Kinetic installation',
    excerpt: 'Mechanical/electronic prototype for an artistic installation.',
    categories: ['EXPERIMENTATION', 'CODE', 'FABRIC'],
    image: '/assets/projects/Project_1/Project1.png',
  },
];


