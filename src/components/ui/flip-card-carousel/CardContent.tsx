import React from 'react';
import * as THREE from 'three';

interface CardContentProps {
  text: string;
  isFront: boolean;
  title?: string;
  label?: string;
  width?: number;
  height?: number;
}

export function createCardTexture(
  content: {
    title: string;
    text: string;
    label?: string;
  },
  isFront: boolean,
  width: number = 1024,
  height: number = 1536
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Enable better text rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Device-responsive calculations
  const isMobileResolution = width <= 512;
  const isTabletResolution = width > 512 && width <= 768;

  // ROUNDED CORNERS FUNCTION
  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  if (isFront) {
    // ROUNDED CORNERS WITH CLIPPING
    const borderRadius = width * 0.04;
    roundRect(ctx, 0, 0, width, height, borderRadius);
    ctx.clip();

    // Main gradient background - blue theme
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#3b82f6');  // Matching logo blue
    gradient.addColorStop(1, '#2563eb');  // Slightly darker blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // GLASSMORPHIC OVERLAY
    const glassGradient = ctx.createLinearGradient(0, 0, width, height);
    glassGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    glassGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
    glassGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
    ctx.fillStyle = glassGradient;
    ctx.fillRect(0, 0, width, height);
    
    // White border with rounded corners
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = Math.max(4, width * 0.006);
    roundRect(ctx, 12, 12, width - 24, height - 24, borderRadius - 12);
    ctx.stroke();
    
    // Label - responsive font size
    if (content.label) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      let labelSize;
      if (isMobileResolution) {
        labelSize = width * 0.04;
      } else if (isTabletResolution) {
        labelSize = width * 0.038;
      } else {
        labelSize = width * 0.035;
      }
      ctx.font = `600 ${labelSize}px "Crimson Pro", serif`;
      ctx.textAlign = 'left';
      ctx.letterSpacing = '4px';
      ctx.fillText(content.label.toUpperCase(), width * 0.08, height * 0.08);
    }

    // Title - responsive sizing
    ctx.fillStyle = '#ffffff';
    let titleSize;
    if (isMobileResolution) {
      titleSize = width * 0.11;
    } else if (isTabletResolution) {
      titleSize = width * 0.10;
    } else {
      titleSize = width * 0.09;
    }
    
    ctx.font = `700 ${titleSize}px "Playfair Display", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Word wrap for title
    const words = content.title.split(' ');
    const lineHeight = titleSize * 1.2;
    const lines: string[] = [];
    let currentLine = '';
    const maxWidth = width * 0.85;
    const yStart = height * 0.5;

    for (let n = 0; n < words.length; n++) {
      const testLine = currentLine + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        lines.push(currentLine.trim());
        currentLine = words[n] + ' ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());

    // Add subtle shadow for text - responsive
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = isMobileResolution ? 4 : 6;
    ctx.shadowOffsetX = isMobileResolution ? 1 : 2;
    ctx.shadowOffsetY = isMobileResolution ? 1 : 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, width / 2, yStart + index * lineHeight);
    });

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

  } else {
    // Back side of card
    const borderRadius = width * 0.04;
    roundRect(ctx, 0, 0, width, height, borderRadius);
    ctx.clip();

    // Main gradient background - blue theme
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(1, '#2563eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // GLASSMORPHIC OVERLAY
    const glassGradient = ctx.createLinearGradient(0, 0, width, height);
    glassGradient.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
    glassGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.03)');
    glassGradient.addColorStop(1, 'rgba(255, 255, 255, 0.08)');
    ctx.fillStyle = glassGradient;
    ctx.fillRect(0, 0, width, height);
    
    // White border with rounded corners
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = Math.max(4, width * 0.006);
    roundRect(ctx, 12, 12, width - 24, height - 24, borderRadius - 12);
    ctx.stroke();

    // Content text - responsive font size
    ctx.fillStyle = '#ffffff';
    let fontSize;
    if (isMobileResolution) {
      fontSize = Math.floor(width * 0.052);
    } else if (isTabletResolution) {
      fontSize = Math.floor(width * 0.048);
    } else {
      fontSize = Math.floor(width * 0.045);
    }
    
    ctx.font = `400 ${fontSize}px "Crimson Pro", serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    // Word wrap for content
    const words = content.text.split(' ');
    const lineHeight = fontSize * 1.6;
    const lines: string[] = [];
    let currentLine = '';
    const paddedWidth = width * 0.85;
    const maxWidth = paddedWidth;
    const textX = width * 0.08;
    const textY = height * 0.1;

    for (let n = 0; n < words.length; n++) {
      const testLine = currentLine + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        lines.push(currentLine.trim());
        currentLine = words[n] + ' ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());

    // Add shadow for better readability - responsive
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = isMobileResolution ? 3 : 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    lines.forEach((line, index) => {
      ctx.fillText(line, textX, textY + index * lineHeight);
    });

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export const CardContent: React.FC<CardContentProps> = ({ text, isFront, width, height }) => {
  return null;
};
