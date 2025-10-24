"""
Script pour extraire la première frame d'un GIF
"""
from PIL import Image
import os

# Chemins
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GIF_PATH = os.path.join(PROJECT_ROOT, "public", "assets", "projects", "Rythme_Car_Game", "data", "assets", "Intro.gif")
OUTPUT_PATH = os.path.join(PROJECT_ROOT, "public", "assets", "projects", "Rythme_Car_Game", "thumbnail.jpg")

print("Extraction de la première frame du GIF...")

# Ouvrir le GIF
gif = Image.open(GIF_PATH)

# Prendre la première frame
gif.seek(0)

# Convertir en RGB si nécessaire (pour sauvegarder en JPG)
if gif.mode != 'RGB':
    rgb_frame = gif.convert('RGB')
else:
    rgb_frame = gif

# Sauvegarder
rgb_frame.save(OUTPUT_PATH, 'JPEG', quality=90)

print(f"Image sauvegardée : {OUTPUT_PATH}")
print("Terminé !")

