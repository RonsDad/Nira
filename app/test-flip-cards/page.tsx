'use client'

import { FlipCardCarousel, CardData } from '@/components/ui/flip-card-carousel';

export default function TestFlipCards() {
  // Load fonts
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Crimson+Pro:wght@300;400;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  const testCards: CardData[] = [
    {
      id: 'card1',
      frontTitle: 'Test Card 1',
      backContent: 'This is the back content of test card 1. It should show after the card flips.'
    },
    {
      id: 'card2',
      frontTitle: 'Test Card 2',
      backContent: 'This is the back content of test card 2. You should have 5 seconds to read this.'
    },
    {
      id: 'card3',
      frontTitle: 'Test Card 3',
      backContent: 'This is the back content of test card 3. The blue gradient should be visible.'
    }
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Flip Card Test</h1>
      
      <div className="max-w-4xl mx-auto">
        <FlipCardCarousel
          cards={testCards}
          autoPlayInterval={10000}
          className="shadow-2xl"
        />
      </div>
      
      <div className="mt-8 text-center text-gray-600">
        <p>Cards should flip after 3 seconds, then show the back for 5 seconds before transitioning.</p>
      </div>
    </div>
  );
}
