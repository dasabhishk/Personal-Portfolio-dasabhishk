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
  
  // Mouse position tracking and interactive controls
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.05);
  const [particleSize, setParticleSize] = useState(0.05);
  const [particleDensity, setParticleDensity] = useState(100);
  const [lastTouchPosition, setLastTouchPosition] = useState({ x: 0, y: 0 });
  const [isSpinning, setIsSpinning] = useState(true);
  
  // Initialize Three.js scene
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
        color: isDarkMode ? 0x8A2BE2 : 0x6A1CB2, // Purple color
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
      sphereRef.current = sphere;
      
      // Create particles (tech stack icons)
      const particlesGeometry = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleDensity * 3);
      
      for (let i = 0; i < particleDensity * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: particleSize,
        color: isDarkMode ? 0x00FFFF : 0x0088AA, // Cyan color
        transparent: true,
        opacity: 0.8
      });
      
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      particlesMeshRef.current = particlesMesh;
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
    
    // Mark as initialized
    initializedRef.current = true;
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Only attempt to remove if we've previously initialized
      if (mountRef.current && rendererRef.current && rendererRef.current.domElement.parentNode === mountRef.current) {
        try {
          mountRef.current.removeChild(rendererRef.current.domElement);
        } catch (error) {
          console.log('Element already removed');
        }
      }
    };
  }, [isDarkMode, particleDensity, particleSize]);
  
  // Animation loop - separated for better control of dependencies
  const animationFrameRef = useRef<number>(0);
  const initializedRef = useRef<boolean>(false);
  
  useEffect(() => {
    // Animation function
    const animate = () => {
      if (sphereRef.current && particlesMeshRef.current) {
        // Automatic spinning animation when not hovering
        if (!isHovering && isSpinning) {
          sphereRef.current.rotation.x += 0.001;
          sphereRef.current.rotation.y += 0.002;
          
          particlesMeshRef.current.rotation.x -= 0.0005;
          particlesMeshRef.current.rotation.y -= 0.0005;
        } else if (isHovering) {
          // Interactive rotation based on mouse position
          const targetRotationX = (mousePosition.y * rotationSpeed);
          const targetRotationY = (mousePosition.x * rotationSpeed);
          
          // Smooth rotation with lerp (linear interpolation)
          // The lower the division factor, the more responsive/less smooth
          const responsiveness = 0.03; // Lower = more responsive
          sphereRef.current.rotation.x += (targetRotationX - sphereRef.current.rotation.x) * responsiveness;
          sphereRef.current.rotation.y += (targetRotationY - sphereRef.current.rotation.y) * responsiveness;
          
          // Make particles follow in opposite direction with delay
          const particleResponseFactor = 0.01;
          particlesMeshRef.current.rotation.x += (targetRotationX * -0.3 - particlesMeshRef.current.rotation.x) * particleResponseFactor;
          particlesMeshRef.current.rotation.y += (targetRotationY * -0.3 - particlesMeshRef.current.rotation.y) * particleResponseFactor;
          
          // Scale effect on hover - enhance for more control
          const hoverScaleFactor = 1.05 + Math.abs(mousePosition.x * 0.05);
          sphereRef.current.scale.set(hoverScaleFactor, hoverScaleFactor, hoverScaleFactor);
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
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup animation frame
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isHovering, isSpinning, mousePosition, rotationSpeed]);
  
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
  
  // Add mouse and touch interaction handlers
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
    
    // Handle mouse clicks to freeze/unfreeze the rotation
    const handleMouseClick = () => {
      if (isHovering) {
        setIsSpinning(!isSpinning);
        
        // Visual feedback for clicking - quick pulse animation
        if (sphereRef.current) {
          // Quick scale up and down animation
          const currentScale = sphereRef.current.scale.x;
          sphereRef.current.scale.set(currentScale * 1.2, currentScale * 1.2, currentScale * 1.2);
          setTimeout(() => {
            if (sphereRef.current) {
              sphereRef.current.scale.set(currentScale, currentScale, currentScale);
            }
          }, 150);
        }
      }
    };
    
    // For touch devices
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        setLastTouchPosition({
          x: touch.clientX,
          y: touch.clientY
        });
        setIsHovering(true);
      }
    };
    
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        
        // Calculate normalized delta from last position
        const deltaX = (touch.clientX - lastTouchPosition.x) / window.innerWidth * 4;
        const deltaY = (touch.clientY - lastTouchPosition.y) / window.innerHeight * 4;
        
        // Update mouse position based on delta
        setMousePosition(prev => ({
          x: Math.max(-1, Math.min(1, prev.x + deltaX)),
          y: Math.max(-1, Math.min(1, prev.y - deltaY))
        }));
        
        // Update last touch position
        setLastTouchPosition({
          x: touch.clientX,
          y: touch.clientY
        });
      }
    };
    
    const handleTouchEnd = () => {
      setTimeout(() => setIsHovering(false), 100);
    };
    
    // Mouse enter/leave behaviors
    const handleMouseEnter = () => {
      setIsHovering(true);
      
      // Enhance wireframe visibility on hover
      if (sphereRef.current) {
        (sphereRef.current.material as THREE.MeshBasicMaterial).opacity = 0.6;
        
        // Make points larger to enhance control visibility
        (sphereRef.current.material as THREE.MeshBasicMaterial).wireframeLinewidth = 2;
      }
      
      // Increase particles size and brightness on hover
      if (particlesMeshRef.current) {
        (particlesMeshRef.current.material as THREE.PointsMaterial).size = particleSize * 1.6;
        
        // Make particles brighter
        const currentColor = (particlesMeshRef.current.material as THREE.PointsMaterial).color;
        const brighterColor = new THREE.Color(
          Math.min(1, currentColor.r * 1.2),
          Math.min(1, currentColor.g * 1.2),
          Math.min(1, currentColor.b * 1.2)
        );
        (particlesMeshRef.current.material as THREE.PointsMaterial).color = brighterColor;
      }
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      
      // Reset wireframe visibility
      if (sphereRef.current) {
        (sphereRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3;
        (sphereRef.current.material as THREE.MeshBasicMaterial).wireframeLinewidth = 1;
      }
      
      // Reset particles size and color
      if (particlesMeshRef.current) {
        (particlesMeshRef.current.material as THREE.PointsMaterial).size = particleSize;
        
        // Reset color based on theme
        if (isDarkMode) {
          (particlesMeshRef.current.material as THREE.PointsMaterial).color.set(0x00FFFF);
        } else {
          (particlesMeshRef.current.material as THREE.PointsMaterial).color.set(0x0088AA);
        }
      }
    };
    
    // Add all event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    
    if (mountRef.current) {
      mountRef.current.addEventListener('mouseenter', handleMouseEnter);
      mountRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Cleanup all event listeners
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      if (mountRef.current) {
        mountRef.current.removeEventListener('mouseenter', handleMouseEnter);
        mountRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isDarkMode, isHovering, isSpinning, lastTouchPosition, particleSize]);
  
  return (
    <div className="relative">
      {/* Main 3D canvas */}
      <div 
        ref={mountRef} 
        className="absolute top-0 left-0 w-full h-screen z-0" 
        style={{ 
          cursor: isHovering ? (isSpinning ? 'grab' : 'grabbing') : 'default',
          touchAction: 'none' // Prevent default touch actions for better control
        }}
        title={isHovering ? "Click to freeze the rotation" : "Hover to control the 3D object"}
      />
      
      {/* Subtle hint message that fades in and out */}
      {isHovering && (
        <div 
          className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-black/20 backdrop-blur-sm 
                    text-white text-sm px-4 py-2 rounded-full pointer-events-none transition-opacity z-10"
          style={{ 
            opacity: isHovering ? 0.8 : 0, 
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          {isSpinning ? 'Move mouse to control • Click to freeze' : 'Click to resume animation'}
        </div>
      )}
    </div>
  );
};

export default ThreeScene;
