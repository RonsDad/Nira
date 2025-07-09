import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CardData } from './types';

interface SimpleFlipCardCarouselProps {
  cards: CardData[];
  autoPlayInterval?: number;
  className?: string;
}

export const SimpleFlipCardCarousel: React.FC<SimpleFlipCardCarouselProps> = ({
  cards,
  autoPlayInterval = 8000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-play logic
  useEffect(() => {
    if (autoPlayInterval <= 0) return;

    const sequence = async () => {
      // Wait 2 seconds on front
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Flip to back
      setIsFlipped(true);
      
      // Wait for flip animation (0.6s) + 2 seconds on back
      await new Promise(resolve => setTimeout(resolve, 2600));
      
      // Slide out and bring next card
      setIsAnimating(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCurrentIndex(prev => (prev + 1) % cards.length);
      setIsFlipped(false);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsAnimating(false);
    };

    const timer = setTimeout(sequence, 0);
    return () => clearTimeout(timer);
  }, [currentIndex, autoPlayInterval, cards.length]);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
      setIsFlipped(false);
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % cards.length);
      setIsFlipped(false);
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className={`relative w-full h-[600px] ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        <div
          className={`relative w-full max-w-md h-[500px] transition-all duration-300 ${
            isAnimating ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
          }`}
        >
          <div
            className={`absolute inset-0 w-full h-full transition-transform duration-600 preserve-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front of card */}
            <div
              className="absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-2xl"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 flex flex-col items-center justify-center text-white">
                <h2 className="text-3xl font-bold text-center">{currentCard.frontTitle}</h2>
              </div>
            </div>

            {/* Back of card */}
            <div
              className="absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-2xl rotate-y-180"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-bold mb-4">{currentCard.frontTitle}</h3>
                <p className="text-lg text-center opacity-90">{currentCard.backContent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-10">
        <button
          onClick={handlePrevious}
          className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex space-x-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all"
          aria-label="Next card"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};