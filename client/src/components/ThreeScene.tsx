import { useEffect, useRef, useState } from 'react';
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
  
  // Mouse position tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
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
          // Default rotation when not hovering
          if (!isHovering) {
            sphereRef.current.rotation.x += 0.001;
            sphereRef.current.rotation.y += 0.002;
            
            particlesMeshRef.current.rotation.x -= 0.0005;
            particlesMeshRef.current.rotation.y -= 0.0005;
          } else {
            // Interactive rotation based on mouse position
            // Map mousePosition from screen coordinates to rotation values
            const rotationSpeed = 0.05;
            const targetRotationX = (mousePosition.y * rotationSpeed);
            const targetRotationY = (mousePosition.x * rotationSpeed);
            
            // Smooth rotation with lerp (linear interpolation)
            sphereRef.current.rotation.x += (targetRotationX - sphereRef.current.rotation.x) * 0.05;
            sphereRef.current.rotation.y += (targetRotationY - sphereRef.current.rotation.y) * 0.05;
            
            // Make particles follow in opposite direction with delay
            particlesMeshRef.current.rotation.x += (targetRotationX * -0.3 - particlesMeshRef.current.rotation.x) * 0.01;
            particlesMeshRef.current.rotation.y += (targetRotationY * -0.3 - particlesMeshRef.current.rotation.y) * 0.01;
            
            // Scale effect on hover
            sphereRef.current.scale.set(1.05, 1.05, 1.05);
            particlesMeshRef.current.scale.set(1.02, 1.02, 1.02);
          }
          
          // Reset scale when not hovering
          if (!isHovering) {
            sphereRef.current.scale.set(1, 1, 1);
            particlesMeshRef.current.scale.set(1, 1, 1);
          }
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
  
  // Add mouse interaction handlers
  useEffect(() => {
    // Normalize coordinates to be centered (from -1 to 1)
    const handleMouseMove = (event: MouseEvent) => {
      if (mountRef.current) {
        // Calculate normalized position (-1 to 1)
        setMousePosition({
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -(event.clientY / window.innerHeight) * 2 + 1
        });
      }
    };
    
    const handleMouseEnter = () => {
      setIsHovering(true);
      
      // Enhance wireframe visibility on hover
      if (sphereRef.current) {
        (sphereRef.current.material as THREE.MeshBasicMaterial).opacity = 0.5;
      }
      
      // Increase particles size on hover
      if (particlesMeshRef.current) {
        (particlesMeshRef.current.material as THREE.PointsMaterial).size = 0.08;
      }
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      
      // Reset wireframe visibility
      if (sphereRef.current) {
        (sphereRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3;
      }
      
      // Reset particles size
      if (particlesMeshRef.current) {
        (particlesMeshRef.current.material as THREE.PointsMaterial).size = 0.05;
      }
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    
    if (mountRef.current) {
      mountRef.current.addEventListener('mouseenter', handleMouseEnter);
      mountRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (mountRef.current) {
        mountRef.current.removeEventListener('mouseenter', handleMouseEnter);
        mountRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      className="absolute top-0 left-0 w-full h-screen z-0" 
      style={{ cursor: isHovering ? 'pointer' : 'default' }}
    />
  );
};

export default ThreeScene;
