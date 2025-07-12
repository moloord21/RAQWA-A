import { QREyeShape } from '../types/qr-templates';

export const QR_EYE_SHAPES: QREyeShape[] = [
  {
    id: 'square-square',
    name: 'Square in Square',
    outerShape: 'square',
    innerShape: 'square',
    svg: `<rect x="0" y="0" width="100" height="100" fill="currentColor" rx="0"/>
          <rect x="20" y="20" width="60" height="60" fill="white" rx="0"/>
          <rect x="30" y="30" width="40" height="40" fill="currentColor" rx="0"/>`,
    description: 'Classic square eye with square center'
  },
  {
    id: 'square-circle',
    name: 'Square with Circle',
    outerShape: 'square',
    innerShape: 'circle',
    svg: `<rect x="0" y="0" width="100" height="100" fill="currentColor" rx="0"/>
          <rect x="20" y="20" width="60" height="60" fill="white" rx="0"/>
          <circle cx="50" cy="50" r="20" fill="currentColor"/>`,
    description: 'Square eye with circular center'
  },
  {
    id: 'circle-circle',
    name: 'Circle in Circle',
    outerShape: 'circle',
    innerShape: 'circle',
    svg: `<circle cx="50" cy="50" r="50" fill="currentColor"/>
          <circle cx="50" cy="50" r="30" fill="white"/>
          <circle cx="50" cy="50" r="20" fill="currentColor"/>`,
    description: 'Circular eye with circular center'
  },
  {
    id: 'circle-square',
    name: 'Circle with Square',
    outerShape: 'circle',
    innerShape: 'square',
    svg: `<circle cx="50" cy="50" r="50" fill="currentColor"/>
          <circle cx="50" cy="50" r="30" fill="white"/>
          <rect x="30" y="30" width="40" height="40" fill="currentColor" rx="0"/>`,
    description: 'Circular eye with square center'
  },
  {
    id: 'rounded-square-square',
    name: 'Rounded Square',
    outerShape: 'rounded-square',
    innerShape: 'square',
    svg: `<rect x="0" y="0" width="100" height="100" fill="currentColor" rx="15"/>
          <rect x="20" y="20" width="60" height="60" fill="white" rx="10"/>
          <rect x="30" y="30" width="40" height="40" fill="currentColor" rx="5"/>`,
    description: 'Rounded square eye with square center'
  },
  {
    id: 'rounded-square-circle',
    name: 'Rounded Square with Circle',
    outerShape: 'rounded-square',
    innerShape: 'circle',
    svg: `<rect x="0" y="0" width="100" height="100" fill="currentColor" rx="15"/>
          <rect x="20" y="20" width="60" height="60" fill="white" rx="10"/>
          <circle cx="50" cy="50" r="20" fill="currentColor"/>`,
    description: 'Rounded square eye with circular center'
  },
  {
    id: 'diamond-square',
    name: 'Diamond with Square',
    outerShape: 'diamond',
    innerShape: 'square',
    svg: `<polygon points="50,0 100,50 50,100 0,50" fill="currentColor"/>
          <polygon points="50,20 80,50 50,80 20,50" fill="white"/>
          <rect x="30" y="30" width="40" height="40" fill="currentColor" rx="0"/>`,
    description: 'Diamond-shaped eye with square center'
  },
  {
    id: 'diamond-circle',
    name: 'Diamond with Circle',
    outerShape: 'diamond',
    innerShape: 'circle',
    svg: `<polygon points="50,0 100,50 50,100 0,50" fill="currentColor"/>
          <polygon points="50,20 80,50 50,80 20,50" fill="white"/>
          <circle cx="50" cy="50" r="20" fill="currentColor"/>`,
    description: 'Diamond-shaped eye with circular center'
  },
  {
    id: 'star-circle',
    name: 'Star with Circle',
    outerShape: 'star',
    innerShape: 'circle',
    svg: `<polygon points="50,0 61,35 96,35 68,57 79,91 50,70 21,91 32,57 4,35 39,35" fill="currentColor"/>
          <circle cx="50" cy="50" r="25" fill="white"/>
          <circle cx="50" cy="50" r="15" fill="currentColor"/>`,
    description: 'Star-shaped eye with circular center'
  },
  {
    id: 'hexagon-circle',
    name: 'Hexagon with Circle',
    outerShape: 'diamond',
    innerShape: 'circle',
    svg: `<polygon points="25,7 75,7 100,50 75,93 25,93 0,50" fill="currentColor"/>
          <polygon points="30,20 70,20 85,50 70,80 30,80 15,50" fill="white"/>
          <circle cx="50" cy="50" r="20" fill="currentColor"/>`,
    description: 'Hexagonal eye with circular center'
  },
  {
    id: 'dotted-square',
    name: 'Dotted Square',
    outerShape: 'square',
    innerShape: 'dot',
    svg: `<rect x="0" y="0" width="100" height="100" fill="currentColor" rx="0"/>
          <rect x="20" y="20" width="60" height="60" fill="white" rx="0"/>
          <circle cx="50" cy="50" r="8" fill="currentColor"/>
          <circle cx="35" cy="35" r="3" fill="currentColor"/>
          <circle cx="65" cy="35" r="3" fill="currentColor"/>
          <circle cx="35" cy="65" r="3" fill="currentColor"/>
          <circle cx="65" cy="65" r="3" fill="currentColor"/>`,
    description: 'Square eye with dotted pattern'
  },
  {
    id: 'gradient-circle',
    name: 'Gradient Circle',
    outerShape: 'circle',
    innerShape: 'circle',
    svg: `<defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:currentColor;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:currentColor;stop-opacity:1" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#grad1)"/>
          <circle cx="50" cy="50" r="30" fill="white"/>
          <circle cx="50" cy="50" r="20" fill="currentColor"/>`,
    description: 'Gradient circular eye'
  }
];