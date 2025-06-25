import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface UseThreeSceneOptions {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onResize?: (width: number, height: number) => void;
}

export function useThreeScene({ canvasRef, onResize }: UseThreeSceneOptions) {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameIdRef = useRef<number>();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) {
      console.log('useThreeScene: No canvas ref');
      return;
    }

    console.log('useThreeScene: Initializing scene');

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Pure white background
    sceneRef.current = scene;

    // Camera setup - simpler positioning
    const isMobile = window.innerWidth < 640;
    const camera = new THREE.PerspectiveCamera(
      50,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, isMobile ? 10 : 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
    });
    renderer.setClearColor(0xffffff, 1); // Force pure white background
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    rendererRef.current = renderer;

    // Simple lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add a test cube to verify scene is working
    const testGeometry = new THREE.BoxGeometry(1, 1, 1);
    const testMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const testCube = new THREE.Mesh(testGeometry, testMaterial);
    testCube.position.set(0, -10, 0); // Hide it below view
    scene.add(testCube);

    // Resize handler
    const handleResize = () => {
      if (!canvasRef.current || !camera || !renderer) return;

      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      onResize?.(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Mark as initialized
    setIsInitialized(true);
    console.log('useThreeScene: Scene initialized');

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      renderer.dispose();
    };
  }, [canvasRef, onResize]);

  return {
    scene: isInitialized ? sceneRef.current : null,
    renderer: isInitialized ? rendererRef.current : null,
    camera: isInitialized ? cameraRef.current : null,
  };
}
