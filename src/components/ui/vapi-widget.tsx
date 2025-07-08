'use client'

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface VapiWidgetProps {
  mode?: 'voice' | 'text';
  theme?: 'light' | 'dark';
  baseColor?: string;
  accentColor?: string;
  buttonBaseColor?: string;
  buttonAccentColor?: string;
  radius?: 'small' | 'medium' | 'large';
  size?: 'small' | 'medium' | 'large' | 'full';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  mainLabel?: string;
  startButtonText?: string;
  endButtonText?: string;
  requireConsent?: boolean;
  localStorageKey?: string;
  showTranscript?: boolean;
  publicKey: string;
  assistantId: string;
  className?: string;
}

export default function VapiWidget({
  mode = 'voice',
  theme = 'dark',
  baseColor = '#000000',
  accentColor = '#009cf4',
  buttonBaseColor = '#000000',
  buttonAccentColor = '#ffffff',
  radius = 'large',
  size = 'full',
  position = 'bottom-right',
  mainLabel = 'TALK WITH AI',
  startButtonText = 'Start',
  endButtonText = 'End Call',
  requireConsent = true,
  localStorageKey = 'vapi_widget_consent',
  showTranscript = true,
  publicKey,
  assistantId,
  className = ''
}: VapiWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up any existing widgets when component unmounts
    return () => {
      const existingWidgets = document.querySelectorAll('vapi-widget');
      existingWidgets.forEach(widget => widget.remove());
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && widgetRef.current) {
      // Create the widget element after script loads
      const widget = document.createElement('vapi-widget');
      widget.setAttribute('mode', mode);
      widget.setAttribute('theme', theme);
      widget.setAttribute('base-color', baseColor);
      widget.setAttribute('accent-color', accentColor);
      widget.setAttribute('button-base-color', buttonBaseColor);
      widget.setAttribute('button-accent-color', buttonAccentColor);
      widget.setAttribute('radius', radius);
      widget.setAttribute('size', size);
      widget.setAttribute('position', position);
      widget.setAttribute('main-label', mainLabel);
      widget.setAttribute('start-button-text', startButtonText);
      widget.setAttribute('end-button-text', endButtonText);
      widget.setAttribute('require-consent', requireConsent.toString());
      widget.setAttribute('local-storage-key', localStorageKey);
      widget.setAttribute('show-transcript', showTranscript.toString());
      widget.setAttribute('public-key', publicKey);
      widget.setAttribute('assistant-id', assistantId);

      // Clear any existing widgets and add the new one
      const container = widgetRef.current.querySelector('.widget-placeholder');
      if (container) {
        container.innerHTML = '';
        container.appendChild(widget);
      }
    }
  }, [mode, theme, baseColor, accentColor, buttonBaseColor, buttonAccentColor, radius, size, position, mainLabel, startButtonText, endButtonText, requireConsent, localStorageKey, showTranscript, publicKey, assistantId]);

  return (
    <div className={`vapi-widget-container ${className}`} ref={widgetRef}>
      <Script
        src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('VAPI widget script loaded');
        }}
      />
      <div className="widget-placeholder"></div>
    </div>
  );
}
