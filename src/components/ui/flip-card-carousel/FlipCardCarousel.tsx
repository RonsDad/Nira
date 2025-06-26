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

  // Device-responsive container classes
  const containerClasses = `
    relative w-full bg-white rounded-2xl overflow-hidden shadow-2xl
    
    /* Height responsive to viewport and device */
    h-[75vh] max-h-[500px] /* Mobile portrait */
    landscape:h-[85vh] landscape:max-h-[400px] /* Mobile landscape */
    
    sm:h-[70vh] sm:max-h-[600px] /* Small tablets */
    sm:landscape:h-[80vh] sm:landscape:max-h-[500px]
    
    md:h-[75vh] md:max-h-[700px] /* Tablets */
    lg:h-[80vh] lg:max-h-[800px] /* Desktop */
    xl:h-[85vh] xl:max-h-[900px] /* Large desktop */
    
    /* Minimum height to ensure readability */
    min-h-[400px]
    
    /* Ensure proper aspect ratio on very wide screens */
    2xl:max-w-[1400px] 2xl:mx-auto
    
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <div className={containerClasses}>
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full touch-none"
        onMouseDown={pauseAutoPlay}
        onTouchStart={pauseAutoPlay}
        style={{ touchAction: 'none' }} // Prevent touch scrolling on canvas
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
