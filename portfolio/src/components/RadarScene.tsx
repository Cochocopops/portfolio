'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function RadarScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Refs pour contrôler la rotation et les LEDs
  const targetRotationRef = useRef(0);
  const manualGreenLEDRef = useRef(false);
  const manualRedLEDRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    scene.fog = new THREE.Fog(0x1a1a1a, 10, 50);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(3, 2.5, 3);
    camera.lookAt(0, 0.5, 0); // Regarde le centre du radar

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    // Controls - Active le zoom et la rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2; // Distance minimum de zoom
    controls.maxDistance = 15; // Distance maximum de zoom
    controls.maxPolarAngle = Math.PI / 2;
    controls.target.set(0, 0.5, 0); // Cible le centre du radar
    controls.enableZoom = true; // Active le zoom avec la molette
    controls.zoomSpeed = 1.2; // Vitesse de zoom
    controls.enableRotate = true; // Active la rotation avec drag
    controls.rotateSpeed = 0.5; // Vitesse de rotation
    controls.enablePan = false; // Désactive le pan (shift + drag)
    
    console.log('🎮 OrbitControls activés:', {
      enableZoom: controls.enableZoom,
      enableRotate: controls.enableRotate,
      zoomSpeed: controls.zoomSpeed,
      rotateSpeed: controls.rotateSpeed
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 8, 3);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Ground (concrete)
    const textureLoader = new THREE.TextureLoader();
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x666666, 0x333333);
    scene.add(gridHelper);

    // Refs for interactive parts
    let radarModel: THREE.Group | null = null;
    let parabola: THREE.Mesh | null = null;
    let potentiometer: THREE.Mesh | null = null;
    let ledRed: THREE.Mesh | null = null;
    let ledGreen: THREE.Mesh | null = null;
    let box: THREE.Mesh | null = null;

    // Drones
    const drones: THREE.Mesh[] = [];
    const droneCount = 3;
    const droneOrbitRadius = 4;

    for (let i = 0; i < droneCount; i++) {
      // Drone body
      const droneGeometry = new THREE.SphereGeometry(0.1, 16, 16);
      const droneMaterial = new THREE.MeshStandardMaterial({
        color: 0x666666,
        roughness: 0.5,
        metalness: 0.8,
      });
      const drone = new THREE.Mesh(droneGeometry, droneMaterial);
      drone.castShadow = true;
      
      // Antennes
      const antennaGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.15);
      const antennaMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
      const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
      antenna.position.y = 0.1;
      drone.add(antenna);

      // Position initiale
      const angle = (i / droneCount) * Math.PI * 2;
      drone.position.set(
        Math.cos(angle) * droneOrbitRadius,
        1.5 + Math.sin(angle * 2) * 0.3,
        Math.sin(angle) * droneOrbitRadius
      );

      drone.userData = { angle, speed: 0.2 + Math.random() * 0.3 };
      scene.add(drone);
      drones.push(drone);
    }

    // Interaction state
    let currentRotation = 0;

    // Prevent page scroll when using mouse wheel on the canvas (for zoom)
    const preventScroll = (e: WheelEvent) => {
      e.preventDefault(); // Toujours empêcher le scroll de la page sur le canvas
    };
    renderer.domElement.addEventListener('wheel', preventScroll, { passive: false });

    // Changement de curseur pendant le drag
    const onPointerDown = () => {
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grabbing';
      }
    };
    const onPointerUp = () => {
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
      }
    };
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load(
      '/assets/projects/Drone_Detection/Assemblage_Radar.glb',
      (gltf) => {
        radarModel = gltf.scene;
        radarModel.position.set(0, 0, 0); // Centré à l'origine
        radarModel.scale.set(2.5, 2.5, 2.5); // Taille optimale pour cadrage

        // Traverse and apply materials
        radarModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const name = child.name.toLowerCase();
            
            // 🔍 DEBUG : Afficher TOUS les noms pour trouver les LEDs
            console.log('📦 Objet:', child.name, '→', name);

            // Boîtier (box)
            if (name.includes('boitier') || name.includes('box') || name.includes('case')) {
              box = child;
              child.material = new THREE.MeshPhysicalMaterial({
                color: 0x1a1a1a,
                roughness: 0.8,
                metalness: 0.2,
                clearcoat: 0.1,
              });
            }

            // Parabole (dish)
            if (name.includes('parabole') || name.includes('dish') || name.includes('antenna')) {
              parabola = child;
              child.material = new THREE.MeshPhysicalMaterial({
                color: 0xf5f5f5,
                roughness: 0.4,
                metalness: 0.05,
                clearcoat: 0.2,
              });
            }

            // Potentiomètre
            if (name.includes('potentiometre') || name.includes('knob') || name.includes('dial')) {
              potentiometer = child;
              child.material = new THREE.MeshPhysicalMaterial({
                color: 0x0a0a0a,
                roughness: 0.3,
                metalness: 0.7,
                emissive: 0xff6600,
                emissiveIntensity: 0.3,
              });
            }

            // LED Rouge - recherche élargie (intérieur + contour)
            if (name.includes('led') || name.includes('red') || name.includes('rouge') || 
                name.includes('circle') || name.includes('sphere') || name.includes('cylinder') || 
                name.includes('disc') || name.includes('disk')) {
              console.log('🔴 Candidat LED Rouge:', child.name);
              
              // Chercher spécifiquement l'intérieur du cercle (pas juste le contour)
              if ((name.includes('led') && name.includes('red')) || 
                  (name.includes('led') && name.includes('rouge')) ||
                  name.includes('ledrouge') ||
                  name.includes('led_red') ||
                  name.includes('cylinder') ||
                  name.includes('disc') ||
                  (name.includes('circle') && !name.includes('torus') && !ledRed)) {
                
                // Créer un matériau qui remplit TOUT le cercle
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xff0000,
                  emissive: 0xff0000,
                  emissiveIntensity: 3,
                  toneMapped: false,
                  side: THREE.DoubleSide, // Visible des deux côtés
                });
                
                if (!ledRed) {
                  ledRed = child;
                  console.log('✅ LED Rouge assignée:', child.name);
                }
              }
            }

            // LED Verte - recherche élargie (intérieur + contour)
            if (name.includes('led') || name.includes('green') || name.includes('vert') || 
                name.includes('circle') || name.includes('sphere') || name.includes('cylinder') || 
                name.includes('disc') || name.includes('disk')) {
              console.log('🟢 Candidat LED Verte:', child.name);
              
              // Chercher spécifiquement l'intérieur du cercle (pas juste le contour)
              if ((name.includes('led') && name.includes('green')) || 
                  (name.includes('led') && name.includes('vert')) ||
                  name.includes('ledvert') ||
                  name.includes('led_green') ||
                  name.includes('cylinder') ||
                  name.includes('disc') ||
                  (name.includes('circle') && !name.includes('torus') && ledRed && !ledGreen)) {
                
                // Créer un matériau qui remplit TOUT le cercle
                child.material = new THREE.MeshStandardMaterial({
                  color: 0x00ff00,
                  emissive: 0x00ff00,
                  emissiveIntensity: 0,
                  toneMapped: false,
                  side: THREE.DoubleSide, // Visible des deux côtés
                });
                
                if (!ledGreen) {
                  ledGreen = child;
                  console.log('✅ LED Verte assignée:', child.name);
                }
              }
            }
          }
        });

        // Log si LEDs non trouvées (pas de fallback)
        if (!ledRed) {
          console.warn('LED Rouge non trouvée dans le modèle GLB');
        }
        if (!ledGreen) {
          console.warn('LED Verte non trouvée dans le modèle GLB');
        }

        // Patch pour boucher le trou sur le boîtier
        if (box) {
          const patchGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
          const patchMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x1a1a1a,
            roughness: 0.8,
            metalness: 0.2,
          });
          const patch = new THREE.Mesh(patchGeometry, patchMaterial);
          patch.position.copy(box.position);
          patch.position.y += 0.2; // Ajuster selon le trou
          radarModel?.add(patch);
        }

        scene.add(radarModel);
        setLoading(false);
      },
      (progress) => {
        const percent = (progress.loaded / progress.total) * 100;
        console.log(`Loading: ${percent.toFixed(0)}%`);
      },
      (error) => {
        console.error('Error loading model:', error);
        setError('Failed to load 3D model');
        setLoading(false);
      }
    );

    // Animation loop
    const clock = new THREE.Clock();
    let ledBlinkTime = 0;

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      ledBlinkTime += delta;

      // Update controls
      controls.update();

      // Animate drones
      drones.forEach((drone) => {
        drone.userData.angle += drone.userData.speed * delta;
        drone.position.x = Math.cos(drone.userData.angle) * droneOrbitRadius;
        drone.position.z = Math.sin(drone.userData.angle) * droneOrbitRadius;
        drone.position.y = 1.5 + Math.sin(drone.userData.angle * 2) * 0.3;
        drone.rotation.y += delta;
      });

      // Smooth rotation for potentiometer and parabola
      currentRotation += (targetRotationRef.current - currentRotation) * 0.1;

      if (potentiometer) {
        potentiometer.rotation.z = currentRotation;
      }

      if (parabola) {
        parabola.rotation.y = currentRotation * 2;
      }

      // Detect if parabola points to a drone (automatic detection)
      let autoDetecting = false;
      if (parabola) {
        const parabolaDirection = new THREE.Vector3(0, 0, -1);
        parabolaDirection.applyQuaternion(parabola.quaternion);
        parabolaDirection.normalize();

        drones.forEach((drone, index) => {
          const toDrone = new THREE.Vector3()
            .subVectors(drone.position, parabola!.position)
            .normalize();

          const angle = parabolaDirection.angleTo(toDrone);
          const angleDeg = THREE.MathUtils.radToDeg(angle);

          // Détection : cône de 30° (angle < 30°) - élargi pour mieux voir
          if (angleDeg < 30) {
            autoDetecting = true;
            // Log limité pour voir les détections
            if (Math.random() < 0.05) {
              console.log(`🎯 Drone ${index + 1} détecté ! Angle: ${angleDeg.toFixed(1)}°`);
            }
          }
        });
      }

      // Update LED states (automatic detection with manual override)
      if (ledRed && ledGreen) {
        if (manualGreenLEDRef.current) {
          // Manual green override
          (ledGreen.material as THREE.MeshStandardMaterial).emissiveIntensity = 5; // Très lumineux
          (ledRed.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
        } else if (manualRedLEDRef.current) {
          // Manual red override
          (ledGreen.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
          (ledRed.material as THREE.MeshStandardMaterial).emissiveIntensity = 5; // Très lumineux
        } else {
          // Automatic detection mode
          if (autoDetecting) {
            // Drone detected - Green LED on, Red LED off
            (ledGreen.material as THREE.MeshStandardMaterial).emissiveIntensity = 5; // Très lumineux
            (ledRed.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
          } else {
            // No drone - Red LED on, Green LED off
            (ledGreen.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
            (ledRed.material as THREE.MeshStandardMaterial).emissiveIntensity = 3; // Lumineux mais moins que la détection
          }
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('wheel', preventScroll);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div className="radar-scene-container">
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          touchAction: 'pan-y pinch-zoom', // Permet le zoom et la rotation
          cursor: 'grab',
          userSelect: 'none',
        }}
      />
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '1.2rem',
            fontFamily: 'sans-serif',
          }}
        >
          Loading 3D Model...
        </div>
      )}
      {error && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#ff3333',
            fontSize: '1.2rem',
            fontFamily: 'sans-serif',
          }}
        >
          {error}
        </div>
      )}
      {/* Controls panel */}
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
        }}
      >
        {/* Rotate left button */}
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

        {/* LED indicators */}
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

        {/* Rotate right button */}
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
        }}
      >
        🖱️ <strong>Drag</strong> pour tourner la caméra<br />
        🔍 <strong>Molette</strong> pour zoomer
      </div>

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

