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

    // Create geometry
    const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight);
    
    // Device-based canvas resolution
    let canvasSize;
    if (isMobile) {
      canvasSize = Math.min(window.innerWidth * window.devicePixelRatio, 512);
    } else if (isTablet) {
      canvasSize = Math.min(window.innerWidth * window.devicePixelRatio, 768);
    } else {
      canvasSize = Math.min(window.innerWidth * window.devicePixelRatio, 1024);
    }
    
    // Front face
    const frontTexture = createCardTexture({
      title: data.frontTitle,
      text: '',
      label: 'HEALTHCARE'
    }, true, canvasSize, canvasSize * 1.5);
    
    const frontMaterial = new THREE.MeshBasicMaterial({
      map: frontTexture,
      side: THREE.FrontSide,
    });

    const frontMesh = new THREE.Mesh(geometry, frontMaterial);
    frontMesh.position.z = 0.01;

    // Back face
    const backTexture = createCardTexture({
      title: data.frontTitle,
      text: data.backContent
    }, false, canvasSize, canvasSize * 1.5);
    
    const backMaterial = new THREE.MeshBasicMaterial({
      map: backTexture,
      side: THREE.FrontSide, // Changed to FrontSide
    });

    const backMesh = new THREE.Mesh(geometry, backMaterial);
    backMesh.position.z = -0.01;
    backMesh.rotation.y = Math.PI; // Rotate 180 degrees to face backwards

    meshesRef.current = { front: frontMesh, back: backMesh };
    
    cardGroup.add(frontMesh);
    cardGroup.add(backMesh);
    
    // Position
    cardGroup.position.set(0, 0, 0);
    cardGroup.visible = index === 0;
    
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
      geometry.dispose();
      
      // Create new geometry
      const newGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight);
      meshesRef.current.front.geometry = newGeometry;
      meshesRef.current.back.geometry = newGeometry;
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
      geometry.dispose();
      frontMaterial.dispose();
      backMaterial.dispose();
      frontTexture.dispose();
      backTexture.dispose();
    };
  }, [data, scene, index, onGroupCreated]);

  useEffect(() => {
    if (!groupRef.current) return;
    
    groupRef.current.visible = isActive;
    
    if (!isActive) {
      hasFlippedRef.current = false;
      groupRef.current.rotation.y = 0;
      return;
    }

    const flipTimeout = setTimeout(() => {
      if (!hasFlippedRef.current && groupRef.current) {
        createFlipAnimation(groupRef.current, () => {
          hasFlippedRef.current = true;
          setTimeout(() => {
            onFlipComplete?.();
          }, 5000);
        });
      }
    }, 3000);

    return () => clearTimeout(flipTimeout);
  }, [isActive, onFlipComplete]);

  return null;
};
