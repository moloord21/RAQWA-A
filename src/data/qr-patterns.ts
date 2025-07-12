import { QRPattern } from '../types/qr-templates';

export const QR_PATTERNS: QRPattern[] = [
  {
    id: 'classic-squares',
    name: 'Classic Squares',
    type: 'squares',
    description: 'Traditional square pattern'
  },
  {
    id: 'dots',
    name: 'Dots',
    type: 'dots',
    description: 'Circular dots pattern'
  },
  {
    id: 'rounded-squares',
    name: 'Rounded Squares',
    type: 'rounded',
    description: 'Squares with rounded corners'
  },
  {
    id: 'vertical-lines',
    name: 'Vertical Lines',
    type: 'custom',
    description: 'Vertical line pattern'
  },
  {
    id: 'horizontal-lines',
    name: 'Horizontal Lines',
    type: 'custom',
    description: 'Horizontal line pattern'
  },
  {
    id: 'diagonal-lines',
    name: 'Diagonal Lines',
    type: 'custom',
    description: 'Diagonal line pattern'
  },
  {
    id: 'cross-pattern',
    name: 'Cross Pattern',
    type: 'custom',
    description: 'Cross-shaped elements'
  },
  {
    id: 'diamond-pattern',
    name: 'Diamond Pattern',
    type: 'custom',
    description: 'Diamond-shaped elements'
  },
  {
    id: 'hexagon-pattern',
    name: 'Hexagon Pattern',
    type: 'custom',
    description: 'Hexagonal elements'
  },
  {
    id: 'star-pattern',
    name: 'Star Pattern',
    type: 'custom',
    description: 'Star-shaped elements'
  },
  {
    id: 'heart-pattern',
    name: 'Heart Pattern',
    type: 'custom',
    description: 'Heart-shaped elements'
  },
  {
    id: 'triangle-pattern',
    name: 'Triangle Pattern',
    type: 'custom',
    description: 'Triangular elements'
  }
];