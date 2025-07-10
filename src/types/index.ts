export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  username: string;
  description: string;
  updatedAt: string;
}

export interface QRCode {
  id: string;
  name: string;
  shortCode: string;
  destinationUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QRAnalytics {
  id: string;
  qrCodeId: string;
  ipAddress?: string;
  country?: string;
  city?: string;
  deviceType?: string;
  operatingSystem?: string;
  userAgent?: string;
  scannedAt: string;
}