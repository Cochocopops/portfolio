# Portfolio - Corentin Chantereau

Portfolio personnel développé avec Next.js 15, présentant mes projets en design, technologie créative, biomaterials et ingénierie.

## Démarrage rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Production

```bash
npm run build
npm start
```

## Structure du projet

```
portfolio/
├── src/
│   ├── app/              # Pages Next.js (App Router)
│   │   ├── about/        # Page À propos
│   │   ├── projects/     # Pages projets
│   │   ├── contact/      # Page contact
│   │   ├── utilisateur/  # Panel admin
│   │   └── api/          # API Routes
│   ├── components/       # Composants React réutilisables
│   └── types/            # Définitions TypeScript
├── public/               # Assets statiques
│   ├── assets/
│   │   ├── home/         # CV, certificats
│   │   └── projects/     # Images et fichiers projets
│   └── games/            # Jeux interactifs
└── scripts/              # Scripts utilitaires
```

## Fonctionnalités

### Pages principales
- **Accueil** : Carousel 3D interactif avec projets mis en avant
- **Projects** : Galerie de projets filtrables par catégories
- **About** : Présentation, compétences, parcours
- **Contact** : Formulaire de contact fonctionnel

### Fonctionnalités avancées
- **Visualisations 3D** : React Three Fiber pour modèles interactifs
- **Panel Admin** : Gestion de projets avec authentification
- **Contact Email** : Envoi d'emails via Nodemailer
- **Responsive** : Design adaptatif mobile/desktop
- **Optimisé** : Lazy loading, code splitting, performances

## 🛠️ Technologies

- **Framework** : Next.js 15 (App Router, Turbopack)
- **UI** : React 19, Tailwind CSS 4
- **3D** : Three.js, React Three Fiber, Drei
- **Animations** : Framer Motion
- **Email** : Nodemailer
- **Icons** : Lucide React
- **Langage** : TypeScript

## Composants 3D

### HomeCarousel3D
Carousel interactif affichant des modèles 3D en rotation (canapé mycelium, radar).

### RadarScene
Scène 3D complexe avec détection de drones, contrôles interactifs et matériaux PBR.

### MyceliumSofaScene
Visualisation 3D du canapé en mycelium avec textures personnalisées.

## Ajouter un projet

1. Ajouter les assets dans `public/assets/projects/[slug]/`
2. Éditer `src/app/projects/data.ts` :

```typescript
{
  slug: 'mon-projet',
  title: 'Mon Projet',
  excerpt: 'Description courte',
  categories: ['Product Design', 'Innovation'],
  image: '/assets/projects/mon-projet/cover.jpg',
  date: '2025-01-15',
}
```

3. Créer la page `src/app/projects/[slug]/page.tsx`

## Panel Admin

Accès : `/utilisateur`

Fonctionnalités :
- ✅ Authentification sécurisée
- ✅ Ajout/modification de projets
- ✅ Upload d'images
- ✅ Gestion des métadonnées

### Configuration

Créer `.env.local` :

```env
# Authentification Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=votre_mot_de_passe_securise

# Email Contact (optionnel)
EMAIL_USER=votre@email.com
EMAIL_PASS=votre_mot_de_passe_app
EMAIL_TO=destination@email.com
```

## Configuration Email

Pour activer le formulaire de contact, configurer les variables d'environnement email dans `.env.local`.

**Gmail** : Utiliser un [mot de passe d'application](https://support.google.com/accounts/answer/185833).

## Jeux intégrés

Le portfolio inclut des jeux interactifs dans `public/games/`.

Exemple : Rythme Car Game (Python → Web avec Pygbag)

## Dépendances principales

```json
{
  "@react-three/drei": "^10.7.6",
  "@react-three/fiber": "^9.4.0",
  "framer-motion": "^12.23.24",
  "lucide-react": "^0.545.0",
  "next": "15.5.4",
  "nodemailer": "^6.9.15",
  "three": "^0.180.0"
}
```

## 🚀 Déploiement

### Vercel (Recommandé)

1. Push sur GitHub
2. Connecter à [Vercel](https://vercel.com)
3. Configurer les variables d'environnement
4. Déployer

### Autre hébergeur

```bash
npm run build
npm start
```

## 📄 Licence

