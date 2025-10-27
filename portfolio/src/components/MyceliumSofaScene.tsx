// @ts-nocheck
'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture, Center } from '@react-three/drei';
import * as THREE from 'three';

function SofaModel() {
  const { scene } = useGLTF('/assets/projects/Mycelium/Canape.glb');
  const texture = useTexture('/assets/projects/Mycelium/arriere-plan-en-bois.jpg');

  // Apply texture to all meshes in the scene
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material.map = texture;
      child.material.needsUpdate = true;
    }
  });

  return (
    <Center>
      <group rotation={[0, -Math.PI / 4, 0]} scale={0.05}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

export default function MyceliumSofaScene() {
  return (
    <div style={{
      width: '100%',
      height: '400px',
      backgroundColor: 'white',
      position: 'relative',
      zIndex: 1
    }}>
      <Canvas
        camera={{ position: [8, 7, 8], fov: 50 }}
        style={{ background: 'white' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} />
        <spotLight position={[0, 10, 0]} intensity={0.5} />
        
        <Suspense fallback={<Loader />}>
          <SofaModel />
        </Suspense>
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={4}
          maxDistance={20}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
