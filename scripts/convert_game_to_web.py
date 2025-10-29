"""
Script de conversion du jeu Pygame vers version web avec Pygbag
"""
import os
import shutil
import subprocess
import sys

# Configuration des chemins
GAME_SOURCE = "public/assets/projects/Rythme_Car_Game"
PORTFOLIO_PUBLIC = "public/games/rythme-car-game"

def main():
    print("🎮 Conversion Rythme Car Game vers Web")
    print("=" * 50)
    
    # Étape 1: Vérifier que pygbag est installé
    print("\n📦 Vérification de pygbag...")
    try:
        import pygbag
        print("✅ pygbag trouvé")
    except ImportError:
        print("⚠️  pygbag non trouvé, installation...")
        subprocess.run([sys.executable, "-m", "pip", "install", "pygbag"], check=True)
    
    # Étape 2: Créer un main.py compatible Pygbag
    print("\n🔧 Préparation du code pour Pygbag...")
    create_pygbag_compatible_main()
    
    # Étape 3: Construire la version web
    print("\n🏗️  Construction de la version web...")
    build_web_version()
    
    # Étape 4: Copier dans public/
    print("\n📋 Copie dans le portfolio...")
    copy_to_portfolio()
    
    print("\n✅ Conversion terminée!")
    print(f"➡️  Fichiers disponibles dans: {PORTFOLIO_PUBLIC}")
    print("🌐 Redémarre le serveur Next.js et va sur /games/rythme-car-game")

def create_pygbag_compatible_main():
    """Crée un main.py adapté pour Pygbag (asyncio requis)"""
    main_content = '''
import asyncio
import pygame
import csv
import random
from datetime import datetime

# Initialize Pygame
pygame.init()
pygame.mixer.init()

width, height = (444, 790)
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption('Rythme Car Game')

# Game variables
clock = pygame.time.Clock()
fps = 60
gameover = False
speed = 2
score = 0

async def main():
    global gameover, score, speed
    
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        
        screen.fill((30, 30, 30))
        
        # Game logic here
        pygame.display.flip()
        clock.tick(fps)
        await asyncio.sleep(0)  # Important pour Pygbag!

asyncio.run(main())
'''
    
    target_path = os.path.join(GAME_SOURCE, "main.py")
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(main_content)
    print(f"✅ main.py créé: {target_path}")

def build_web_version():
    """Lance pygbag pour construire la version web"""
    try:
        subprocess.run([
            sys.executable, "-m", "pygbag",
            "--build",
            GAME_SOURCE
        ], check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Erreur lors de la construction: {e}")
        sys.exit(1)

def copy_to_portfolio():
    """Copie le build web dans public/games/"""
    source = os.path.join(GAME_SOURCE, "build", "web")
    
    if not os.path.exists(source):
        print(f"❌ Dossier build/web introuvable: {source}")
        return
    
    # Créer le dossier de destination
    os.makedirs(PORTFOLIO_PUBLIC, exist_ok=True)
    
    # Copier tous les fichiers
    if os.path.exists(PORTFOLIO_PUBLIC):
        shutil.rmtree(PORTFOLIO_PUBLIC)
    shutil.copytree(source, PORTFOLIO_PUBLIC)
    
    print(f"✅ Fichiers copiés dans {PORTFOLIO_PUBLIC}")

if __name__ == "__main__":
    main()

