"""
Script pour convertir le jeu en version web avec Pygbag
"""
import os
import sys
import subprocess
import shutil

# Chemins
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GAME_SOURCE = os.path.join(PROJECT_ROOT, "public", "assets", "projects", "Rythme_Car_Game")
WEB_OUTPUT = os.path.join(PROJECT_ROOT, "public", "games", "rythme-car-game")

print("=" * 60)
print("CONVERSION DU JEU EN VERSION WEB (PYGBAG)")
print("=" * 60)
print()

# Étape 1 : Installer Pygbag
print("[1/4] Installation de Pygbag...")
try:
    subprocess.run([sys.executable, "-m", "pip", "install", "pygbag", "--quiet"], check=True)
    print("OK - Pygbag installe")
except subprocess.CalledProcessError as e:
    print(f"ERREUR lors de l'installation de Pygbag: {e}")
    sys.exit(1)

# Étape 2 : Créer un dossier temporaire pour le build
print("\n[2/4] Preparation du dossier de build...")
TEMP_BUILD_DIR = os.path.join(PROJECT_ROOT, "temp_game_build")
if os.path.exists(TEMP_BUILD_DIR):
    shutil.rmtree(TEMP_BUILD_DIR)
os.makedirs(TEMP_BUILD_DIR)

# Copier main_web.py comme main.py (requis par Pygbag)
shutil.copy(
    os.path.join(GAME_SOURCE, "main_web.py"),
    os.path.join(TEMP_BUILD_DIR, "main.py")
)

# Copier requirements.txt pour Pygbag
requirements_source = os.path.join(GAME_SOURCE, "requirements.txt")
if os.path.exists(requirements_source):
    shutil.copy(requirements_source, os.path.join(TEMP_BUILD_DIR, "requirements.txt"))
    print("OK - requirements.txt copie")

# Copier les assets si disponibles
data_source = os.path.join(GAME_SOURCE, "data")
if os.path.exists(data_source):
    shutil.copytree(data_source, os.path.join(TEMP_BUILD_DIR, "data"))
    print("OK - Assets copies")
else:
    print("ATTENTION - Pas d'assets trouves (le jeu fonctionnera sans audio/images)")

# Étape 3 : Lancer Pygbag
print("\n[3/4] Compilation avec Pygbag...")
print("(Cela peut prendre 1-2 minutes...)")
try:
    result = subprocess.run(
        [sys.executable, "-m", "pygbag", "--build", TEMP_BUILD_DIR],
        cwd=TEMP_BUILD_DIR,
        capture_output=True,
        text=True,
        timeout=300  # 5 minutes max
    )
    
    if result.returncode != 0:
        print("ERREUR lors de la compilation:")
        print(result.stderr)
        sys.exit(1)
    
    print("OK - Compilation terminee")
except subprocess.TimeoutExpired:
    print("ERREUR - Timeout lors de la compilation")
    sys.exit(1)
except Exception as e:
    print(f"ERREUR - {e}")
    sys.exit(1)

# Étape 4 : Copier les fichiers générés vers public/games
print("\n[4/4] Copie des fichiers vers le portfolio...")
BUILD_OUTPUT = os.path.join(TEMP_BUILD_DIR, "build", "web")

if not os.path.exists(BUILD_OUTPUT):
    print(f"ERREUR - Le dossier de build n'existe pas: {BUILD_OUTPUT}")
    sys.exit(1)

# Créer le dossier de destination
if os.path.exists(WEB_OUTPUT):
    shutil.rmtree(WEB_OUTPUT)
os.makedirs(os.path.dirname(WEB_OUTPUT), exist_ok=True)

# Copier tous les fichiers
shutil.copytree(BUILD_OUTPUT, WEB_OUTPUT)
print(f"OK - Fichiers copies vers {WEB_OUTPUT}")

# Nettoyage
print("\n[Nettoyage] Suppression du dossier temporaire...")
shutil.rmtree(TEMP_BUILD_DIR)

print()
print("=" * 60)
print("SUCCES ! Le jeu est pret")
print("=" * 60)
print()
print(f"Fichiers generes dans: {WEB_OUTPUT}")
print()
print("Pour tester:")
print("1. Lance Next.js: npm run dev")
print("2. Va sur: http://localhost:3000/projects/rythme-car-game")
print()
print("=" * 60)

