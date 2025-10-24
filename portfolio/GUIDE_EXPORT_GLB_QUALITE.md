# 🎨 Guide : Exporter un GLB de Haute Qualité depuis SolidWorks

## 🚨 Problème : Qualité médiocre de l'export GLB

SolidWorks n'exporte **pas directement en GLB** et la conversion peut perdre beaucoup de qualité.

---

## ✅ MÉTHODE RECOMMANDÉE (Meilleure qualité)

### **Option 1 : SolidWorks → OBJ → Blender → GLB** ⭐ **RECOMMANDÉ**

#### **Étape 1 : Exporter depuis SolidWorks**
1. Ouvre ton assemblage dans SolidWorks
2. **Fichier** → **Enregistrer sous**
3. Choisis le format : **OBJ (*.obj)** ou **STL (*.stl)**
4. **Paramètres d'export :**
   - ✅ **Qualité** : Haute ou Personnalisée
   - ✅ **Résolution** : Fine (augmente le nombre de triangles)
   - ✅ **Unités** : mm
   - ✅ **Inclure les normales** : Oui
   - ✅ **Exporter les couleurs** : Oui (si disponible)

#### **Étape 2 : Importer dans Blender** (GRATUIT)
1. Télécharge [Blender](https://www.blender.org/download/) (gratuit, open-source)
2. Ouvre Blender
3. **Fichier** → **Importer** → **Wavefront (.obj)** ou **STL (.stl)**
4. Sélectionne ton fichier exporté

#### **Étape 3 : Nettoyer et optimiser dans Blender**
1. **Sélectionne tout** : `A`
2. **Recalculer les normales** : `Alt + N` → **Recalculate Outside**
3. **Smooth Shading** : Clic droit → **Shade Smooth**
4. **Ajouter des matériaux** :
   - Passe en mode **Shading** (onglet en haut)
   - Sélectionne chaque partie (boîtier, parabole, LED, etc.)
   - Crée un matériau dans l'onglet **Material Properties**
   - Configure :
     - **Base Color** : Couleur de la pièce
     - **Metallic** : 0.0–1.0 (plastique vs métal)
     - **Roughness** : 0.0–1.0 (brillant vs mat)
5. **Optimiser la géométrie** (optionnel) :
   - Sélectionne l'objet
   - Ajoute un modificateur **Decimate** pour réduire les polygones
   - Ajuste le **Ratio** (0.5 = 50% des faces)

#### **Étape 4 : Exporter en GLB**
1. **Fichier** → **Exporter** → **glTF 2.0 (.glb/.gltf)**
2. **Paramètres d'export** :
   - ✅ Format : **glTF Binary (.glb)**
   - ✅ **Include** : Selected Objects (ou Visible Objects)
   - ✅ **Transform** : +Y Up
   - ✅ **Geometry** :
     - ✅ Apply Modifiers
     - ✅ UVs
     - ✅ Normals
     - ✅ Tangents
   - ✅ **Materials** : Export
   - ✅ **Compression** : Désactivé (pour meilleure qualité)
3. **Exporter glTF 2.0**

---

### **Option 2 : SolidWorks → STEP → Blender → GLB**

Si OBJ/STL ne conserve pas les couleurs :

1. **SolidWorks** : Exporte en **STEP (.step ou .stp)**
2. **Blender** : Installe le plugin [CAD Sketcher](https://www.cadsketcher.com/) ou utilise **FreeCAD** comme intermédiaire
3. **FreeCAD** (gratuit) :
   - Importe le STEP
   - Exporte en OBJ ou STL avec couleurs
4. **Blender** : Importe et exporte en GLB (étapes ci-dessus)

---

### **Option 3 : Utiliser un Convertisseur en Ligne** (Rapide mais qualité variable)

#### **Sites recommandés :**
1. **[Aspose 3D Converter](https://products.aspose.app/3d/conversion)** ⭐
   - Supporte STEP, OBJ, STL → GLB
   - Gratuit
   - Bonne qualité

2. **[AnyConv](https://anyconv.com/fr/step-en-glb-convertisseur/)**
   - STEP → GLB direct
   - Rapide

3. **[CloudConvert](https://cloudconvert.com/step-to-glb)**
   - Conversion en ligne
   - Options avancées

**⚠️ Attention :** Les convertisseurs en ligne peuvent perdre les matériaux et couleurs.

---

## 🎯 PARAMÈTRES BLENDER POUR MAXIMUM DE QUALITÉ

### **Matériaux PBR (Physically Based Rendering)**

Pour chaque pièce, configure dans **Shading** :

#### **Boîtier Noir Mat**
```
Base Color: #1a1a1a (noir)
Metallic: 0.2
Roughness: 0.8
```

#### **Parabole Blanche (PLA)**
```
Base Color: #f5f5f5 (blanc)
Metallic: 0.05
Roughness: 0.4
Clearcoat: 0.2
```

#### **Potentiomètre Noir Brillant**
```
Base Color: #0a0a0a (noir)
Metallic: 0.7
Roughness: 0.3
Emission: #ff6600 (orange)
Emission Strength: 0.3
```

#### **LED Rouge**
```
Base Color: #ff0000
Emission: #ff0000
Emission Strength: 1.0
```

#### **LED Verte**
```
Base Color: #00ff00
Emission: #00ff00
Emission Strength: 1.0
```

---

## 🔧 PROBLÈMES COURANTS ET SOLUTIONS

### **Problème 1 : Modèle trop lourd (> 5 Mo)**
**Solution :**
- Dans Blender, utilise le modificateur **Decimate** (ratio 0.3–0.7)
- Réduis la résolution des textures si tu en as
- Active la **compression Draco** lors de l'export GLB

### **Problème 2 : Normales inversées (faces noires)**
**Solution :**
- Dans Blender : Sélectionne tout → `Alt + N` → **Recalculate Outside**

### **Problème 3 : Pas de couleurs/matériaux**
**Solution :**
- Assure-toi d'exporter avec **Materials** activé
- Recrée manuellement les matériaux dans Blender

### **Problème 4 : Échelle incorrecte dans Three.js**
**Solution :**
- Dans ton code, ajuste `radarModel.scale.set(X, X, X)`
- Ou dans Blender, avant export : `S` (scale) → tape la valeur → `Enter`

### **Problème 5 : Orientaton incorrecte**
**Solution :**
- Dans Blender : Rotate `R` + `X/Y/Z` + 90
- Ou lors de l'export GLB, change **Transform** → +Y Up / +Z Up

---

## 📊 CHECKLIST QUALITÉ

Avant d'exporter ton GLB final :

- [ ] Toutes les pièces ont des **matériaux PBR** assignés
- [ ] **Shade Smooth** appliqué sur toutes les surfaces courbes
- [ ] **Normales recalculées** (pas de faces noires)
- [ ] **Échelle correcte** (1 unité = 1 mètre dans Three.js)
- [ ] **Origine au centre** de l'objet (dans Blender : `Object` → `Set Origin` → `Origin to Geometry`)
- [ ] **Pas de géométrie cachée** ou en double
- [ ] Taille du fichier < 10 Mo (idéalement < 5 Mo)

---

## 🎓 TUTORIELS VIDÉO RECOMMANDÉS

1. **Blender GLB Export** : [YouTube - Blender to Three.js](https://www.youtube.com/results?search_query=blender+gltf+export+threejs)
2. **SolidWorks to Blender** : [YouTube - CAD to Blender workflow](https://www.youtube.com/results?search_query=solidworks+to+blender)
3. **PBR Materials in Blender** : [YouTube - PBR texturing](https://www.youtube.com/results?search_query=blender+pbr+materials)

---

## 💡 ALTERNATIVE : Utiliser des Captures d'Écran de Haute Qualité

Si le GLB reste de mauvaise qualité, tu peux aussi :

1. **Dans SolidWorks** : Faire un rendu photoréaliste (SolidWorks Visualize)
2. Exporter des images haute résolution
3. Les afficher dans ton portfolio au lieu du modèle 3D

---

## 🚀 RÉSUMÉ RAPIDE

**Workflow optimal :**
```
SolidWorks → Export OBJ (haute qualité)
    ↓
Blender (gratuit) → Nettoyer + Matériaux PBR
    ↓
Export GLB (glTF Binary, compression OFF)
    ↓
Three.js ✨
```

**Temps estimé :** 10–30 minutes selon la complexité

---

**Besoin d'aide ?** Envoie-moi une capture d'écran de ton modèle dans Blender et je t'aiderai à configurer les matériaux ! 😊

