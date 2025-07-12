export interface QRPattern {
  id: string;
  name: string;
  type: 'dots' | 'squares' | 'rounded' | 'custom';
  svg?: string;
  description: string;
}

export interface QREyeShape {
  id: string;
  name: string;
  outerShape: 'square' | 'circle' | 'rounded-square' | 'diamond' | 'star';
  innerShape: 'square' | 'circle' | 'rounded-square' | 'diamond' | 'dot';
  svg: string;
  description: string;
}

export interface QRFrame {
  id: string;
  name: string;
  type: 'none' | 'simple' | 'rounded' | 'decorative' | 'branded';
  svg: string;
  description: string;
}

export interface QRTemplate {
  id: string;
  name: string;
  category: 'business' | 'social' | 'event' | 'creative' | 'minimal' | 'decorative';
  preview: string;
  pattern: QRPattern;
  eyeShape: QREyeShape;
  frame: QRFrame;
  colors: {
    foreground: string;
    background: string;
    eyeColor?: string;
    frameColor?: string;
  };
  description: string;
}

export interface AdvancedQRCustomization {
  template?: QRTemplate;
  pattern: QRPattern;
  eyeShape: QREyeShape;
  frame: QRFrame;
  colors: {
    foreground: string;
    background: string;
    eyeColor: string;
    frameColor: string;
  };
  size: number;
  margin: number;
  logoUrl?: string;
  logoSize?: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}