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

  useEffect(() => {
    if (!scene) {
      console.log('FlipCard: No scene available');
      return;
    }
    console.log(`FlipCard ${index}: Creating card`);

    // Create card group
    const cardGroup = new THREE.Group();
    groupRef.current = cardGroup;

    // Card dimensions - BIGGER!
    const width = 4.5;
    const height = 6;
    const depth = 0.02;

    // Simple plane geometry for the card
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    
    // Front face
    const frontTexture = createCardTexture({
      title: data.frontTitle,
      text: '',
      label: 'HEALTHCARE'
    }, true);
    
    const frontMaterial = new THREE.MeshBasicMaterial({
      map: frontTexture,
      side: THREE.FrontSide,
      transparent: false,
    });

    const frontMesh = new THREE.Mesh(planeGeometry, frontMaterial);
    frontMesh.position.z = depth / 2 + 0.001; // Slight offset to prevent z-fighting
    frontMesh.castShadow = true;
    frontMesh.receiveShadow = true;

    // Back face
    const backTexture = createCardTexture({
      title: data.frontTitle,
      text: data.backContent
    }, false);
    
    const backMaterial = new THREE.MeshBasicMaterial({
      map: backTexture,
      side: THREE.FrontSide,
      transparent: false,
    });

    const backMesh = new THREE.Mesh(planeGeometry, backMaterial);
    backMesh.position.z = -depth / 2 - 0.001;
    backMesh.rotation.y = Math.PI;
    backMesh.castShadow = true;
    backMesh.receiveShadow = true;

    // Add meshes to group
    cardGroup.add(frontMesh);
    cardGroup.add(backMesh);

    // Position based on index
    cardGroup.position.x = index * 0.1; // Slight offset to prevent z-fighting
    cardGroup.position.y = 0;
    cardGroup.position.z = -index * 0.1;

    // Add to scene
    scene.add(cardGroup);
    
    // Notify parent about group creation
    onGroupCreated?.(cardGroup, index);

    // Initially hide all cards except the first one
    if (index !== 0) {
      cardGroup.visible = false;
    }

    return () => {
      // Cleanup
      killAllAnimations(cardGroup);
      scene.remove(cardGroup);
      
      // Dispose of geometries and materials
      planeGeometry.dispose();
      frontMaterial.dispose();
      backMaterial.dispose();
      frontTexture.dispose();
      backTexture.dispose();
    };
  }, [data, scene, index]);

  useEffect(() => {
    if (!groupRef.current) return;
    
    // Show/hide card based on active state
    groupRef.current.visible = isActive;
    
    if (!isActive) {
      hasFlippedRef.current = false;
      // Reset rotation when card becomes inactive
      groupRef.current.rotation.y = 0;
      return;
    }

    // Auto-flip after 3 seconds when active
    const flipTimeout = setTimeout(() => {
      if (!hasFlippedRef.current && groupRef.current) {
        createFlipAnimation(groupRef.current, () => {
          hasFlippedRef.current = true;
          // Wait 5 seconds after flip to allow ample reading time
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
