import gsap from 'gsap';
import * as THREE from 'three';

export const ANIMATION_DURATION = {
  FLIP: 1.2,
  SLIDE_OUT: 0.8,
  SLIDE_IN: 0.8,
  AUTO_FLIP_DELAY: 5,
};

export const CARD_POSITIONS = {
  CENTER: { x: 0, z: 0 },
  LEFT: { x: -6, z: -2 },
  RIGHT: { x: 6, z: -2 },
  HIDDEN_LEFT: { x: -10, z: -4 },
  HIDDEN_RIGHT: { x: 10, z: -4 },
};

export function createFlipAnimation(
  cardGroup: THREE.Group,
  onComplete?: () => void
): gsap.core.Timeline {
  const timeline = gsap.timeline({
    onComplete,
  });

  // Purposeful, controlled rotation with slight tilt
  timeline
    .to(cardGroup.rotation, {
      y: Math.PI,
      x: 0.05, // Slight tilt for depth perception
      duration: ANIMATION_DURATION.FLIP,
      ease: 'power3.inOut',
    })
    .to(
      cardGroup.position,
      {
        z: 0.5, // Move card forward during flip
        duration: ANIMATION_DURATION.FLIP / 2,
        ease: 'power2.out',
      },
      0
    )
    .to(
      cardGroup.position,
      {
        z: 0,
        duration: ANIMATION_DURATION.FLIP / 2,
        ease: 'power2.in',
      },
      ANIMATION_DURATION.FLIP / 2
    )
    .to(
      cardGroup.rotation,
      {
        x: 0, // Reset tilt
        duration: 0.3,
        ease: 'power2.out',
      },
      ANIMATION_DURATION.FLIP - 0.3
    );

  return timeline;
}

export function createSlideOutAnimation(
  cardGroup: THREE.Group,
  direction: 'left' | 'right' = 'left'
): gsap.core.Timeline {
  const timeline = gsap.timeline();
  const targetX = direction === 'left' ? CARD_POSITIONS.HIDDEN_LEFT.x : CARD_POSITIONS.HIDDEN_RIGHT.x;

  timeline.to(cardGroup.position, {
    x: targetX,
    z: CARD_POSITIONS.HIDDEN_LEFT.z,
    duration: ANIMATION_DURATION.SLIDE_OUT,
    ease: 'power2.in',
  });

  // Animate opacity for all mesh children
  cardGroup.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      timeline.to(
        child.material,
        {
          opacity: 0,
          duration: ANIMATION_DURATION.SLIDE_OUT,
          ease: 'power2.in',
        },
        0
      );
    }
  });

  return timeline;
}

export function createSlideInAnimation(
  cardGroup: THREE.Group,
  fromDirection: 'left' | 'right' = 'right'
): gsap.core.Timeline {
  const timeline = gsap.timeline();
  const startX = fromDirection === 'left' ? CARD_POSITIONS.HIDDEN_LEFT.x : CARD_POSITIONS.HIDDEN_RIGHT.x;

  // Set initial position
  gsap.set(cardGroup.position, {
    x: startX,
    z: CARD_POSITIONS.HIDDEN_LEFT.z,
  });
  gsap.set(cardGroup.rotation, { y: 0 });
  
  // Set initial opacity for all mesh children
  cardGroup.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      gsap.set(child.material, { opacity: 0, transparent: true });
    }
  });

  timeline.to(cardGroup.position, {
    x: CARD_POSITIONS.CENTER.x,
    z: CARD_POSITIONS.CENTER.z,
    duration: ANIMATION_DURATION.SLIDE_IN,
    ease: 'power2.out',
  });

  // Animate opacity for all mesh children
  cardGroup.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      timeline.to(
        child.material,
        {
          opacity: 1,
          duration: ANIMATION_DURATION.SLIDE_IN,
          ease: 'power2.out',
        },
        0
      );
    }
  });

  return timeline;
}

export function createCardTransition(
  currentCard: THREE.Group,
  nextCard: THREE.Group,
  onComplete?: () => void
): gsap.core.Timeline {
  const masterTimeline = gsap.timeline({ onComplete });

  masterTimeline
    .add(createSlideOutAnimation(currentCard, 'left'))
    .add(createSlideInAnimation(nextCard, 'right'), '-=0.3');

  return masterTimeline;
}

export function killAllAnimations(target: THREE.Object3D): void {
  gsap.killTweensOf(target.position);
  gsap.killTweensOf(target.rotation);
  gsap.killTweensOf(target.scale);
  
  // Kill animations for all mesh children materials
  target.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      gsap.killTweensOf(child.material);
    }
  });
}
