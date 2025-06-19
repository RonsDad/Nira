import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigationControlsProps } from './types';

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPrevious,
  onNext,
  currentIndex,
  totalCards,
}) => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-10">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        className="group bg-white/90 backdrop-blur-sm hover:bg-white text-slate-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
        aria-label="Previous card"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Card Indicators */}
      <div className="flex space-x-2">
        {Array.from({ length: totalCards }).map((_, index) => (
          <div
            key={index}
            className={`h-2 transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 bg-blue-600'
                : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="group bg-white/90 backdrop-blur-sm hover:bg-white text-slate-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
        aria-label="Next card"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};
