"""
Script pour rendre le fond gris de telephone.png transparent
"""
from PIL import Image
import os

# Chemins
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHONE_IMAGE = os.path.join(PROJECT_ROOT, "public", "assets", "projects", "Rythme_Car_Game", "data", "assets", "telephone.png")

print("=" * 60)
print("RENDRE LE FOND DU TELEPHONE TRANSPARENT")
print("=" * 60)
print()

# Ouvrir l'image
print(f"Ouverture de l'image: {PHONE_IMAGE}")
img = Image.open(PHONE_IMAGE)

# Convertir en RGBA si nécessaire
if img.mode != 'RGBA':
    img = img.convert('RGBA')
    print("Image convertie en RGBA")

# Obtenir les données de pixels
data = img.getdata()

# Nouvelle liste de pixels
new_data = []

# Seuil de gris à rendre transparent (ajustable)
# Les pixels gris foncés (proche du noir ou gris moyen) deviennent transparents
GRAY_THRESHOLD_MIN = 40
GRAY_THRESHOLD_MAX = 160

print(f"Traitement des pixels (gris entre {GRAY_THRESHOLD_MIN} et {GRAY_THRESHOLD_MAX} = transparent)...")

for item in data:
    r, g, b, a = item
    
    # Si le pixel est grisâtre (R, G, B similaires et dans la plage grise)
    # ET que la différence entre R, G, B est faible (indique du gris)
    if (GRAY_THRESHOLD_MIN <= r <= GRAY_THRESHOLD_MAX and
        GRAY_THRESHOLD_MIN <= g <= GRAY_THRESHOLD_MAX and
        GRAY_THRESHOLD_MIN <= b <= GRAY_THRESHOLD_MAX and
        abs(r - g) < 30 and abs(g - b) < 30 and abs(r - b) < 30):
        # Rendre ce pixel transparent
        new_data.append((r, g, b, 0))
    else:
        # Garder le pixel tel quel
        new_data.append(item)

# Appliquer les nouvelles données
img.putdata(new_data)

# Sauvegarder
output_path = PHONE_IMAGE  # Écrase l'original
print(f"Sauvegarde de l'image transparente: {output_path}")
img.save(output_path, "PNG")

print()
print("=" * 60)
print("SUCCES ! Le fond gris est maintenant transparent")
print("=" * 60)
print()
print("L'image a ete mise a jour. Rafraichis ton navigateur !")

