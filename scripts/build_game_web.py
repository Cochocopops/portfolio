"""
Script automatique pour convertir le jeu Pygame en version web avec Pygbag
Usage: python scripts/build_game_web.py
"""
import os
import shutil
import subprocess
import sys

print("=" * 60)
print("CONVERSION RYTHME CAR GAME -> VERSION WEB")
print("=" * 60)

# Chemins
GAME_DIR = os.path.join("public", "assets", "projects", "Rythme_Car_Game")
PUBLIC_GAMES_DIR = os.path.join("public", "games", "rythme-car-game")

# Étape 1: Vérifier que pygbag est installé
print("\nEtape 1/4 : Verification de Pygbag...")
try:
    import pygbag
    print("OK Pygbag trouve!")
except ImportError:
    print("Pygbag non trouve, installation en cours...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pygbag"])
    print("OK Pygbag installe!")

# Étape 2: Vérifier que main.py existe
print("\nEtape 2/4 : Verification des fichiers...")
main_py = os.path.join(GAME_DIR, "main.py")
if not os.path.exists(main_py):
    print(f"ERREUR: {main_py} introuvable!")
    print("Le fichier main.py a deja ete cree. Verifie le dossier.")
    sys.exit(1)
print(f"OK main.py trouve: {main_py}")

# Vérifier les assets
data_dir = os.path.join(GAME_DIR, "data")
if not os.path.exists(data_dir):
    print(f"Attention: Dossier data/ introuvable dans {GAME_DIR}")
    print("   Le jeu pourrait ne pas fonctionner sans les assets!")
else:
    print(f"OK Dossier data/ trouve")

# Étape 3: Construction avec Pygbag
print("\nEtape 3/4 : Construction de la version web...")
print("Cela peut prendre 30-60 secondes...")

try:
    # Commande pygbag
    subprocess.check_call([
        sys.executable, "-m", "pygbag",
        "--template", "noctx.tmpl",  # Template sans contexte 3D
        "--build",
        GAME_DIR
    ])
    print("OK Construction reussie!")
except subprocess.CalledProcessError as e:
    print(f"ERREUR lors de la construction: {e}")
    print("\nConseils de depannage:")
    print("  - Verifie que tous les assets sont dans data/")
    print("  - Verifie les logs ci-dessus pour plus de details")
    sys.exit(1)

# Étape 4: Copie dans public/games/
print("\nEtape 4/4 : Copie vers public/games/...")

# Vérifier que le build existe
build_dir = os.path.join(GAME_DIR, "build", "web")
if not os.path.exists(build_dir):
    print(f"ERREUR: Le dossier build/web n'a pas ete cree!")
    print(f"   Cherche dans: {build_dir}")
    sys.exit(1)

# Créer le dossier de destination
os.makedirs(PUBLIC_GAMES_DIR, exist_ok=True)

# Supprimer l'ancien build si existant
if os.path.exists(PUBLIC_GAMES_DIR):
    print(f"Suppression de l'ancien build...")
    shutil.rmtree(PUBLIC_GAMES_DIR)

# Copier les nouveaux fichiers
print(f"Copie de {build_dir} vers {PUBLIC_GAMES_DIR}...")
shutil.copytree(build_dir, PUBLIC_GAMES_DIR)

print("OK Fichiers copies!")

# Mise à jour du fichier page.tsx
print("\nMise a jour de la page projet...")
page_tsx = os.path.join("src", "app", "projects", "rythme-car-game", "page.tsx")
if os.path.exists(page_tsx):
    with open(page_tsx, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remplacer la constante GAME_WEB_URL
    if "const GAME_WEB_URL = '';" in content:
        content = content.replace(
            "const GAME_WEB_URL = '';",
            "const GAME_WEB_URL = '/games/rythme-car-game';"
        )
        with open(page_tsx, 'w', encoding='utf-8') as f:
            f.write(content)
        print("OK page.tsx mise a jour!")
    else:
        print("page.tsx deja configuree")
else:
    print("page.tsx non trouvee, mise a jour manuelle necessaire")

# Résumé
print("\n" + "=" * 60)
print("CONVERSION TERMINEE AVEC SUCCES!")
print("=" * 60)
print(f"\nFichiers web disponibles dans:")
print(f"   {PUBLIC_GAMES_DIR}")
print(f"\nPour tester:")
print(f"   1. Redemarre le serveur Next.js")
print(f"   2. Va sur: http://localhost:3000/projects/rythme-car-game")
print(f"   3. Clique sur 'Jouer dans le navigateur'")
print(f"\nLe jeu devrait se lancer directement!")
print("\nConseils:")
print("   - Si l'audio ne fonctionne pas, c'est normal (restrictions navigateur)")
print("   - Les performances peuvent etre legerement inferieures au jeu local")
print("   - Pour rebuilder, relance simplement ce script")
print("\n" + "=" * 60)

