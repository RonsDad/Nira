import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { FlipCardCarouselProps } from './types';
import { useThreeScene } from './hooks/useThreeScene';
import { FlipCard } from './FlipCard';
import { NavigationControls } from './NavigationControls';
import { createCardTransition } from './utils/animations';

export const FlipCardCarousel: React.FC<FlipCardCarouselProps> = ({
  cards,
  autoPlayInterval = 10000, // 10 seconds total per card (5s front + 5s back)
  onCardChange,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout>();
  const cardGroupsRef = useRef<THREE.Group[]>([]);

  const { scene, renderer, camera } = useThreeScene({ canvasRef });
  
  // Debug logging
  useEffect(() => {
    console.log('FlipCardCarousel mounted, scene:', scene, 'renderer:', renderer, 'camera:', camera);
  }, [scene, renderer, camera]);

  // Handle group creation from FlipCard components
  const handleGroupCreated = useCallback((group: THREE.Group, index: number) => {
    cardGroupsRef.current[index] = group;
  }, []);

  // Handle card change
  const handleCardChange = useCallback((newIndex: number) => {
    if (isTransitioning || !scene) return;

    setIsTransitioning(true);
    const oldIndex = currentIndex;
    const newIndexNormalized = (newIndex + cards.length) % cards.length;

    // Simply update visibility and index - cards handle their own visibility
    setCurrentIndex(newIndexNormalized);
    onCardChange?.(newIndexNormalized);
    
    // Reset transition flag after a short delay
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [currentIndex, cards.length, isTransitioning, onCardChange, scene]);

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    handleCardChange(currentIndex - 1);
  }, [currentIndex, handleCardChange]);

  const handleNext = useCallback(() => {
    handleCardChange(currentIndex + 1);
  }, [currentIndex, handleCardChange]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlayInterval <= 0) return;

    // Clear existing timeout
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }

    // Set new timeout
    autoPlayTimeoutRef.current = setTimeout(() => {
      handleNext();
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [currentIndex, autoPlayInterval, handleNext]);

  // Handle card flip completion
  const handleFlipComplete = useCallback(() => {
    // After card flips and shows back content, move to next card
    setTimeout(() => {
      handleNext();
    }, 3000); // Wait 3 seconds after flip before transitioning
  }, [handleNext]);

  // Pause auto-play on user interaction
  const pauseAutoPlay = useCallback(() => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
  }, []);

  return (
    <div className={`relative w-full h-[700px] bg-white rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onMouseDown={pauseAutoPlay}
        onTouchStart={pauseAutoPlay}
      />

      {/* Render cards */}
      {scene && cards.map((card, index) => (
        <FlipCard
          key={card.id}
          data={card}
          scene={scene}
          index={index}
          isActive={index === currentIndex}
          onFlipComplete={index === currentIndex ? handleFlipComplete : undefined}
          onGroupCreated={handleGroupCreated}
        />
      ))}

      {/* Navigation Controls */}
      <NavigationControls
        onPrevious={handlePrevious}
        onNext={handleNext}
        currentIndex={currentIndex}
        totalCards={cards.length}
      />

      {/* Loading indicator */}
      {!scene && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="text-slate-600">Loading 3D carousel...</div>
        </div>
      )}
    </div>
  );
};

// Export all components from the index
export * from './types';
