/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
        'xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '-0.025em' }],
        '2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.025em' }],
        '3xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.025em' }],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      }
    },
  },
  plugins: [],
};
