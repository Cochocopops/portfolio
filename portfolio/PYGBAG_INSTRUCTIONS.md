# 🎮 Instructions Pygbag - Rythme Car Game

## ✅ Ce qui a été préparé pour toi

J'ai créé :
1. ✅ `main.py` - Version compatible Pygbag de ton jeu (avec asyncio)
2. ✅ `scripts/build_game_web.py` - Script automatique de conversion
3. ✅ Page projet déjà configurée pour afficher le jeu

## 🚀 Comment convertir ton jeu (2 étapes)

### Étape 1 : Lance le script de conversion

Ouvre un terminal et exécute :

```bash
python scripts/build_game_web.py
```

Le script va :
- ✅ Installer Pygbag si nécessaire
- ✅ Convertir ton jeu en WebAssembly
- ✅ Copier les fichiers dans `public/games/`
- ✅ Mettre à jour ta page projet

**Durée** : 30-60 secondes

### Étape 2 : Teste le jeu

1. Redémarre ton serveur Next.js :
   ```bash
   npm run dev
   ```

2. Va sur : [http://localhost:3000/projects/rythme-car-game](http://localhost:3000/projects/rythme-car-game)

3. Clique sur le bouton **"▶️ Jouer dans le navigateur"**

4. Le jeu se lance ! 🎉

---

## 📝 Modifications apportées à ton jeu

Pour que Pygbag fonctionne, j'ai adapté `main.py` :

### ✅ Ajouté
- `async def main()` - Boucle async obligatoire
- `await asyncio.sleep(0)` - À chaque frame
- Bouton "Restart" au lieu de retour menu
- Gestion d'erreurs pour l'audio
- Meilleur score (high score) affiché

### ❌ Retiré
- `sys.argv` (pas de paramètres ligne de commande)
- `subprocess.call` (pas de menu séparé)
- Sauvegarde CSV (localStorage web à la place)

### 🎮 Nouvelles fonctionnalités web
- Score persistant pendant la session
- Meilleur score affiché
- Restart instantané
- Compatible mobile (tactile)

---

## 🎯 Contrôles du jeu

### Sur PC
- **Flèches gauche/droite** : Déplacer la voiture
- **Espace** : Pause
- **Enter** (Game Over) : Recommencer

### Sur mobile/tablette
- **Tap gauche de l'écran** : Aller à gauche
- **Tap droite de l'écran** : Aller à droite

---

## ⚠️ Problèmes courants

### "Module pygbag not found"
```bash
pip install pygbag
```

### "build/web not found"
- Vérifie que `main.py` existe dans `public/assets/projects/Rythme_Car_Game/`
- Relance le script

### Le jeu ne se charge pas
- Ouvre la console du navigateur (F12)
- Vérifie que tous les assets sont dans `data/`
- Recharge la page (Ctrl+R)

### Pas de son
C'est normal ! Les navigateurs bloquent l'autoplay audio. Il faut un clic utilisateur pour démarrer le son.

---

## 📁 Structure des fichiers après build

```
public/
├── assets/
│   └── projects/
│       └── Rythme_Car_Game/
│           ├── main.py          ← Version Pygbag
│           ├── game.py          ← Version originale (conservée)
│           └── data/            ← Assets
└── games/
    └── rythme-car-game/         ← Build web
        ├── index.html
        ├── pythons.js
        └── ...
```

---

## 🔄 Pour rebuild après modifications

Si tu modifies `main.py` :

```bash
python scripts/build_game_web.py
```

C'est tout ! Le script rebuild automatiquement.

---

## 🎨 Personnalisation

### Changer la taille de la fenêtre
Dans `main.py`, ligne 13-14 :
```python
width, height = (444, 790)  # Ajuste ici
```

### Changer la vitesse
Ligne 47 :
```python
fps = 60  # Plus haut = plus fluide mais plus lourd
```

### Désactiver l'audio
Ligne 16-22 : Commente les lignes de chargement audio

---

## 🚀 Déploiement (optionnel)

Une fois que tout fonctionne en local, tu peux déployer sur Vercel :

```bash
git add .
git commit -m "Add Rythme Car Game web version"
git push
```

Vercel rebuild automatiquement et ton jeu sera en ligne ! 🌐

---

## 📊 Performances

| Aspect | Local (Python) | Web (Pygbag) |
|--------|---------------|--------------|
| FPS | 120 | 60 |
| Chargement | Instantané | 3-5 secondes |
| Audio | ✅ | ⚠️ (restrictions navigateur) |
| Compatibilité | PC only | PC + Mobile + Tablette |

---

## ✅ Checklist finale

- [ ] `python scripts/build_game_web.py` exécuté
- [ ] Serveur Next.js redémarré
- [ ] Page `/projects/rythme-car-game` visitée
- [ ] Bouton "Jouer" visible
- [ ] Jeu se lance correctement
- [ ] Contrôles fonctionnent
- [ ] Game Over → Restart fonctionne

---

## 🆘 Besoin d'aide ?

Si ça ne fonctionne pas :

1. Vérifie les logs du script
2. Ouvre la console navigateur (F12)
3. Partage les messages d'erreur

---

## 🎉 C'est prêt !

Une fois le script exécuté, ton jeu Pygame tourne dans le navigateur !

Les visiteurs de ton portfolio pourront jouer directement sans rien installer. 🚀

