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
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    // Camera - responsive field of view based on device
    const isMobile = window.innerWidth < 768;
    const fov = isMobile ? 85 : 75; // Wider FOV on mobile for better visibility
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    
    // Adjust camera distance based on device
    camera.position.z = isMobile ? 6 : 5;
    cameraRef.current = camera;

    // Renderer with pixel ratio support
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Store references for cards
    scene.userData.camera = camera;

    // Three.js recommended responsive resize function with HD-DPI support
    function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
      const canvas = renderer.domElement;
      const pixelRatio = window.devicePixelRatio;
      const width = Math.floor(canvas.clientWidth * pixelRatio);
      const height = Math.floor(canvas.clientHeight * pixelRatio);
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
        onResize?.(width, height);
      }
      return needResize;
    }

    // Update camera on device orientation change
    function updateCameraForDevice() {
      const isMobile = window.innerWidth < 768;
      camera.fov = isMobile ? 85 : 75;
      camera.position.z = isMobile ? 6 : 5;
      camera.updateProjectionMatrix();
    }

    // Handle window resize and orientation change
    function onWindowResize() {
      updateCameraForDevice();
    }

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('orientationchange', onWindowResize);

    // Render loop - exactly from Three.js documentation
    function render() {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(render);
    }
    
    frameIdRef.current = requestAnimationFrame(render);
    setIsInitialized(true);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('orientationchange', onWindowResize);
      
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
