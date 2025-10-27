/// <reference types="@react-three/fiber" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js elements
      group: any;
      mesh: any;
      primitive: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      spotLight: any;
      hemisphereLight: any;
      
      // Geometries
      sphereGeometry: any;
      boxGeometry: any;
      cylinderGeometry: any;
      planeGeometry: any;
      torusGeometry: any;
      coneGeometry: any;
      
      // Materials
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      meshPhysicalMaterial: any;
      meshLambertMaterial: any;
      meshPhongMaterial: any;
      
      // Helpers
      gridHelper: any;
      axesHelper: any;
      
      // Scene
      color: any;
      fog: any;
    }
  }
}

export {};

