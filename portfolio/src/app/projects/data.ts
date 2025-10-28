export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  image: string; // public path
  date: string; // Format: YYYY-MM-DD
};

export const ALL_CATEGORIES = [
  'Product Design',
  'Biomaterials',
  'Code & Software',
  'Electronics',
  'Mechanical Engineering',
  'Digital Fabrication',
  'Interaction Design',
  'Tutorials',
  'Entrepreneurship',
  'Sustainability',
  'Research',
  'Innovation',
];

// ⚠️ IMPORTANT : Ajouter les NOUVEAUX PROJETS EN HAUT de cette liste
// Les 3 premiers projets s'affichent automatiquement sur la page d'accueil
// Projets triés du plus récent au plus ancien
export const PROJECTS: Project[] = [
  {
    slug: 'high-voltage-fog-harvesting',
    title: 'Electrostatically Enhanced Fog Harvesting',
    excerpt: 'High-voltage fog collection system inspired by MIT research using space charge injection to enhance water harvesting efficiency.',
    categories: ['Electronics', 'Mechanical Engineering', 'Research', 'Sustainability', 'Innovation'],
    image: '/assets/projects/High_Voltage/High_Voltage_Image1.jpg',
    date: '2025-01-15',
  },
  {
    slug: 'atlas-butterflies',
    title: 'Atlas Butterflies – Kinetic installation',
    excerpt: 'Mechanical/electronic prototype for an artistic installation.',
    categories: ['Mechanical Engineering', 'Product Design', 'Interaction Design'],
    image: '/assets/projects/Project_1/Project1.png',
    date: '2024-12-20',
  },
  {
    slug: 'florya',
    title: 'Florya – Kickstarter Project',
    excerpt: 'Vegetable‑tanned leather diffuser and artisanal product design.',
    categories: ['Product Design', 'Biomaterials', 'Entrepreneurship', 'Sustainability'],
    image: '/assets/projects/Project_2/Project2.png',
    date: '2024-11-15',
  },
  {
    slug: 'drone-hackathon',
    title: 'Rescue Drone – Emergency Equipment Delivery',
    excerpt: 'Long-range communication drone for delivering first aid equipment in isolated areas.',
    categories: ['Code & Software', 'Digital Fabrication', 'Interaction Design'],
    image: '/assets/projects/Drone_Hackathon/Drone.png',
    date: '2024-10-10',
  },
  {
    slug: 'drone-detection',
    title: 'Drone Detection System',
    excerpt: 'Advanced drone detection and tracking system using RF technology.',
    categories: ['Electronics', 'Code & Software', 'Mechanical Engineering', 'Innovation'],
    image: '/assets/projects/Drone_Detection/Drone_Detection.png',
    date: '2024-09-05',
  },
  {
    slug: 'rythme-car-game',
    title: 'Rythme Car Game',
    excerpt: 'Rhythm-based driving game in Python with interactive menu and score system.',
    categories: ['Code & Software', 'Interaction Design'],
    image: '/assets/projects/Rythme_Car_Game/data/assets/voiture.png',
    date: '2024-08-20',
  },
  {
    slug: 'kombucha-biohybrid',
    title: 'BioHybrid Device Kombucha',
    excerpt: 'Exploring the future of Bio-Hybrid Devices: where living materials meet interactive electronics.',
    categories: ['Biomaterials', 'Product Design', 'Research', 'Innovation', 'Sustainability'],
    image: '/assets/projects/Kombucha/Kombucha_page.png',
    date: '2024-07-15',
  },
  {
    slug: 'mycelium-sofa',
    title: 'Design of a Modular Sofa in Mycelium',
    excerpt: 'Eco-designed modular sofa using mycelium biomaterial, combining sustainability with innovative 3D fabrication.',
    categories: ['Biomaterials', 'Product Design', 'Tutorials', 'Sustainability', 'Innovation'],
    image: '/assets/projects/Mycelium/Mycelium_Texture.jpg',
    date: '2024-06-10',
  },
  {
    slug: 'pen-3d-print-tutorial',
    title: 'Tutorial: 3D Printed Pen',
    excerpt: 'Complete tutorial on designing and 3D printing a functional pen using SolidWorks and OrcaSlicer.',
    categories: ['Digital Fabrication', 'Tutorials'],
    image: '/assets/projects/3D_Pen/Pen_Sketch1.png',
    date: '2024-05-20',
  },
];
