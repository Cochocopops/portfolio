// @ts-nocheck
'use client';
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Center } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// MODÈLE CANAPÉ MYCELIUM
// ============================================
function SofaModel({ isActive, rotationRef }: { isActive: boolean; rotationRef: React.MutableRefObject<number> }) {
  const rotationGroupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/assets/projects/Mycelium/Canape.glb');
  const texture = useTexture('/assets/projects/Mycelium/arriere-plan-en-bois.jpg');

  // Cloner la scène pour éviter les conflits
  const clonedScene = scene.clone();

  // Appliquer la texture à tous les meshes
  useEffect(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.map = texture;
        child.material.needsUpdate = true;
        // Désactiver les ombres
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });
  }, [clonedScene, texture]);

  // Rotation continue partagée - appliquée au groupe externe qui est centré
  useFrame((state, delta) => {
    if (rotationGroupRef.current) {
      rotationGroupRef.current.rotation.y = rotationRef.current;
    }
  });

  // Structure identique à la page projet : Center > group rotation
  return (
    <group ref={rotationGroupRef}>
      <Center>
        <group scale={0.0375}> {/* Réduit de 1/4 : 0.05 * 0.75 = 0.0375 */}
          <primitive object={clonedScene} />
        </group>
      </Center>
    </group>
  );
}

// ============================================
// MODÈLE RADAR
// ============================================

// Création de la texture de stries pour la parabole (lazy initialization)
let STRIPE_TEXTURE: THREE.Texture | null = null;

const getStripeTexture = (): THREE.Texture => {
  if (!STRIPE_TEXTURE) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    ctx.fillStyle = '#B8B8B8';
    ctx.fillRect(0, 0, 512, 512);
    
    for (let i = 0; i < 512; i += 2) {
      ctx.fillStyle = i % 4 === 0 ? '#ACACAC' : '#C4C4C4';
      ctx.fillRect(0, i, 512, 1);
    }
    
    STRIPE_TEXTURE = new THREE.CanvasTexture(canvas);
    STRIPE_TEXTURE.wrapS = THREE.RepeatWrapping;
    STRIPE_TEXTURE.wrapT = THREE.RepeatWrapping;
    STRIPE_TEXTURE.repeat.set(4, 4);
    STRIPE_TEXTURE.needsUpdate = true;
  }
  return STRIPE_TEXTURE;
};

// Application des matériaux PBR pour le radar
function applyRadarMaterials(model: THREE.Object3D) {
  model.traverse((child) => {
    if (child.type === 'Mesh') {
      const name = child.name;
      const mesh = child as THREE.Mesh;

      // Désactiver les ombres
      mesh.castShadow = false;
      mesh.receiveShadow = false;

      // Parabole
      if (name === 'Parabole_Drone_Detection-1') {
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0xC7C7C7,
          map: getStripeTexture(),
          metalness: 0.45,
          roughness: 0.38,
          clearcoat: 0.3,
          clearcoatRoughness: 0.4,
        });
      }
      // Socle2
      else if (name === 'Socle2-1') {
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0xC7C7C7,
          map: getStripeTexture(),
          metalness: 0.45,
          roughness: 0.38,
          clearcoat: 0.3,
          clearcoatRoughness: 0.4,
        });
      }
      // Socle1
      else if (name === 'Socle1-1') {
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0x2A2A2A,
          roughness: 0.85,
          metalness: 0.1,
          clearcoat: 0.05,
          clearcoatRoughness: 0.95,
        });
      }
      // Socle4
      else if (name === 'Socle4-1') {
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0x1A1A1A,
          roughness: 0.85,
          metalness: 0.1,
          clearcoat: 0.05,
          clearcoatRoughness: 0.95,
        });
      }
      // Potentiomètre
      else if (name === 'POTENTIOMETER-1') {
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0x3A3A3A,
          roughness: 0.5,
          metalness: 0.3,
          clearcoat: 0.25,
          clearcoatRoughness: 0.5,
        });
      }
      // Bouton potentiomètre
      else if (name === 'bouton_potentiomètre-1' || 
               (name.toLowerCase().includes('bouton') && name.toLowerCase().includes('potentiom'))) {
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0x3A3A3A,
          roughness: 0.5,
          metalness: 0.3,
          clearcoat: 0.25,
          clearcoatRoughness: 0.5,
        });
      }
      // LED Rouge
      else if (name === 'LED-1') {
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
      // LED Verte
      else if (name === 'LED-2') {
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
    }
  });
}

function RadarModel({ isActive, rotationRef }: { isActive: boolean; rotationRef: React.MutableRefObject<number> }) {
  const mainGroupRef = useRef<THREE.Group>(null);
  const externalRotationRef = useRef<THREE.Group>(null); // Rotation externe du carrousel uniquement
  const { scene } = useGLTF('/assets/projects/Drone_Detection/Assemblage_Radar.glb');
  
  // Cloner la scène pour éviter les conflits
  const clonedScene = scene.clone();

  useEffect(() => {
    if (!mainGroupRef.current) return;

    // Appliquer les matériaux PBR
    applyRadarMaterials(clonedScene);

    // Pour le carrousel, on simplifie : tout le radar tourne comme un bloc
    // On ne crée pas de hiérarchie complexe car on ne veut pas de rotation interne
    const radarGroup = new THREE.Group();
    radarGroup.name = 'RadarGroup';
    
    // Tout est dans un seul groupe, sans séparer la base et la parabole
    clonedScene.traverse((child) => {
      if (child.type === 'Mesh') {
        // Tous les meshes restent attachés à leur parent d'origine
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });

    // Scale et positionnement pour être bien visible et centré
    radarGroup.add(clonedScene);
    radarGroup.scale.set(20, 20, 20); // Agrandi par 2
    
    // Centrer le radar
    const boxRadar = new THREE.Box3().setFromObject(radarGroup);
    const center = new THREE.Vector3();
    boxRadar.getCenter(center);
    
    radarGroup.position.x = -center.x;
    radarGroup.position.z = -center.z;
    radarGroup.position.y = -boxRadar.min.y - 1.8; // Baissé encore plus
    
    // Attacher le radarGroup au mainGroupRef
    if (mainGroupRef.current) {
      mainGroupRef.current.add(radarGroup);
    }
  }, [clonedScene]);

  // Rotation continue partagée - appliquée au groupe externe pour tourner tout le radar
  useFrame((state, delta) => {
    if (externalRotationRef.current) {
      externalRotationRef.current.rotation.y = rotationRef.current;
    }
  });

  // Structure avec rotation externe pour tourner autour du vrai centre
  return (
    <group ref={externalRotationRef}>
      <Center>
        <group ref={mainGroupRef} />
      </Center>
    </group>
  );
}

// Précharger les modèles
useGLTF.preload('/assets/projects/Mycelium/Canape.glb');
useGLTF.preload('/assets/projects/Drone_Detection/Assemblage_Radar.glb');

// ============================================
// SCÈNE 3D
// ============================================
function Scene({ currentModel, rotationRef }: { currentModel: number; rotationRef: React.MutableRefObject<number> }) {
  // Mise à jour continue de la rotation
  useFrame((state, delta) => {
    rotationRef.current += delta * 0.3;
  });

  return (
    <>
      {/* Éclairage renforcé pour mieux voir le socle */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.8} />
      <directionalLight position={[-10, -10, -5]} intensity={0.8} />
      <directionalLight position={[0, -5, 0]} intensity={0.6} /> {/* Lumière du bas pour le socle */}
      <spotLight position={[0, 10, 0]} intensity={0.8} />
      
      <Suspense fallback={null}>
        {currentModel === 0 && <SofaModel isActive={true} rotationRef={rotationRef} />}
        {currentModel === 1 && <RadarModel isActive={true} rotationRef={rotationRef} />}
      </Suspense>
    </>
  );
}

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
export default function HomeCarousel3D() {
  const [currentModel, setCurrentModel] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right to left, -1 for left to right
  const router = useRouter();
  const rotationRef = useRef<number>(0); // Rotation partagée continue
  const [isMobile, setIsMobile] = useState(false);

  // Détection de la taille d'écran pour la responsivité
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Changer automatiquement toutes les 10 secondes avec effet slide
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1); // Always right to left
      setCurrentModel((prev) => (prev === 0 ? 1 : 0));
    }, 10000); // 10 secondes

    return () => clearInterval(interval);
  }, []);

  // Redirection au clic
  const handleClick = () => {
    if (currentModel === 0) {
      router.push('/projects/mycelium-sofa');
    } else {
      router.push('/projects/drone-detection');
    }
  };

  // Paramètres de caméra exacts selon le modèle (identiques aux pages projets)
  // Ajustement du FOV sur mobile pour que tout soit visible
  const baseFov = isMobile ? 60 : 50;
  const cameraConfig = currentModel === 0
    ? { position: [8, 7, 8] as [number, number, number], fov: baseFov } // Canapé
    : { position: [0, 2, 5] as [number, number, number], fov: baseFov }; // Radar

  // Variants pour l'animation de slide horizontal
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0.3,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0.3,
    }),
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: '#141414',
    }}>
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={currentModel}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'tween', duration: 1.2, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Canvas 3D */}
          <Canvas
            camera={cameraConfig}
            style={{ 
              background: '#141414',
              width: '100%',
              height: '100%',
            }}
            gl={{
              antialias: true,
              alpha: false,
            }}
          >
            <Scene currentModel={currentModel} rotationRef={rotationRef} />
          </Canvas>

          {/* Voile noir transparent réduit - cliquable pour redirection */}
          <div 
            onClick={handleClick}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.35)',
              cursor: 'pointer',
              zIndex: 1,
            }} 
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
