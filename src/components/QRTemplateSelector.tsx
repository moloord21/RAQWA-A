import React from 'react';
import { QRCustomization } from '../types';

interface QRTemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (template: string, customization: Partial<QRCustomization>) => void;
}

const QR_TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic',
    preview: '⬛⬜⬛⬜⬛\n⬜⬛⬜⬛⬜\n⬛⬜⬛⬜⬛',
    customization: {
      dotStyle: 'square' as const,
      cornerStyle: 'square' as const,
      backgroundStyle: 'square' as const,
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF'
    }
  },
  {
    id: 'rounded',
    name: 'Rounded',
    preview: '●○●○●\n○●○●○\n●○●○●',
    customization: {
      dotStyle: 'rounded' as const,
      cornerStyle: 'extra-rounded' as const,
      backgroundStyle: 'square' as const,
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF'
    }
  },
  {
    id: 'dots',
    name: 'Dots',
    preview: '●○●○●\n○●○●○\n●○●○●',
    customization: {
      dotStyle: 'dots' as const,
      cornerStyle: 'dot' as const,
      backgroundStyle: 'square' as const,
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF'
    }
  },
  {
    id: 'circular',
    name: 'Circular',
    preview: '●○●○●\n○●○●○\n●○●○●',
    customization: {
      dotStyle: 'dots' as const,
      cornerStyle: 'extra-rounded' as const,
      backgroundStyle: 'circle' as const,
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF'
    }
  },
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    preview: '●○●○●\n○●○●○\n●○●○●',
    customization: {
      dotStyle: 'rounded' as const,
      cornerStyle: 'extra-rounded' as const,
      backgroundStyle: 'square' as const,
      foregroundColor: '#3B82F6',
      backgroundColor: '#F8FAFC'
    }
  },
  {
    id: 'gradient-pink',
    name: 'Pink Style',
    preview: '●○●○●\n○●○●○\n●○●○●',
    customization: {
      dotStyle: 'rounded' as const,
      cornerStyle: 'extra-rounded' as const,
      backgroundStyle: 'square' as const,
      foregroundColor: '#EC4899',
      backgroundColor: '#FDF2F8'
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    preview: '⬛⬜⬛⬜⬛\n⬜⬛⬜⬛⬜\n⬛⬜⬛⬜⬛',
    customization: {
      dotStyle: 'square' as const,
      cornerStyle: 'square' as const,
      backgroundStyle: 'square' as const,
      foregroundColor: '#1F2937',
      backgroundColor: '#F9FAFB'
    }
  },
  {
    id: 'creative-green',
    name: 'Creative Green',
    preview: '●○●○●\n○●○●○\n●○●○●',
    customization: {
      dotStyle: 'dots' as const,
      cornerStyle: 'dot' as const,
      backgroundStyle: 'square' as const,
      foregroundColor: '#10B981',
      backgroundColor: '#ECFDF5'
    }
  },
  {
    id: 'elegant-purple',
    name: 'Elegant Purple',
    preview: '●○●○●\n○●○●○\n●○●○●',
    customization: {
      dotStyle: 'rounded' as const,
      cornerStyle: 'extra-rounded' as const,
      backgroundStyle: 'circle' as const,
      foregroundColor: '#8B5CF6',
      backgroundColor: '#FAF5FF'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    preview: '⬛⬜⬛⬜⬛\n⬜⬛⬜⬛⬜\n⬛⬜⬛⬜⬛',
    customization: {
      dotStyle: 'square' as const,
      cornerStyle: 'square' as const,
      backgroundStyle: 'square' as const,
      foregroundColor: '#374151',
      backgroundColor: '#FFFFFF'
    }
  }
];

export const QRTemplateSelector: React.FC<QRTemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateSelect
}) => {
  return (
    <div className="space-y-4">
      <h4 className="text-base md:text-lg font-semibold text-gray-800">Select a Template</h4>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {QR_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template.id, template.customization)}
            className={`relative p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
              selectedTemplate === template.id
                ? 'border-pink-500 bg-pink-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {/* Template Preview */}
            <div className="aspect-square mb-2 flex items-center justify-center">
              <div 
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs leading-none ${
                  template.customization.backgroundStyle === 'circle' ? 'rounded-full' : 'rounded-lg'
                }`}
                style={{ 
                  backgroundColor: template.customization.backgroundColor,
                  border: `1px solid ${template.customization.foregroundColor}20`
                }}
              >
                <div 
                  className="grid grid-cols-5 gap-px text-xs"
                  style={{ color: template.customization.foregroundColor }}
                >
                  {template.preview.split('\n').map((row, i) => (
                    <div key={i} className="contents">
                      {row.split('').map((char, j) => (
                        <div
                          key={j}
                          className={`w-1 h-1 ${
                            char === '⬛' || char === '●' 
                              ? 'bg-current' 
                              : 'bg-transparent'
                          } ${
                            template.customization.dotStyle === 'rounded' || template.customization.dotStyle === 'dots'
                              ? 'rounded-full'
                              : 'rounded-none'
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Template Name */}
            <p className={`text-xs font-medium text-center ${
              selectedTemplate === template.id ? 'text-pink-600' : 'text-gray-700'
            }`}>
              {template.name}
            </p>
            
            {/* Selected Indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 text-center">
        Choose a template to get started, then customize colors, size, and add your logo
      </p>
    </div>
  );
};