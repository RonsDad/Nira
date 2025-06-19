export interface CardData {
  id: string;
  frontTitle: string;
  backContent: string;
  theme?: CardTheme;
}

export interface CardTheme {
  frontBackground?: string;
  backGradientStart?: string;
  backGradientEnd?: string;
  textColor?: string;
}

export interface FlipCardCarouselProps {
  cards: CardData[];
  autoPlayInterval?: number;
  onCardChange?: (index: number) => void;
  className?: string;
}

export interface FlipCardProps {
  data: CardData;
  isActive: boolean;
  onFlipComplete?: () => void;
  position: 'center' | 'left' | 'right' | 'hidden';
}

export interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCards: number;
}
