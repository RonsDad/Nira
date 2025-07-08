declare global {
  interface Window {
    customElements: CustomElementRegistry;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    'vapi-widget': {
      mode?: string;
      theme?: string;
      'base-color'?: string;
      'accent-color'?: string;
      'button-base-color'?: string;
      'button-accent-color'?: string;
      radius?: string;
      size?: string;
      position?: string;
      'main-label'?: string;
      'start-button-text'?: string;
      'end-button-text'?: string;
      'require-consent'?: string;
      'local-storage-key'?: string;
      'show-transcript'?: string;
      'public-key'?: string;
      'assistant-id'?: string;
    };
  }
}

export {};
