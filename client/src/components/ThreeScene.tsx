import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const particlesMeshRef = useRef<THREE.Points | null>(null);
  
  useEffect(() => {
    const initThree = () => {
      if (!mountRef.current) return;
      
      // Create a new scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      // Set up the camera
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      cameraRef.current = camera;
      
      // Create a renderer with transparent background
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      
      // Create the wireframe sphere
      const geometry = new THREE.SphereGeometry(2, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: 0x8A2BE2, // Purple color
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
      sphereRef.current = sphere;
      
      // Create particles (tech stack icons)
      const particlesCount = 100;
      const particlesGeometry = new THREE.BufferGeometry();
      const posArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x00FFFF, // Cyan color
        transparent: true,
        opacity: 0.8
      });
      
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      particlesMeshRef.current = particlesMesh;
      
      // Animation function
      const animate = () => {
        if (sphereRef.current && particlesMeshRef.current) {
          sphereRef.current.rotation.x += 0.001;
          sphereRef.current.rotation.y += 0.002;
          
          particlesMeshRef.current.rotation.x -= 0.0005;
          particlesMeshRef.current.rotation.y -= 0.0005;
        }
        
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
        
        requestAnimationFrame(animate);
      };
      
      animate();
    };
    
    // Initialize Three.js
    initThree();
    
    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);
  
  // Update material colors if theme changes
  useEffect(() => {
    if (sphereRef.current && particlesMeshRef.current) {
      if (isDarkMode) {
        (sphereRef.current.material as THREE.MeshBasicMaterial).color.set(0x8A2BE2);
        (particlesMeshRef.current.material as THREE.PointsMaterial).color.set(0x00FFFF);
      } else {
        (sphereRef.current.material as THREE.MeshBasicMaterial).color.set(0x6A1CB2);
        (particlesMeshRef.current.material as THREE.PointsMaterial).color.set(0x0088AA);
      }
    }
  }, [isDarkMode]);
  
  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-screen z-0" />;
};

export default ThreeScene;
