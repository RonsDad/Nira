import { MapPin, Star, Clock, Shield, Heart, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface ProviderCardProps {
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  distance: string;
  nextAvailable: string;
  acceptsInsurance: boolean;
  insuranceProvider?: string;
  address: string;
  onSelect?: () => void;
}

export function ProviderCard({
  name,
  specialty,
  rating,
  reviews,
  distance,
  nextAvailable,
  acceptsInsurance,
  insuranceProvider,
  address,
  onSelect
}: ProviderCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div 
      className="rounded-2xl p-6 mb-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      style={{ 
        backgroundColor: '#0a0a0a',
        border: '1px solid #1a1a1a'
      }}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-white">
              {name}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <Heart 
                size={16} 
                className={isLiked ? 'fill-red-400 text-red-400' : 'text-gray-400 hover:text-red-400'}
              />
            </button>
          </div>
          <p className="text-gray-300 font-medium">
            {specialty}
          </p>
        </div>
        
        {/* Rating */}
        <div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ backgroundColor: '#1a1a1a' }}
        >
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="font-bold text-white">
            {rating}
          </span>
          <span className="text-gray-400 text-sm">
            ({reviews})
          </span>
        </div>
      </div>

      {/* Location */}
      <div 
        className="p-4 rounded-xl mb-4 flex items-center gap-3"
        style={{ backgroundColor: '#151515' }}
      >
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
        >
          <MapPin size={16} style={{ color: '#60A5FA' }} />
        </div>
        <div>
          <p className="font-semibold text-white">
            {address}
          </p>
          <p className="text-gray-400 text-sm">
            {distance} away
          </p>
        </div>
      </div>

      {/* Availability */}
      <div 
        className="p-4 rounded-xl mb-4 flex items-center gap-3"
        style={{ backgroundColor: '#151515' }}
      >
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
        >
          <Clock size={16} style={{ color: '#60A5FA' }} />
        </div>
        <div>
          <p className="text-gray-400 text-sm">
            Next available
          </p>
          <p className="font-semibold text-white">
            {nextAvailable}
          </p>
        </div>
      </div>

      {/* Insurance */}
      {acceptsInsurance && (
        <div 
          className="p-4 rounded-xl mb-6 flex items-center gap-3"
          style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)' }}
        >
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
          >
            <Shield size={16} style={{ color: '#60A5FA' }} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-blue-300">
              {insuranceProvider ? `Accepts ${insuranceProvider}` : 'Accepts Your Insurance'}
            </p>
            <p className="text-blue-200 text-sm">
              Verified coverage
            </p>
          </div>
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: '#60A5FA' }}
          />
        </div>
      )}

      {/* Action Button */}
      <Button 
        className="w-full h-12 text-white font-semibold text-base hover:opacity-90 transition-opacity"
        style={{
          background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
          border: 'none'
        }}
      >
        <span className="flex items-center gap-3">
          View Profile & Book Appointment
          <ChevronRight size={20} />
        </span>
      </Button>
    </div>
  );
}