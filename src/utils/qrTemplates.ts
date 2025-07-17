import { QRTemplate, QRAdvancedCustomization } from '../types';

export const QR_FRAME_STYLES = [
  { id: 'none', name: 'No Frame', type: 'none' as const },
  { id: 'square', name: 'Square Frame', type: 'square' as const },
  { id: 'rounded', name: 'Rounded Frame', type: 'rounded' as const },
  { id: 'circle', name: 'Circle Frame', type: 'circle' as const }
];

export const QR_DOT_STYLES = [
  { id: 'square', name: 'Square', type: 'square' as const },
  { id: 'circle', name: 'Circle', type: 'circle' as const },
  { id: 'rounded', name: 'Rounded', type: 'rounded' as const },
  { id: 'diamond', name: 'Diamond', type: 'diamond' as const }
];

export const QR_TEMPLATES: QRTemplate[] = [
  {
    id: 'classic',
    name: 'Classic',
    preview: '/template.jpg',
    customization: {
      size: 300,
      margin: 2,
      errorCorrectionLevel: 'H',
      colors: {
        background: '#FFFFFF',
        foreground: '#000000',
        eyeColor: '#000000',
        frameColor: '#333333'
      },
      frame: { id: 'none', name: 'No Frame', type: 'none' },
      bodyShape: { id: 'square', name: 'Square', type: 'square' },
      eyeFrameShape: { id: 'square', name: 'Square', type: 'square' },
      eyeBallShape: { id: 'square', name: 'Square', type: 'square' }
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    preview: '/template.jpg',
    customization: {
      size: 300,
      margin: 2,
      errorCorrectionLevel: 'H',
      colors: {
        background: '#FFFFFF',
        foreground: '#2563eb',
        eyeColor: '#1d4ed8',
        frameColor: '#3b82f6'
      },
      frame: { id: 'rounded', name: 'Rounded Frame', type: 'rounded' },
      bodyShape: { id: 'circle', name: 'Circle', type: 'circle' },
      eyeFrameShape: { id: 'rounded', name: 'Rounded', type: 'rounded' },
      eyeBallShape: { id: 'circle', name: 'Circle', type: 'circle' }
    }
  },
  {
    id: 'elegant',
    name: 'Elegant',
    preview: '/template.jpg',
    customization: {
      size: 300,
      margin: 2,
      errorCorrectionLevel: 'H',
      colors: {
        background: '#f8fafc',
        foreground: '#1e293b',
        eyeColor: '#0f172a',
        frameColor: '#475569'
      },
      frame: { id: 'square', name: 'Square Frame', type: 'square' },
      bodyShape: { id: 'rounded', name: 'Rounded', type: 'rounded' },
      eyeFrameShape: { id: 'square', name: 'Square', type: 'square' },
      eyeBallShape: { id: 'rounded', name: 'Rounded', type: 'rounded' }
    }
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    preview: '/template.jpg',
    customization: {
      size: 300,
      margin: 2,
      errorCorrectionLevel: 'H',
      colors: {
        background: '#fef3c7',
        foreground: '#dc2626',
        eyeColor: '#b91c1c',
        frameColor: '#f59e0b'
      },
      frame: { id: 'circle', name: 'Circle Frame', type: 'circle' },
      bodyShape: { id: 'diamond', name: 'Diamond', type: 'diamond' },
      eyeFrameShape: { id: 'circle', name: 'Circle', type: 'circle' },
      eyeBallShape: { id: 'diamond', name: 'Diamond', type: 'diamond' }
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    preview: '/template.jpg',
    customization: {
      size: 300,
      margin: 4,
      errorCorrectionLevel: 'H',
      colors: {
        background: '#ffffff',
        foreground: '#374151',
        eyeColor: '#111827',
        frameColor: '#6b7280'
      },
      frame: { id: 'none', name: 'No Frame', type: 'none' },
      bodyShape: { id: 'circle', name: 'Circle', type: 'circle' },
      eyeFrameShape: { id: 'rounded', name: 'Rounded', type: 'rounded' },
      eyeBallShape: { id: 'circle', name: 'Circle', type: 'circle' }
    }
  },
  {
    id: 'corporate',
    name: 'Corporate',
    preview: '/template.jpg',
    customization: {
      size: 300,
      margin: 2,
      errorCorrectionLevel: 'H',
      colors: {
        background: '#f1f5f9',
        foreground: '#0f172a',
        eyeColor: '#1e293b',
        frameColor: '#334155'
      },
      frame: { id: 'square', name: 'Square Frame', type: 'square' },
      bodyShape: { id: 'square', name: 'Square', type: 'square' },
      eyeFrameShape: { id: 'square', name: 'Square', type: 'square' },
      eyeBallShape: { id: 'square', name: 'Square', type: 'square' }
    }
  }
];

export const getTemplateById = (id: string): QRTemplate | undefined => {
  return QR_TEMPLATES.find(template => template.id === id);
};

export const getDefaultAdvancedCustomization = (): QRAdvancedCustomization => {
  return QR_TEMPLATES[0].customization;
};