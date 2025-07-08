import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CardData } from './types';
import { createCardTexture } from './CardContent';
import { createFlipAnimation, killAllAnimations } from './utils/animations';

interface FlipCardProps {
  data: CardData;
  scene: THREE.Scene;
  index: number;
  isActive: boolean;
  onFlipComplete?: () => void;
  onGroupCreated?: (group: THREE.Group, index: number) => void;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  data,
  scene,
  index,
  isActive,
  onFlipComplete,
  onGroupCreated,
}) => {
  const groupRef = useRef<THREE.Group>();
  const hasFlippedRef = useRef(false);
  const meshesRef = useRef<{ front: THREE.Mesh; back: THREE.Mesh }>();
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (!scene) return;

    const cardGroup = new THREE.Group();
    groupRef.current = cardGroup;

    // Get camera
    const camera = scene.userData.camera as THREE.PerspectiveCamera;
    if (!camera) return;

    // Device-responsive calculations
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // Calculate visible area at z=0 (where cards are positioned)
    const distance = camera.position.z;
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const height = 2 * Math.tan(vFov / 2) * distance;
    const width = height * camera.aspect;

    // Responsive card sizing based on device
    let cardSizeMultiplier;
    if (isMobile) {
      cardSizeMultiplier = 0.85; // Use more screen on mobile
    } else if (isTablet) {
      cardSizeMultiplier = 0.75;
    } else {
      cardSizeMultiplier = 0.65; // Desktop
    }

    // Card size based on visible area
    let cardWidth = width * cardSizeMultiplier;
    let cardHeight = cardWidth * 1.3; // Maintain aspect ratio

    // Ensure card fits vertically with padding
    const maxHeightMultiplier = isMobile ? 0.85 : 0.9;
    if (cardHeight > height * maxHeightMultiplier) {
      const scale = (height * maxHeightMultiplier) / cardHeight;
      cardWidth *= scale;
      cardHeight *= scale;
    }

    
    // Device-based canvas resolution
    let canvasSize;
    if (isMobile) {
      canvasSize = Math.min(window.innerWidth * window.devicePixelRatio, 512);
    } else if (isTablet) {
      canvasSize = Math.min(window.innerWidth * window.devicePixelRatio, 768);
    } else {
      canvasSize = Math.min(window.innerWidth * window.devicePixelRatio, 1024);
    }
    
    // Create a double-sided card using BoxGeometry
    const cardGeometry = new THREE.BoxGeometry(cardWidth, cardHeight, 0.02);
    
    // Front face texture
    const frontTexture = createCardTexture({
      title: data.frontTitle,
      text: '',
      label: 'HEALTHCARE'
    }, true, canvasSize, canvasSize * 1.5);
    
    // Back face texture
    const backTexture = createCardTexture({
      title: data.frontTitle,
      text: data.backContent
    }, false, canvasSize, canvasSize * 1.5);
    
    // Create materials array for each face of the box
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x1e3a8a, transparent: true }), // Right side
      new THREE.MeshBasicMaterial({ color: 0x1e3a8a, transparent: true }), // Left side
      new THREE.MeshBasicMaterial({ color: 0x1e3a8a, transparent: true }), // Top
      new THREE.MeshBasicMaterial({ color: 0x1e3a8a, transparent: true }), // Bottom
      new THREE.MeshBasicMaterial({ map: frontTexture, transparent: true }), // Front
      new THREE.MeshBasicMaterial({ map: backTexture, transparent: true }), // Back
    ];

    const cardMesh = new THREE.Mesh(cardGeometry, materials);
    
    // Store mesh reference for animation
    meshesRef.current = { front: cardMesh, back: cardMesh };
    
    cardGroup.add(cardMesh);
    
    // Set initial position and visibility
    if (index === 0) {
      cardGroup.position.set(0, 0, 0);
      cardGroup.visible = true;
      materials.forEach(mat => mat.opacity = 1);
    } else {
      // Start off-screen (handled by parent component)
      cardGroup.visible = false;
    }
    
    scene.add(cardGroup);
    onGroupCreated?.(cardGroup, index);

    // Responsive update function
    const updateCardSize = () => {
      const camera = scene.userData.camera as THREE.PerspectiveCamera;
      if (!camera || !meshesRef.current) return;
      
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      const distance = camera.position.z;
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const height = 2 * Math.tan(vFov / 2) * distance;
      const width = height * camera.aspect;

      let cardSizeMultiplier;
      if (isMobile) {
        cardSizeMultiplier = 0.85;
      } else if (isTablet) {
        cardSizeMultiplier = 0.75;
      } else {
        cardSizeMultiplier = 0.65;
      }

      let cardWidth = width * cardSizeMultiplier;
      let cardHeight = cardWidth * 1.3;

      const maxHeightMultiplier = isMobile ? 0.85 : 0.9;
      if (cardHeight > height * maxHeightMultiplier) {
        const scale = (height * maxHeightMultiplier) / cardHeight;
        cardWidth *= scale;
        cardHeight *= scale;
      }

      // Dispose old geometry
      if (meshesRef.current?.front?.geometry) {
        meshesRef.current.front.geometry.dispose();
      }
      
      // Create new geometry
      const newGeometry = new THREE.BoxGeometry(cardWidth, cardHeight, 0.02);
      if (meshesRef.current?.front) {
        meshesRef.current.front.geometry = newGeometry;
      }
    };

    // Handle resize events
    const handleResize = () => {
      updateCardSize();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      
      killAllAnimations(cardGroup);
      scene.remove(cardGroup);
      cardGeometry.dispose();
      materials.forEach(mat => mat.dispose());
      frontTexture.dispose();
      backTexture.dispose();
    };
  }, [data, scene, index, onGroupCreated]);

  // Handle active state changes
  useEffect(() => {
    if (!groupRef.current) return;
    
    if (!isActive) {
      // Card is no longer active
      hasFlippedRef.current = false;
      return;
    }

    // Card just became active
    if (isFirstRenderRef.current && index === 0) {
      // First card on initial render - don't reset rotation
      isFirstRenderRef.current = false;
    } else {
      // Reset rotation for cards sliding in
      groupRef.current.rotation.y = 0;
    }
    
    hasFlippedRef.current = false;

    // Start flip animation after delay
    const flipTimeout = setTimeout(() => {
      if (!hasFlippedRef.current && groupRef.current && isActive) {
        createFlipAnimation(groupRef.current, () => {
          hasFlippedRef.current = true;
          // Notify parent that flip is complete and we've shown the back
          onFlipComplete?.();
        });
      }
    }, 2000); // Wait 2 seconds before starting flip

    return () => clearTimeout(flipTimeout);
  }, [isActive, index, onFlipComplete]);

  return null;
};
