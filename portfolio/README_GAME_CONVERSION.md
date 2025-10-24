# 🎮 Guide de conversion Rythme Car Game vers Web

## Option 1: Pygbag (Recommandé pour Pygame)

### Prérequis
```bash
pip install pygbag
```

### Modification du code nécessaire

Ton fichier `game.py` ou `menu.py` principal doit être adapté pour Pygbag.
Remplace la boucle principale par une fonction async:

```python
import asyncio
import pygame

async def main():
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        
        # Ton code de jeu ici
        
        pygame.display.flip()
        clock.tick(fps)
        await asyncio.sleep(0)  # CRUCIAL pour Pygbag!

asyncio.run(main())
```

### Conversion automatique

Execute:
```bash
python scripts/convert_game_to_web.py
```

OU manuellement:
```bash
cd public/assets/projects/Rythme_Car_Game
python -m pygbag --build .
```

### Hébergement du jeu

Les fichiers générés seront dans `build/web/`.
Copie-les dans `public/games/rythme-car-game/` de ton portfolio.

---

## Option 2: Hébergement Python externe + iframe

### Services gratuits:
- **Replit**: Upload ton jeu, lance-le, récupère l'URL
- **PythonAnywhere**: Héberge gratuitement des apps Python
- **Heroku** (limite gratuite limitée)

### Dans ton portfolio:
```tsx
<iframe 
  src="https://ton-jeu.replit.app" 
  width="100%" 
  height="800px"
/>
```

---

## Option 3: Vidéo/GIF démonstration

Si la conversion complète est complexe:

1. Enregistre une vidéo du gameplay
2. Convertis en GIF ou MP4
3. Place dans `public/assets/projects/Rythme_Car_Game/`
4. Affiche sur la page projet

---

## Structure actuelle

```
public/assets/projects/Rythme_Car_Game/
├── data/
│   ├── assets/       # Images du jeu
│   └── audio/        # Sons/musique
├── game.py           # Code principal
├── menu.py           # Menu (si existant)
├── scores.csv        # Scores sauvegardés
└── requirements.txt  # Dépendances Python
```

## Page du projet

Accessible sur: `/projects/rythme-car-game`

Le jeu sera affiché si les fichiers web sont présents dans `public/games/rythme-car-game/`.
Sinon, un message d'instruction s'affiche.

---

## Notes importantes Pygbag

1. **asyncio obligatoire**: Toute boucle while doit contenir `await asyncio.sleep(0)`
2. **Pas de threads**: Pygbag ne supporte pas threading
3. **Chemins relatifs**: Utilise `data/audio/file.mp3` pas de chemins absolus
4. **Taille fichiers**: Les assets lourds ralentissent le chargement web

---

## Dépannage

### "Module asyncio not found"
→ Ajoute `import asyncio` en haut de ton fichier

### "Game doesn't load in browser"
→ Vérifie la console navigateur (F12)
→ Assure-toi que tous les chemins d'assets sont relatifs

### "Audio doesn't work"
→ Les navigateurs bloquent l'autoplay. Ajoute un bouton "Start" qui lance l'audio après un click utilisateur.

---

## Contact

Si tu as besoin d'aide pour la conversion, contacte-moi !

