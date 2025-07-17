import QRCodeLib from 'qrcode';
import { QRAdvancedCustomization } from '../types';

export class AdvancedQRGenerator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private customization: QRAdvancedCustomization;
  private qrData: string;

  constructor(qrData: string, customization: QRAdvancedCustomization) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.customization = customization;
    this.qrData = qrData;
  }

  async generate(): Promise<string> {
    // Generate base QR code data
    const qrArray = await this.generateQRArray();
    
    // Set canvas size
    const size = this.customization.size;
    this.canvas.width = size;
    this.canvas.height = size;
    
    // Clear canvas
    this.ctx.fillStyle = this.customization.colors.background;
    this.ctx.fillRect(0, 0, size, size);
    
    // Draw frame if enabled
    if (this.customization.frame.type !== 'none') {
      this.drawFrame();
    }
    
    // Calculate module size and offset
    const moduleCount = qrArray.length;
    const moduleSize = (size - (this.customization.margin * 2)) / moduleCount;
    const offset = this.customization.margin;
    
    // Draw QR modules
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (qrArray[row][col]) {
          const x = offset + col * moduleSize;
          const y = offset + row * moduleSize;
          
          // Check if this is an eye pattern
          if (this.isEyePattern(row, col, moduleCount)) {
            this.drawEye(x, y, moduleSize, row, col, moduleCount);
          } else {
            this.drawModule(x, y, moduleSize);
          }
        }
      }
    }
    
    return this.canvas.toDataURL('image/png', 0.92);
  }

  private async generateQRArray(): Promise<boolean[][]> {
    // Generate QR code using qrcode library to get the data array
    const qrCanvas = document.createElement('canvas');
    await QRCodeLib.toCanvas(qrCanvas, this.qrData, {
      width: 200,
      margin: 0,
      errorCorrectionLevel: this.customization.errorCorrectionLevel,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    
    // Extract pixel data to create boolean array
    const ctx = qrCanvas.getContext('2d')!;
    const imageData = ctx.getImageData(0, 0, qrCanvas.width, qrCanvas.height);
    const data = imageData.data;
    
    // Calculate module count (assuming square QR code)
    const moduleCount = Math.sqrt(qrCanvas.width * qrCanvas.height / (data.length / 4));
    const actualModuleCount = Math.round(Math.sqrt(qrCanvas.width * qrCanvas.height / (qrCanvas.width * qrCanvas.height / moduleCount)));
    
    // Create boolean array
    const qrArray: boolean[][] = [];
    const pixelsPerModule = qrCanvas.width / actualModuleCount;
    
    for (let row = 0; row < actualModuleCount; row++) {
      qrArray[row] = [];
      for (let col = 0; col < actualModuleCount; col++) {
        const x = Math.floor(col * pixelsPerModule);
        const y = Math.floor(row * pixelsPerModule);
        const pixelIndex = (y * qrCanvas.width + x) * 4;
        
        // Check if pixel is dark (QR module is present)
        const isDark = data[pixelIndex] < 128; // R value < 128 means dark
        qrArray[row][col] = isDark;
      }
    }
    
    return qrArray;
  }

  private drawFrame(): void {
    const size = this.customization.size;
    const frameWidth = 8;
    
    this.ctx.strokeStyle = this.customization.colors.frameColor;
    this.ctx.lineWidth = frameWidth;
    
    switch (this.customization.frame.type) {
      case 'square':
        this.ctx.strokeRect(frameWidth / 2, frameWidth / 2, size - frameWidth, size - frameWidth);
        break;
      case 'rounded':
        this.drawRoundedRect(frameWidth / 2, frameWidth / 2, size - frameWidth, size - frameWidth, 20);
        break;
      case 'circle':
        this.ctx.beginPath();
        this.ctx.arc(size / 2, size / 2, (size - frameWidth) / 2, 0, 2 * Math.PI);
        this.ctx.stroke();
        break;
    }
  }

  private drawModule(x: number, y: number, size: number): void {
    this.ctx.fillStyle = this.customization.colors.foreground;
    
    switch (this.customization.bodyShape.type) {
      case 'square':
        this.ctx.fillRect(x, y, size, size);
        break;
      case 'circle':
        this.ctx.beginPath();
        this.ctx.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI);
        this.ctx.fill();
        break;
      case 'rounded':
        this.fillRoundedRect(x, y, size, size, size * 0.2);
        break;
      case 'diamond':
        this.ctx.beginPath();
        this.ctx.moveTo(x + size / 2, y);
        this.ctx.lineTo(x + size, y + size / 2);
        this.ctx.lineTo(x + size / 2, y + size);
        this.ctx.lineTo(x, y + size / 2);
        this.ctx.closePath();
        this.ctx.fill();
        break;
    }
  }

  private drawEye(x: number, y: number, moduleSize: number, row: number, col: number, moduleCount: number): void {
    const eyeSize = moduleSize * 7; // Eye patterns are 7x7
    
    // Determine which eye this is
    const isTopLeft = row < 9 && col < 9;
    const isTopRight = row < 9 && col >= moduleCount - 9;
    const isBottomLeft = row >= moduleCount - 9 && col < 9;
    
    if (isTopLeft || isTopRight || isBottomLeft) {
      // Calculate eye position
      let eyeX = x;
      let eyeY = y;
      
      if (isTopLeft) {
        eyeX = this.customization.margin;
        eyeY = this.customization.margin;
      } else if (isTopRight) {
        eyeX = this.customization.margin + (moduleCount - 7) * moduleSize;
        eyeY = this.customization.margin;
      } else if (isBottomLeft) {
        eyeX = this.customization.margin;
        eyeY = this.customization.margin + (moduleCount - 7) * moduleSize;
      }
      
      // Only draw the eye once per eye pattern
      if ((isTopLeft && row === 0 && col === 0) ||
          (isTopRight && row === 0 && col === moduleCount - 7) ||
          (isBottomLeft && row === moduleCount - 7 && col === 0)) {
        this.drawEyePattern(eyeX, eyeY, eyeSize);
      }
    } else {
      // Regular module
      this.drawModule(x, y, moduleSize);
    }
  }

  private drawEyePattern(x: number, y: number, size: number): void {
    const outerSize = size;
    const innerSize = size * 0.43; // Inner eye is about 3/7 of outer
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    
    // Draw outer eye frame
    this.ctx.fillStyle = this.customization.colors.eyeColor;
    this.drawEyeShape(x, y, outerSize, this.customization.eyeFrameShape.type);
    
    // Draw inner background (cut out)
    this.ctx.fillStyle = this.customization.colors.background;
    this.drawEyeShape(centerX - innerSize / 2, centerY - innerSize / 2, innerSize, this.customization.eyeFrameShape.type);
    
    // Draw inner eye ball
    const ballSize = innerSize * 0.6;
    this.ctx.fillStyle = this.customization.colors.eyeColor;
    this.drawEyeShape(centerX - ballSize / 2, centerY - ballSize / 2, ballSize, this.customization.eyeBallShape.type);
  }

  private drawEyeShape(x: number, y: number, size: number, shape: string): void {
    switch (shape) {
      case 'square':
        this.ctx.fillRect(x, y, size, size);
        break;
      case 'circle':
        this.ctx.beginPath();
        this.ctx.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI);
        this.ctx.fill();
        break;
      case 'rounded':
        this.fillRoundedRect(x, y, size, size, size * 0.15);
        break;
      case 'diamond':
        this.ctx.beginPath();
        this.ctx.moveTo(x + size / 2, y);
        this.ctx.lineTo(x + size, y + size / 2);
        this.ctx.lineTo(x + size / 2, y + size);
        this.ctx.lineTo(x, y + size / 2);
        this.ctx.closePath();
        this.ctx.fill();
        break;
    }
  }

  private isEyePattern(row: number, col: number, moduleCount: number): boolean {
    // Top-left eye
    if (row < 9 && col < 9) return true;
    // Top-right eye
    if (row < 9 && col >= moduleCount - 9) return true;
    // Bottom-left eye
    if (row >= moduleCount - 9 && col < 9) return true;
    
    return false;
  }

  private drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  private fillRoundedRect(x: number, y: number, width: number, height: number, radius: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
    this.ctx.fill();
  }
}