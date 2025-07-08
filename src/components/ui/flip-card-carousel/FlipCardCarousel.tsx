import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { FlipCardCarouselProps } from './types';
import { useThreeScene } from './hooks/useThreeScene';
import { FlipCard } from './FlipCard';
import { NavigationControls } from './NavigationControls';
import { createSlideInAnimation, createSlideOutAnimation } from './utils/animations';
import gsap from 'gsap';

export const FlipCardCarousel: React.FC<FlipCardCarouselProps> = ({
  cards,
  autoPlayInterval = 8000, // 8 seconds total per card (2s front + 1.2s flip + 2s back + 0.8s transition + buffer)
  onCardChange,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout>();
  const cardGroupsRef = useRef<THREE.Group[]>([]);
  const transitionTimelineRef = useRef<gsap.core.Timeline>();

  const { scene, renderer, camera } = useThreeScene({ canvasRef });
  
  // Handle group creation from FlipCard components
  const handleGroupCreated = useCallback((group: THREE.Group, index: number) => {
    cardGroupsRef.current[index] = group;
    
    // Initialize card positions when groups are created
    if (index !== 0) {
      // Start all non-first cards off-screen to the right
      group.position.set(10, 0, -4);
      group.visible = false;
      
      // Set initial opacity for all meshes
      group.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = 0;
        }
      });
    }
  }, []);

  // Handle card change with slide animations
  const handleCardChange = useCallback((newIndex: number) => {
    if (isTransitioning || !scene || cardGroupsRef.current.length < cards.length) return;

    setIsTransitioning(true);
    
    // Kill any existing timeline
    if (transitionTimelineRef.current) {
      transitionTimelineRef.current.kill();
    }

    const oldIndex = currentIndex;
    const newIndexNormalized = (newIndex + cards.length) % cards.length;

    const currentCard = cardGroupsRef.current[oldIndex];
    const nextCard = cardGroupsRef.current[newIndexNormalized];

    if (!currentCard || !nextCard) {
      setIsTransitioning(false);
      return;
    }

    // Create master timeline
    const masterTimeline = gsap.timeline({
      onComplete: () => {
        // Hide the old card after transition
        currentCard.visible = false;
        setCurrentIndex(newIndexNormalized);
        onCardChange?.(newIndexNormalized);
        setIsTransitioning(false);
      }
    });

    // Make next card visible before animating
    nextCard.visible = true;

    // Add slide out and slide in animations
    masterTimeline
      .add(createSlideOutAnimation(currentCard, 'left'))
      .add(createSlideInAnimation(nextCard, 'right'), '-=0.4'); // Overlap animations slightly

    transitionTimelineRef.current = masterTimeline;
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
    }, 2000); // Wait 2 seconds after flip before transitioning
  }, [handleNext]);

  // Pause auto-play on user interaction
  const pauseAutoPlay = useCallback(() => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (transitionTimelineRef.current) {
        transitionTimelineRef.current.kill();
      }
    };
  }, []);

  // Device-responsive container classes
  const containerClasses = `relative w-full bg-white rounded-2xl overflow-hidden shadow-2xl h-[75vh] max-h-[500px] landscape:h-[85vh] landscape:max-h-[400px] sm:h-[70vh] sm:max-h-[600px] sm:landscape:h-[80vh] sm:landscape:max-h-[500px] md:h-[75vh] md:max-h-[700px] lg:h-[80vh] lg:max-h-[800px] xl:h-[85vh] xl:max-h-[900px] min-h-[400px] 2xl:max-w-[1400px] 2xl:mx-auto ${className}`;

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
