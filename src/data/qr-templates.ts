import { QRTemplate } from '../types/qr-templates';
import { QR_PATTERNS } from './qr-patterns';
import { QR_EYE_SHAPES } from './qr-eye-shapes';
import { QR_FRAMES } from './qr-frames';

export const QR_TEMPLATES: QRTemplate[] = [
  {
    id: 'classic-business',
    name: 'Classic Business',
    category: 'business',
    preview: 'classic-business-preview',
    pattern: QR_PATTERNS[0], // classic-squares
    eyeShape: QR_EYE_SHAPES[0], // square-square
    frame: QR_FRAMES[1], // simple-border
    colors: {
      foreground: '#000000',
      background: '#FFFFFF',
      eyeColor: '#000000',
      frameColor: '#333333'
    },
    description: 'Professional black and white design'
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'minimal',
    preview: 'modern-minimal-preview',
    pattern: QR_PATTERNS[1], // dots
    eyeShape: QR_EYE_SHAPES[2], // circle-circle
    frame: QR_FRAMES[2], // rounded-border
    colors: {
      foreground: '#2563eb',
      background: '#f8fafc',
      eyeColor: '#1e40af',
      frameColor: '#3b82f6'
    },
    description: 'Clean blue minimal design'
  },
  {
    id: 'creative-gradient',
    name: 'Creative Gradient',
    category: 'creative',
    preview: 'creative-gradient-preview',
    pattern: QR_PATTERNS[2], // rounded-squares
    eyeShape: QR_EYE_SHAPES[11], // gradient-circle
    frame: QR_FRAMES[7], // gradient-border
    colors: {
      foreground: '#ec4899',
      background: '#fdf2f8',
      eyeColor: '#be185d',
      frameColor: '#f472b6'
    },
    description: 'Vibrant gradient design'
  },
  {
    id: 'social-media',
    name: 'Social Media',
    category: 'social',
    preview: 'social-media-preview',
    pattern: QR_PATTERNS[6], // cross-pattern
    eyeShape: QR_EYE_SHAPES[4], // rounded-square-square
    frame: QR_FRAMES[8], // scan-me-frame
    colors: {
      foreground: '#7c3aed',
      background: '#ffffff',
      eyeColor: '#5b21b6',
      frameColor: '#8b5cf6'
    },
    description: 'Perfect for social media sharing'
  },
  {
    id: 'event-ticket',
    name: 'Event Ticket',
    category: 'event',
    preview: 'event-ticket-preview',
    pattern: QR_PATTERNS[3], // vertical-lines
    eyeShape: QR_EYE_SHAPES[6], // diamond-square
    frame: QR_FRAMES[4], // double-border
    colors: {
      foreground: '#dc2626',
      background: '#fef2f2',
      eyeColor: '#991b1b',
      frameColor: '#ef4444'
    },
    description: 'Eye-catching event design'
  },
  {
    id: 'tech-startup',
    name: 'Tech Startup',
    category: 'business',
    preview: 'tech-startup-preview',
    pattern: QR_PATTERNS[7], // diamond-pattern
    eyeShape: QR_EYE_SHAPES[9], // hexagon-circle
    frame: QR_FRAMES[11], // tech-frame
    colors: {
      foreground: '#059669',
      background: '#f0fdf4',
      eyeColor: '#047857',
      frameColor: '#10b981'
    },
    description: 'Modern tech-inspired design'
  },
  {
    id: 'luxury-brand',
    name: 'Luxury Brand',
    category: 'business',
    preview: 'luxury-brand-preview',
    pattern: QR_PATTERNS[8], // hexagon-pattern
    eyeShape: QR_EYE_SHAPES[7], // diamond-circle
    frame: QR_FRAMES[3], // thick-border
    colors: {
      foreground: '#92400e',
      background: '#fffbeb',
      eyeColor: '#78350f',
      frameColor: '#d97706'
    },
    description: 'Elegant luxury design'
  },
  {
    id: 'playful-dots',
    name: 'Playful Dots',
    category: 'creative',
    preview: 'playful-dots-preview',
    pattern: QR_PATTERNS[1], // dots
    eyeShape: QR_EYE_SHAPES[10], // dotted-square
    frame: QR_FRAMES[6], // dotted-border
    colors: {
      foreground: '#ea580c',
      background: '#fff7ed',
      eyeColor: '#c2410c',
      frameColor: '#fb923c'
    },
    description: 'Fun dotted pattern design'
  },
  {
    id: 'heart-love',
    name: 'Heart & Love',
    category: 'creative',
    preview: 'heart-love-preview',
    pattern: QR_PATTERNS[10], // heart-pattern
    eyeShape: QR_EYE_SHAPES[5], // rounded-square-circle
    frame: QR_FRAMES[2], // rounded-border
    colors: {
      foreground: '#e11d48',
      background: '#fdf2f8',
      eyeColor: '#be123c',
      frameColor: '#f43f5e'
    },
    description: 'Romantic heart-themed design'
  },
  {
    id: 'star-premium',
    name: 'Star Premium',
    category: 'decorative',
    preview: 'star-premium-preview',
    pattern: QR_PATTERNS[9], // star-pattern
    eyeShape: QR_EYE_SHAPES[8], // star-circle
    frame: QR_FRAMES[10], // corner-brackets
    colors: {
      foreground: '#7c2d12',
      background: '#fefce8',
      eyeColor: '#a16207',
      frameColor: '#eab308'
    },
    description: 'Premium star-themed design'
  },
  {
    id: 'minimalist-white',
    name: 'Minimalist White',
    category: 'minimal',
    preview: 'minimalist-white-preview',
    pattern: QR_PATTERNS[0], // classic-squares
    eyeShape: QR_EYE_SHAPES[1], // square-circle
    frame: QR_FRAMES[0], // none
    colors: {
      foreground: '#374151',
      background: '#ffffff',
      eyeColor: '#1f2937',
      frameColor: '#6b7280'
    },
    description: 'Ultra-clean minimalist design'
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    category: 'creative',
    preview: 'neon-cyber-preview',
    pattern: QR_PATTERNS[4], // horizontal-lines
    eyeShape: QR_EYE_SHAPES[3], // circle-square
    frame: QR_FRAMES[11], // tech-frame
    colors: {
      foreground: '#06b6d4',
      background: '#0f172a',
      eyeColor: '#0891b2',
      frameColor: '#22d3ee'
    },
    description: 'Futuristic neon cyber design'
  }
];