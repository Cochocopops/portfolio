// @ts-nocheck
'use client';

import React, { Suspense, useRef, memo, useEffect, useMemo, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { Group, Mesh } from 'three';

// Enregistrer les éléments Three.js pour TypeScript
extend(THREE);

// ============================================
// CRÉATION DES TEXTURES (une seule fois)
// ============================================

/**
 * Crée une texture procédurale de stries pour la parabole (impression 3D)
 * Cette texture est créée une seule fois au chargement du module
 */
const createStripeTexture = (): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  // Fond gris clair métallique
  ctx.fillStyle = '#B8B8B8';
  ctx.fillRect(0, 0, 512, 512);
  
  // Stries subtiles (impression 3D)
  for (let i = 0; i < 512; i += 2) {
    ctx.fillStyle = i % 4 === 0 ? '#ACACAC' : '#C4C4C4';
    ctx.fillRect(0, i, 512, 1);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.needsUpdate = true;
  return texture;
};

// Créer la texture une seule fois au chargement du module
const STRIPE_TEXTURE = createStripeTexture();

// ============================================
// FONCTION D'APPLICATION DES MATÉRIAUX PBR
// ============================================

/**
 * 🎨 FONCTION D'APPLICATION DES MATÉRIAUX PBR - RADAR
 * 
 * Applique des matériaux physiquement réalistes selon les VRAIS NOMS du GLB
 */
function applyRadarMaterials(model: THREE.Object3D): {
  parabola: THREE.Mesh | null;
  socle2: THREE.Mesh | null;
  potentiometer: THREE.Mesh | null;
  potentiometerButton: THREE.Mesh | null;
  ledRed: THREE.Mesh | null;
  ledGreen: THREE.Mesh | null;
  socle1: THREE.Mesh | null;
  socle4: THREE.Mesh | null;
} {
  const refs = {
    parabola: null as THREE.Mesh | null,
    socle2: null as THREE.Mesh | null,
    potentiometer: null as THREE.Mesh | null,
    potentiometerButton: null as THREE.Mesh | null,
    ledRed: null as THREE.Mesh | null,
    ledGreen: null as THREE.Mesh | null,
    socle1: null as THREE.Mesh | null,
    socle4: null as THREE.Mesh | null,
  };

  // Parcourir tous les enfants du modèle
  if (process.env.NODE_ENV === 'development') {
    console.log('🎨 Application des matériaux PBR...');
  }
  
  model.traverse((child) => {
    // Utiliser child.type au lieu de instanceof pour les objets chargés par GLTF
    if (child.type === 'Mesh') {
      const name = child.name;
      const mesh = child as THREE.Mesh;

      // ========================================
      // 1. PARABOLE - Métal satiné avec texture
      // ========================================
      if (name === 'Parabole_Drone_Detection-1') {
        refs.parabola = mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0xC7C7C7,
          map: STRIPE_TEXTURE,
          metalness: 0.45,
          roughness: 0.38,
          clearcoat: 0.3,
          clearcoatRoughness: 0.4,
        });
        console.log('✅ Parabole (métal satiné)');
      }

      // ========================================
      // 2. SOCLE2 - Métal satiné avec texture
      // ========================================
      else if (name === 'Socle2-1') {
        refs.socle2 = mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0xC7C7C7,
          map: STRIPE_TEXTURE,
          metalness: 0.45,
          roughness: 0.38,
          clearcoat: 0.3,
          clearcoatRoughness: 0.4,
        });
      }

      // ========================================
      // 3. SOCLE1 - Plastique gris foncé
      // ========================================
      else if (name === 'Socle1-1') {
        refs.socle1 = mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0x2A2A2A,
          roughness: 0.85,
          metalness: 0.1,
          clearcoat: 0.05,
          clearcoatRoughness: 0.95,
        });
      }

      // ========================================
      // 4. SOCLE4 - Plastique noir
      // ========================================
      else if (name === 'Socle4-1') {
        refs.socle4 = mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0x1A1A1A,
          roughness: 0.85,
      metalness: 0.1,
          clearcoat: 0.05,
          clearcoatRoughness: 0.95,
        });
      }

      // ========================================
      // 5. POTENTIOMÈTRE - Corps
      // ========================================
      else if (name === 'POTENTIOMETER-1') {
        refs.potentiometer = mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0x3A3A3A,
        roughness: 0.5,
          metalness: 0.3,
          clearcoat: 0.25,
          clearcoatRoughness: 0.5,
        });
      }

      // ========================================
      // 6. BOUTON POTENTIOMÈTRE - Bouton tournant
      // ========================================
      else if (name === 'bouton_potentiomètre-1' || 
               (name.toLowerCase().includes('bouton') && name.toLowerCase().includes('potentiom'))) {
        refs.potentiometerButton = mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0x3A3A3A,
          roughness: 0.5,
          metalness: 0.3,
          clearcoat: 0.25,
          clearcoatRoughness: 0.5,
        });
      }

      // ========================================
      // 7. LED ROUGE - LED-1
      // ========================================
      else if (name === 'LED-1') {
        refs.ledRed = mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0xAA0000,
          emissive: 0x550000,
          emissiveIntensity: 0.2,
          roughness: 0.15,
          metalness: 0,
          transparent: true,
          opacity: 0.85,
          transmission: 0.3,
          thickness: 0.8,
          clearcoat: 0.6,
          clearcoatRoughness: 0.05,
          toneMapped: false,
        });
      }

      // ========================================
      // 8. LED VERTE - LED-2
      // ========================================
      else if (name === 'LED-2') {
        refs.ledGreen = mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0x00AA00,
          emissive: 0x003300,
          emissiveIntensity: 0.2,
          roughness: 0.15,
          metalness: 0,
          transparent: true,
          opacity: 0.85,
          transmission: 0.3,
          thickness: 0.8,
          clearcoat: 0.6,
          clearcoatRoughness: 0.05,
          toneMapped: false,
        });
      }

      // Activer les ombres sur tous les meshes
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Matériaux PBR appliqués');
  }

  return refs;
}

/**
 * 🎯 OPTIMISATIONS PRINCIPALES:
 * 
 * 1. React Three Fiber: Évite les re-renders React sur le canvas
 * 2. Canvas lazy-loaded via dynamic import dans la page parente
 * 3. pixelRatio limité à 1.5 pour réduire la charge GPU
 * 4. antialias désactivé pour meilleures performances
 * 5. Composants mémorisés avec React.memo
 * 6. useFrame pour la boucle d'animation (optimisé par R3F)
 * 7. Shadows limités et optimisés
 * 8. useGLTF avec preload pour chargement asynchrone
 * 9. Dispose automatique des ressources par R3F
 * 10. Pas de logs dans la boucle d'animation
 */

// ============================================
// INTERFACES
// ============================================

interface DroneProps {
  index: number;
  orbitRadius: number;
  heightOffset?: number; // Hauteur par rapport au centre
  onMount?: (mesh: THREE.Mesh) => void;
}

interface RadarModelProps {
  targetRotationRef: React.RefObject<number>;
  manualGreenLEDRef: React.RefObject<boolean>;
  manualRedLEDRef: React.RefObject<boolean>;
  dronesRef: React.RefObject<THREE.Mesh[]>;
}

interface ControlPanelProps {
  targetRotationRef: React.RefObject<number>;
  manualGreenLEDRef: React.RefObject<boolean>;
  manualRedLEDRef: React.RefObject<boolean>;
}

// ============================================
// STATS FPS (DEBUG MODE)
// ============================================

const Stats = memo(() => {
  const statsRef = useRef<any>(null);

  useEffect(() => {
    // Charger Stats.js uniquement côté client et en mode dev
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      import('stats.js').then((Stats) => {
        const stats = new Stats.default();
        stats.showPanel(0); // 0: fps, 1: ms, 2: mb
        stats.dom.style.position = 'absolute';
        stats.dom.style.top = '80px'; // Au-dessus des instructions
        stats.dom.style.left = '20px';
        stats.dom.style.zIndex = '100';
        document.body.appendChild(stats.dom);
        statsRef.current = stats;

        const animate = () => {
          stats.begin();
          stats.end();
          requestAnimationFrame(animate);
        };
        animate();

        return () => {
          document.body.removeChild(stats.dom);
        };
      });
    }
  }, []);

  return null;
});
Stats.displayName = 'Stats';

// ============================================
// COMPOSANT DRONE (MÉMORISÉ)
// ============================================

interface DroneComponentProps extends DroneProps {
  onMount?: (mesh: THREE.Mesh) => void;
}

const Drone = memo(({ index, orbitRadius, heightOffset = 3, onMount }: DroneComponentProps) => {
  const meshRef = useRef<Mesh>(null);
  const angleRef = useRef((index / 3) * Math.PI * 2);
  const speedRef = useRef(0.2 + Math.random() * 0.3);

  // Enregistrer le drone quand il est monté
  useEffect(() => {
    if (meshRef.current && onMount) {
      onMount(meshRef.current);
    }
  }, [onMount]);

  // Animation du drone avec useFrame (optimisé par R3F)
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    angleRef.current += speedRef.current * delta;
    
    meshRef.current.position.x = Math.cos(angleRef.current) * orbitRadius;
    meshRef.current.position.z = Math.sin(angleRef.current) * orbitRadius;
    meshRef.current.position.y = heightOffset + Math.sin(angleRef.current * 2) * 0.5; // Hauteur ajustée
    meshRef.current.rotation.y += delta;
  });

  return (
    <group ref={meshRef}>
      {/* Corps du drone */}
      <mesh castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color={0x666666} 
          roughness={0.5} 
          metalness={0.8} 
        />
      </mesh>
      
      {/* Antenne */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.15]} />
        <meshStandardMaterial color={0x333333} />
      </mesh>
    </group>
  );
});
Drone.displayName = 'Drone';

// ============================================
// COMPOSANT MODÈLE RADAR (MÉMORISÉ)
// ============================================

const RadarModel = memo(({ targetRotationRef, manualGreenLEDRef, manualRedLEDRef, dronesRef }: RadarModelProps) => {
  const groupRef = useRef<Group>(null);
  const currentRotationRef = useRef(0);
  
  // Refs pour les éléments du radar
  const pivotGroupRef = useRef<THREE.Group>(new THREE.Group()); // Groupe pivot personnalisé pour rotation
  const parabolaRef = useRef<Mesh>(null);
  const potentiometerRef = useRef<Mesh>(null);
  const ledRedRef = useRef<Mesh>(null);
  const ledGreenRef = useRef<Mesh>(null);
  
  // Pour limiter les logs de détection
  const lastDetectionLog = useRef(0);
  const lastLEDState = useRef<'green' | 'red' | 'off' | null>(null);

  // Préchargement du modèle GLB avec useGLTF (optimisé)
  const { scene } = useGLTF('/assets/projects/Drone_Detection/Assemblage_Radar.glb');

  // Configuration du modèle (une seule fois)
  useEffect(() => {
    if (!scene) return;

    if (process.env.NODE_ENV === 'development') {
      scene.traverse((child: any) => {
        console.log("🟦", child.name, "|", child.type);
      });
    }

    if (!groupRef.current) return;

    if (process.env.NODE_ENV === 'development') {
      console.log('🎨 Application des matériaux PBR...');
    }
    
    // Appliquer les matériaux PBR réalistes avec les VRAIS NOMS
    const materialRefs = applyRadarMaterials(scene);
    
    // Assigner les refs
    parabolaRef.current = materialRefs.parabola;
    potentiometerRef.current = materialRefs.potentiometerButton;
    ledRedRef.current = materialRefs.ledRed;
    ledGreenRef.current = materialRefs.ledGreen;

            // Créer un NOUVEAU groupe radarGroup (ne pas réutiliser Assemblage_Radar)
            const radarGroup = new THREE.Group();
            radarGroup.name = 'RadarGroup';
            radarGroup.position.set(0, 0, 0);
            
            const baseGroup = new THREE.Group();
            baseGroup.name = 'BaseGroup'; // Socle4 + Socle1 (fixes)
            
            const rotationGroup = new THREE.Group();
            rotationGroup.name = 'RotationGroup'; // Socle2 + Parabole (tournent)
            
            // Collections d'objets
            const meshes: { [key: string]: THREE.Object3D } = {};
            
            // Récupérer tous les meshes ET objets importants par nom
            scene.traverse((child) => {
              if (child.type === 'Mesh' || child.name === 'potentiometer') {
                meshes[child.name] = child;
              }
              // Capturer aussi les éléments avec encodage problématique
              if (child.name.toLowerCase().includes('potentiom')) {
                meshes[child.name] = child;
              }
            });

            // 3. Assembler la hiérarchie de base
            radarGroup.add(baseGroup);
            radarGroup.add(rotationGroup);
            scene.add(radarGroup);

            // ÉTAPE 1 : Attacher les objets à leurs groupes (sans calculer le pivot encore)
            // Les pièces fixes à baseGroup
            if (meshes['Socle4-1']) {
              baseGroup.attach(meshes['Socle4-1']);
            }
            if (meshes['Socle1-1']) {
              baseGroup.attach(meshes['Socle1-1']);
            }
            if (meshes['LED-1']) {
              baseGroup.attach(meshes['LED-1']);
            }
            if (meshes['LED-2']) {
              baseGroup.attach(meshes['LED-2']);
            }
            // Potentiomètre : attacher le groupe parent si disponible, sinon les pièces individuelles
            if (meshes['potentiometer']) {
              baseGroup.attach(meshes['potentiometer']);
            } else {
              // Sinon attacher les pièces individuellement
              if (meshes['POTENTIOMETER-1']) {
                baseGroup.attach(meshes['POTENTIOMETER-1']);
              }
              
              // Rechercher le bouton avec encodage flexible
              const boutonKey = Object.keys(meshes).find(key => 
                key.toLowerCase().includes('bouton') && key.toLowerCase().includes('potentiom')
              );
              if (boutonKey && meshes[boutonKey]) {
                baseGroup.attach(meshes[boutonKey]);
              }
            }

            // Les pièces rotatives à rotationGroup (déjà positionné au pivot)
            if (meshes['Socle2-1']) {
              rotationGroup.attach(meshes['Socle2-1']);
            }
            if (meshes['Parabole_Drone_Detection-1']) {
              rotationGroup.attach(meshes['Parabole_Drone_Detection-1']);
            }
            
            // ÉTAPE 2 : Appliquer le scale 10x pour proportions réalistes
            radarGroup.scale.set(10, 10, 10);
            
            // Forcer la mise à jour complète des matrices
            radarGroup.updateMatrixWorld(true);
            
            // ÉTAPE 3 : Centrer le radar et le poser au sol
            const boxRadar = new THREE.Box3().setFromObject(radarGroup);
            const center = new THREE.Vector3();
            boxRadar.getCenter(center);
            
            // Centrer horizontalement (X et Z)
            radarGroup.position.x = -center.x;
            radarGroup.position.z = -center.z;
            
            // Poser au sol (Y)
            radarGroup.position.y = -boxRadar.min.y;
            
            // ÉTAPE 4 : MAINTENANT calculer et positionner le pivot de rotation
            radarGroup.updateMatrixWorld(true);
            
            if (meshes['Socle2-1']) {
              // Sauvegarder les positions world actuelles
              const socle2WorldPos = new THREE.Vector3();
              const parabolaWorldPos = new THREE.Vector3();
              meshes['Socle2-1'].getWorldPosition(socle2WorldPos);
              if (meshes['Parabole_Drone_Detection-1']) {
                meshes['Parabole_Drone_Detection-1'].getWorldPosition(parabolaWorldPos);
              }
              
              // Calculer le centre de Socle2-1 en world
              const socle2Box = new THREE.Box3().setFromObject(meshes['Socle2-1']);
              const pivotWorld = new THREE.Vector3();
              socle2Box.getCenter(pivotWorld);
              
              console.log('📍 Pivot world:', { x: pivotWorld.x.toFixed(3), y: pivotWorld.y.toFixed(3), z: pivotWorld.z.toFixed(3) });
              
              // Convertir en local du radarGroup
              const pivotLocal = radarGroup.worldToLocal(pivotWorld.clone());
              
              // Déplacer le rotationGroup au pivot
              rotationGroup.position.copy(pivotLocal);
              
              console.log('📍 Pivot local:', { x: pivotLocal.x.toFixed(3), y: pivotLocal.y.toFixed(3), z: pivotLocal.z.toFixed(3) });
              
              // Ajuster les positions locales des enfants pour qu'ils restent visuellement au même endroit
              // (compenser le déplacement du parent)
              rotationGroup.worldToLocal(socle2WorldPos);
              meshes['Socle2-1'].position.copy(socle2WorldPos);
              
              if (meshes['Parabole_Drone_Detection-1']) {
                rotationGroup.worldToLocal(parabolaWorldPos);
                meshes['Parabole_Drone_Detection-1'].position.copy(parabolaWorldPos);
              }
              
              console.log('✅ Rotation centrée sur le centre de Socle2-1');
            }

    // Assigner le groupe de rotation au ref
    pivotGroupRef.current = rotationGroup;
    
    console.log('\n📊 === VÉRIFICATION FINALE ===');
    console.log('Radar:', {
      scale: radarGroup.scale,
      position: {
        x: radarGroup.position.x.toFixed(3),
        y: radarGroup.position.y.toFixed(3),
        z: radarGroup.position.z.toFixed(3)
      }
    });
    console.log('Pivot actif:', {
      x: rotationGroup.position.x.toFixed(3),
      y: rotationGroup.position.y.toFixed(3),
      z: rotationGroup.position.z.toFixed(3)
    });
    console.log('Hiérarchie:', {
      radarGroup: radarGroup.children.length + ' enfants',
      baseGroup: baseGroup.children.length + ' enfants',
      rotationGroup: rotationGroup.children.length + ' enfants'
    });
    
    console.log('\n🏗️ Hiérarchie créée:');
    console.log('  RadarGroup');
    console.log('    ├─ BaseGroup (fixe)');
    console.log('    │   ├─ Socle4-1 (au sol)');
    console.log('    │   ├─ Socle1-1');
    console.log('    │   ├─ LEDs');
    console.log('    │   └─ Potentiomètres');
    console.log('    └─ RotationGroup (pivot au centre de Socle2)');
    console.log('        ├─ Socle2-1');
    console.log('        └─ Parabole_Drone_Detection-1');
    console.log('');

  }, [scene]);

  // Animation avec détection de drones
  useFrame((state, delta) => {
    // Rotation lisse du rotationGroup (Socle2 + Parabole)
    const targetRotation = targetRotationRef.current;
    const oldRotation = currentRotationRef.current;
    currentRotationRef.current += (targetRotation - currentRotationRef.current) * 0.1;

    // Faire tourner le groupe pivot autour de l'axe Y
    if (pivotGroupRef.current) {
      pivotGroupRef.current.rotation.y = currentRotationRef.current;
      
      // Rotation lisse sans logs excessifs
      if (Math.abs(currentRotationRef.current - oldRotation) > 0.001 && process.env.NODE_ENV === 'development') {
        // Log uniquement en mode dev et avec throttle
        const now = Date.now();
        if (now - lastDetectionLog.current > 5000) {
          console.log('🔄 Rotation:', currentRotationRef.current.toFixed(2), 'rad');
          lastDetectionLog.current = now;
        }
      }
    }
    
    // Animation du potentiomètre sur lui-même (optionnel)
    if (potentiometerRef.current) {
      potentiometerRef.current.rotation.z = currentRotationRef.current * 0.5;
    }

    // Détection automatique des drones
      let autoDetecting = false;
    if (parabolaRef.current && dronesRef.current && dronesRef.current.length > 0) {
      // Obtenir la direction WORLD de la parabole
      const parabolaDirection = new THREE.Vector3();
      parabolaRef.current.getWorldDirection(parabolaDirection);
        parabolaDirection.normalize();

      // Obtenir la position WORLD de la parabole
      const parabolaWorldPos = new THREE.Vector3();
      parabolaRef.current.getWorldPosition(parabolaWorldPos);

      dronesRef.current.forEach((drone) => {
        // Calculer la direction vers le drone
          const toDrone = new THREE.Vector3()
          .subVectors(drone.position, parabolaWorldPos)
            .normalize();

          const angle = parabolaDirection.angleTo(toDrone);
          const angleDeg = THREE.MathUtils.radToDeg(angle);

        // Cône de détection de 30°
          if (angleDeg < 30) {
            autoDetecting = true;
          // Log seulement toutes les 2 secondes
          const now = Date.now();
          if (now - lastDetectionLog.current > 2000) {
            console.log('🎯 Drone détecté ! Angle:', angleDeg.toFixed(1), '°');
            lastDetectionLog.current = now;
            }
          }
        });
      }

    // Mise à jour des LEDs avec matériaux PBR
    if (ledRedRef.current && ledGreenRef.current) {
      const ledGreenMat = ledGreenRef.current.material as THREE.MeshPhysicalMaterial;
      const ledRedMat = ledRedRef.current.material as THREE.MeshPhysicalMaterial;

      let newState: 'green' | 'red' | 'off' = 'off';

        if (manualGreenLEDRef.current) {
        // Mode manuel : LED verte allumée
        ledGreenMat.emissiveIntensity = 2.5;
        ledRedMat.emissiveIntensity = 0.1;
        newState = 'green';
        if (lastLEDState.current !== 'green') {
          console.log('💚 Mode manuel : LED verte ON');
          lastLEDState.current = 'green';
        }
        } else if (manualRedLEDRef.current) {
        // Mode manuel : LED rouge allumée
        ledGreenMat.emissiveIntensity = 0.1;
        ledRedMat.emissiveIntensity = 2.5;
        newState = 'red';
        if (lastLEDState.current !== 'red') {
          console.log('❤️ Mode manuel : LED rouge ON');
          lastLEDState.current = 'red';
        }
        } else {
        // Mode automatique : selon détection des drones
          if (autoDetecting) {
          // Drone détecté → LED verte
          ledGreenMat.emissiveIntensity = 2.5;
          ledRedMat.emissiveIntensity = 0.1;
          newState = 'green';
          if (lastLEDState.current !== 'green') {
            console.log('💚 Détection auto : LED verte ON');
            lastLEDState.current = 'green';
          }
          } else {
          // Pas de drone → LED rouge
          ledGreenMat.emissiveIntensity = 0.1;
          ledRedMat.emissiveIntensity = 1.8;
          newState = 'red';
          if (lastLEDState.current !== 'red') {
            console.log('❤️ Pas de détection : LED rouge ON');
            lastLEDState.current = 'red';
          }
        }
      }
    } else {
      // Log si les LEDs ne sont pas trouvées (une seule fois)
      if (!ledRedRef.current && lastLEDState.current !== 'off') {
        console.warn('⚠️ LED rouge non trouvée !');
      }
      if (!ledGreenRef.current && lastLEDState.current !== 'off') {
        console.warn('⚠️ LED verte non trouvée !');
      }
      lastLEDState.current = 'off';
    }
  });

  return (
    <group ref={groupRef}>
      {/* Le radarGroup est déjà positionné et scalé correctement dans useEffect */}
      <primitive object={scene} />
    </group>
  );
});
RadarModel.displayName = 'RadarModel';

// Préchargement du modèle (important pour les performances)
useGLTF.preload('/assets/projects/Drone_Detection/Assemblage_Radar.glb');

// ============================================
// SCÈNE 3D (MÉMORISÉE)
// ============================================

// ============================================
// COMPOSANT ENVIRONNEMENT HDRI (CIEL)
// ============================================
const HDRIEnvironment = memo(() => {
  const { scene } = useThree();
  const [skyDome, setSkyDome] = useState<THREE.Mesh | null>(null);

  useEffect(() => {
    // Créer un ciel procédural comme fallback immédiat
    const createFallbackSky = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;
      
      // Créer un gradient de ciel (haut = bleu clair, bas = bleu horizon)
      const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
      gradient.addColorStop(0, '#4A90E2');    // Bleu ciel haut
      gradient.addColorStop(0.5, '#87CEEB');  // Bleu ciel moyen
      gradient.addColorStop(1, '#B0D4E8');    // Bleu horizon
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 2048, 1024);
      
      // Ajouter quelques nuages subtils
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * 2048;
        const y = Math.random() * 500 + 300;
        const width = Math.random() * 200 + 100;
        const height = Math.random() * 40 + 20;
        ctx.beginPath();
        ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.mapping = THREE.EquirectangularReflectionMapping;
      return texture;
    };

    // Appliquer immédiatement le ciel fallback (SkyDome très grand)
    const fallbackTexture = createFallbackSky();
    const sphereGeometry = new THREE.SphereGeometry(1000, 60, 40); // Plus grand pour couvrir tout
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: fallbackTexture,
      side: THREE.BackSide,
      depthWrite: false, // Ne pas écrire dans le depth buffer
    });
    const fallbackSkyDome = new THREE.Mesh(sphereGeometry, sphereMaterial);
    fallbackSkyDome.renderOrder = -1; // Rendu en arrière-plan
    scene.add(fallbackSkyDome);
    setSkyDome(fallbackSkyDome);
    scene.environment = fallbackTexture;
    console.log('🌤️ Ciel procédural appliqué (SkyDome 1000 unités)');

    // Tenter de charger l'image de ciel en arrière-plan
    const loader = new THREE.TextureLoader();
    const skyPath = '/assets/projects/Drone_Detection/DaySkyHDRI046B_8K-TONEMAPPED.jpg';
    console.log('🔄 Début du chargement du ciel:', skyPath);
    console.log('🔄 URL complète:', window.location.origin + skyPath);
    
    // Tester d'abord si le fichier est accessible
    fetch(skyPath, { method: 'HEAD' })
      .then(response => {
        console.log('📡 Réponse du serveur:', response.status, response.statusText);
        console.log('📦 Type de contenu:', response.headers.get('content-type'));
        console.log('📏 Taille du fichier:', response.headers.get('content-length'), 'octets');
        
        if (response.ok) {
          console.log('✅ Fichier accessible, démarrage du chargement...');
        } else {
          console.error('❌ Fichier non accessible:', response.status);
        }
      })
      .catch(err => console.error('❌ Erreur de vérification:', err));
    
    loader.load(
      skyPath,
      (texture) => {
        // Succès : remplacer le fallback par l'image
        console.log('🎉 TEXTURE CHARGÉE AVEC SUCCÈS !');
        console.log('📦 Dimensions:', texture.image?.width, 'x', texture.image?.height);
        console.log('📦 Format:', texture.format);
        console.log('📦 Type:', texture.type);
        
        // Configuration de la texture pour le ciel
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;
        
        console.log('🔧 Texture configurée, mise à jour du SkyDome...');
        
        // Mettre à jour le matériau existant
        if (fallbackSkyDome.material instanceof THREE.MeshBasicMaterial) {
          fallbackSkyDome.material.map = texture;
          fallbackSkyDome.material.needsUpdate = true;
          console.log('✅ Matériau du SkyDome mis à jour');
        }
        
        // Mettre à jour l'environnement
        scene.environment = texture;
        scene.background = texture;
        fallbackTexture.dispose();
        
        console.log('✨ CIEL JPG 8K APPLIQUÉ AVEC SUCCÈS !');
      },
      (progress) => {
        if (progress.lengthComputable) {
          const percent = (progress.loaded / progress.total) * 100;
          const loaded = (progress.loaded / 1024 / 1024).toFixed(2);
          const total = (progress.total / 1024 / 1024).toFixed(2);
          console.log(`⏳ Chargement: ${percent.toFixed(0)}% (${loaded}/${total} MB)`);
        } else {
          console.log('⏳ Chargement en cours... (taille inconnue)');
        }
      },
      (error) => {
        console.error('❌ ERREUR DE CHARGEMENT !');
        console.error('❌ Type d\'erreur:', error);
        console.error('❌ Message:', error?.message || 'Pas de message');
        console.error('❌ Stack:', error?.stack || 'Pas de stack');
        console.warn('⚠️ Le ciel procédural reste actif');
      }
    );

    // Cleanup
    return () => {
      if (skyDome) {
        scene.remove(skyDome);
        skyDome.geometry.dispose();
        if (skyDome.material instanceof THREE.Material) {
          skyDome.material.dispose();
        }
      }
    };
  }, [scene]);

  return null;
});
HDRIEnvironment.displayName = 'HDRIEnvironment';

// ============================================
// COMPOSANT HORIZON (pour masquer la transition ciel/sol)
// ============================================
const HorizonPlane = memo(() => {
  return (
    <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
      <cylinderGeometry args={[500, 500, 100, 32, 1, true]} />
      <meshBasicMaterial 
        side={THREE.BackSide}
        color={0xB0D4E8}
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </mesh>
  );
});
HorizonPlane.displayName = 'HorizonPlane';

// ============================================
// COMPOSANT SOL AVEC TEXTURE
// ============================================
const Ground = memo(() => {
  // Créer une texture béton procédurale comme fallback
  const fallbackTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    // Fond béton gris moyen
    ctx.fillStyle = '#9E9E9E';
    ctx.fillRect(0, 0, 1024, 1024);
    
    // Variations de couleur (granularité)
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const size = Math.random() * 3 + 1;
      const gray = Math.floor(Math.random() * 40) + 130;
      ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
      ctx.fillRect(x, y, size, size);
    }
    
    // Taches sombres
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const size = Math.random() * 30 + 10;
      const gray = Math.floor(Math.random() * 30) + 100;
      ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, 0.3)`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Fissures
    ctx.strokeStyle = 'rgba(80, 80, 80, 0.4)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 15; i++) {
      ctx.beginPath();
      let x = Math.random() * 1024;
      let y = Math.random() * 1024;
      ctx.moveTo(x, y);
      for (let j = 0; j < 5; j++) {
        x += (Math.random() - 0.5) * 100;
        y += (Math.random() - 0.5) * 100;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(80, 80);
    return texture;
  }, []);

  // Tenter de charger la texture personnalisée, sinon utiliser le fallback
  const [concreteTexture, setConcreteTexture] = useState<THREE.Texture>(fallbackTexture);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/assets/projects/Drone_Detection/clean-concrete_albedo.png',
      (texture) => {
        // Succès : utiliser la texture PNG personnalisée
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(80, 80);
        setConcreteTexture(texture);
        console.log('✅ Texture béton clean-concrete_albedo.png chargée avec succès');
      },
      undefined,
      (error) => {
        console.log('⚠️ Texture PNG non trouvée, utilisation de la texture procédurale');
      }
    );
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial 
        map={concreteTexture}
        roughness={0.85} 
        metalness={0.0}
      />
    </mesh>
  );
});
Ground.displayName = 'Ground';

const Scene = memo(({ 
  targetRotationRef, 
  manualGreenLEDRef, 
  manualRedLEDRef 
}: Omit<RadarModelProps, 'dronesRef'>) => {
  const dronesRef = useRef<THREE.Mesh[]>([]);

  // Fonction pour enregistrer chaque drone
  const registerDrone = (mesh: THREE.Mesh) => {
    if (!dronesRef.current.includes(mesh)) {
      dronesRef.current.push(mesh);
    }
  };

  // Log des paramètres de caméra au montage
  useEffect(() => {
    console.log('🎯 === PARAMÈTRES DE CAMÉRA (Scale 10x - FINAL) ===');
    console.log('Camera position:', { x: 0, y: 2, z: 5 });
    console.log('Orbit target:', { x: 0, y: 1.5, z: 0 });
    console.log('MinDistance:', '1.5 | MaxDistance: 15');
  }, []);

  return (
    <>
      {/* Environnement HDRI (ciel) */}
      <HDRIEnvironment />

      {/* Lumières optimisées pour matériaux PBR */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Lumière d'appoint pour le relief */}
      <directionalLight
        position={[-3, 4, -3]}
        intensity={0.5}
        color="#ffffff"
      />

      {/* Plan d'horizon pour masquer la bande noire */}
      <HorizonPlane />

      {/* Sol en béton texturé - Sol agrandi à 200x200 */}
      <Ground />

      {/* Grille adaptée au sol agrandi */}
      <gridHelper args={[200, 100, 0x666666, 0x444444]} position={[0, 0.01, 0]} />

      {/* Modèle du radar */}
      <Suspense fallback={null}>
        <RadarModel 
          targetRotationRef={targetRotationRef}
          manualGreenLEDRef={manualGreenLEDRef}
          manualRedLEDRef={manualRedLEDRef}
          dronesRef={dronesRef}
        />
      </Suspense>

      {/* Drones - Positionnés au-dessus de la parabole (ajusté pour scale 10) */}
      {[0, 1, 2].map((i) => (
        <Drone key={i} index={i} orbitRadius={5} heightOffset={4} onMount={registerDrone} />
      ))}

      {/* Contrôles de caméra optimisés - cible le centre du radar */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={1.5}  // Permet de se rapprocher
        maxDistance={15}   // Permet de voir les drones en dézoomant
        maxPolarAngle={Math.PI / 2} // Empêche de passer sous le sol
        target={[0, 1.5, 0]} // Cible le centre du radar (ajusté pour scale 10)
        enableZoom
        zoomSpeed={1.2}
        enableRotate
        rotateSpeed={0.5}
        enablePan={false}
      />
    </>
  );
});
Scene.displayName = 'Scene';

// ============================================
// PANNEAU DE CONTRÔLE (MÉMORISÉ)
// ============================================

const ControlPanel = memo(({ targetRotationRef, manualGreenLEDRef, manualRedLEDRef }: ControlPanelProps) => {
  return (
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '15px 25px',
          borderRadius: '50px',
          backdropFilter: 'blur(10px)',
          zIndex: 10,
          pointerEvents: 'auto', // Permet les interactions avec les boutons
        }}
      >
      {/* Bouton rotation gauche */}
        <button
          onClick={() => {
            targetRotationRef.current -= 0.5;
          }}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '2px solid #666',
            backgroundColor: '#1a1a1a',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#333';
            e.currentTarget.style.borderColor = '#999';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1a1a1a';
            e.currentTarget.style.borderColor = '#666';
          }}
        >
          ←
        </button>

      {/* Indicateurs LED */}
        <div style={{ display: 'flex', gap: '10px', margin: '0 10px' }}>
          <button
            onClick={() => {
              manualGreenLEDRef.current = !manualGreenLEDRef.current;
            }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid #00ff00',
              backgroundColor: '#003300',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
            }}
            title="Toggle Green LED"
          />
          <button
            onClick={() => {
              manualRedLEDRef.current = !manualRedLEDRef.current;
            }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid #ff0000',
              backgroundColor: '#330000',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)',
            }}
            title="Toggle Red LED"
          />
        </div>

      {/* Bouton rotation droite */}
        <button
          onClick={() => {
            targetRotationRef.current += 0.5;
          }}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '2px solid #666',
            backgroundColor: '#1a1a1a',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#333';
            e.currentTarget.style.borderColor = '#999';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1a1a1a';
            e.currentTarget.style.borderColor = '#666';
          }}
        >
          →
        </button>
      </div>
  );
});
ControlPanel.displayName = 'ControlPanel';

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

export default function RadarScene() {
  const targetRotationRef = useRef(0);
  const manualGreenLEDRef = useRef(false);
  const manualRedLEDRef = useRef(false);

  return (
    <div className="radar-scene-container">
      {/* Stats FPS (mode dev uniquement) */}
      <Stats />

      {/* Canvas Three.js optimisé */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          pointerEvents: 'none', // Permet aux boutons en-dessous de recevoir les clics
        }}
      >
        <Canvas
          style={{
            touchAction: 'pan-y pinch-zoom',
            cursor: 'grab',
            pointerEvents: 'auto', // Le canvas lui-même capture les événements
          }}
          camera={{
            position: [0, 2, 5], // Vue optimisée pour le radar 10x
            fov: 50,
            near: 0.1,
            far: 100,
          }}
          shadows
          gl={{
            // Optimisations GPU critiques
            antialias: false, // Désactivé pour meilleures perfs
            powerPreference: 'high-performance',
            alpha: false,
            stencil: false,
            depth: true,
          }}
          dpr={[1, 1.5]} // Limite le pixelRatio pour réduire la charge GPU
          frameloop="always" // Animation continue optimisée par R3F
          onCreated={({ gl }) => {
            // Configuration supplémentaire du renderer
            gl.setClearColor(0x87CEEB); // Couleur de ciel en attendant le HDRI
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.2; // Équilibré pour matériaux PBR
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          {/* Background géré par le HDRI SkyDome */}
          <fog attach="fog" args={[0xB0D4E8, 30, 120]} />
          
          <Scene 
            targetRotationRef={targetRotationRef}
            manualGreenLEDRef={manualGreenLEDRef}
            manualRedLEDRef={manualRedLEDRef}
          />
        </Canvas>
      </div>

      {/* Panneau de contrôle */}
      <ControlPanel 
        targetRotationRef={targetRotationRef}
        manualGreenLEDRef={manualGreenLEDRef}
        manualRedLEDRef={manualRedLEDRef}
      />

      {/* Instructions */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'white',
          fontSize: '0.85rem',
          fontFamily: 'sans-serif',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '10px',
          borderRadius: '8px',
          maxWidth: '250px',
          zIndex: 10,
          pointerEvents: 'auto', // Permet la sélection de texte
        }}
      >
        🖱️ <strong>Drag</strong> pour tourner la caméra<br />
        🔍 <strong>Molette</strong> pour zoomer
      </div>

      {/* Styles CSS */}
      <style jsx>{`
        .radar-scene-container {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%; /* 16:9 ratio for desktop */
        }

        @media (max-width: 768px) {
          .radar-scene-container {
            width: 100%;
            max-width: 500px;
            height: 0;
            padding-bottom: 100%; /* Square ratio for mobile */
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
