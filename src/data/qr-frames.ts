import { QRFrame } from '../types/qr-templates';

export const QR_FRAMES: QRFrame[] = [
  {
    id: 'none',
    name: 'No Frame',
    type: 'none',
    svg: '',
    description: 'Clean QR code without frame'
  },
  {
    id: 'simple-border',
    name: 'Simple Border',
    type: 'simple',
    svg: `<rect x="0" y="0" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="4" rx="8"/>`,
    description: 'Simple rectangular border'
  },
  {
    id: 'rounded-border',
    name: 'Rounded Border',
    type: 'rounded',
    svg: `<rect x="0" y="0" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="6" rx="20"/>`,
    description: 'Rounded corner border'
  },
  {
    id: 'thick-border',
    name: 'Thick Border',
    type: 'simple',
    svg: `<rect x="0" y="0" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="8" rx="12"/>`,
    description: 'Thick rectangular border'
  },
  {
    id: 'double-border',
    name: 'Double Border',
    type: 'decorative',
    svg: `<rect x="0" y="0" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" rx="8"/>
          <rect x="8" y="8" width="calc(100% - 16px)" height="calc(100% - 16px)" fill="none" stroke="currentColor" stroke-width="2" rx="4"/>`,
    description: 'Double line border'
  },
  {
    id: 'dashed-border',
    name: 'Dashed Border',
    type: 'decorative',
    svg: `<rect x="0" y="0" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="10,5" rx="8"/>`,
    description: 'Dashed line border'
  },
  {
    id: 'dotted-border',
    name: 'Dotted Border',
    type: 'decorative',
    svg: `<rect x="0" y="0" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="2,4" rx="8"/>`,
    description: 'Dotted line border'
  },
  {
    id: 'gradient-border',
    name: 'Gradient Border',
    type: 'decorative',
    svg: `<defs>
            <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:currentColor;stop-opacity:1" />
              <stop offset="100%" style="stop-color:currentColor;stop-opacity:0.5" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="url(#borderGrad)" stroke-width="6" rx="15"/>`,
    description: 'Gradient colored border'
  },
  {
    id: 'scan-me-frame',
    name: 'Scan Me Frame',
    type: 'branded',
    svg: `<rect x="0" y="0" width="100%" height="100%" fill="currentColor" rx="20"/>
          <rect x="10" y="10" width="calc(100% - 20px)" height="calc(100% - 60px)" fill="white" rx="10"/>
          <text x="50%" y="95%" text-anchor="middle" fill="white" font-size="12" font-weight="bold">SCAN ME</text>`,
    description: 'Frame with "Scan Me" text'
  },
  {
    id: 'qr-code-frame',
    name: 'QR Code Frame',
    type: 'branded',
    svg: `<rect x="0" y="0" width="100%" height="100%" fill="currentColor" rx="15"/>
          <rect x="8" y="8" width="calc(100% - 16px)" height="calc(100% - 50px)" fill="white" rx="8"/>
          <text x="50%" y="92%" text-anchor="middle" fill="white" font-size="10" font-weight="bold">QR CODE</text>`,
    description: 'Frame with "QR Code" label'
  },
  {
    id: 'corner-brackets',
    name: 'Corner Brackets',
    type: 'decorative',
    svg: `<path d="M0,20 L0,0 L20,0" stroke="currentColor" stroke-width="4" fill="none"/>
          <path d="M80,0 L100,0 L100,20" stroke="currentColor" stroke-width="4" fill="none"/>
          <path d="M100,80 L100,100 L80,100" stroke="currentColor" stroke-width="4" fill="none"/>
          <path d="M20,100 L0,100 L0,80" stroke="currentColor" stroke-width="4" fill="none"/>`,
    description: 'Corner bracket style frame'
  },
  {
    id: 'tech-frame',
    name: 'Tech Frame',
    type: 'decorative',
    svg: `<rect x="0" y="0" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" rx="5"/>
          <circle cx="10" cy="10" r="3" fill="currentColor"/>
          <circle cx="90" cy="10" r="3" fill="currentColor"/>
          <circle cx="10" cy="90" r="3" fill="currentColor"/>
          <circle cx="90" cy="90" r="3" fill="currentColor"/>
          <rect x="20" y="2" width="60" height="2" fill="currentColor"/>
          <rect x="2" y="20" width="2" height="60" fill="currentColor"/>
          <rect x="96" y="20" width="2" height="60" fill="currentColor"/>
          <rect x="20" y="96" width="60" height="2" fill="currentColor"/>`,
    description: 'Futuristic tech-style frame'
  }
];