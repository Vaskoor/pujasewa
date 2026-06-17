/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#8B5A2B', light: '#C28C50', dark: '#654321', 50: '#FDF8F3', 100: '#F5E6D3', 200: '#E8CCAA', 300: '#D4B274', 400: '#C28C50', 500: '#8B5A2B', 600: '#654321', 700: '#4A3018', 800: '#352210', 900: '#1F1408' },
        secondary: { DEFAULT: '#F5F5F0', light: '#FAFAF8', dark: '#E8E8E0' },
        accent: { DEFAULT: '#D4AF37', light: '#E8D48B', dark: '#B8960C' },
        surface: '#FFFFFF', background: '#FAF9F7', border: '#E6E4E0',
      },
      fontFamily: { sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'], serif: ['Cormorant Garamond', 'Georgia', 'serif'] },
      fontSize: { 'xs': ['0.75rem', { lineHeight: '1.5' }], 'sm': ['0.875rem', { lineHeight: '1.6' }], 'base': ['1rem', { lineHeight: '1.7' }], 'lg': ['1.125rem', { lineHeight: '1.6' }], 'xl': ['1.25rem', { lineHeight: '1.5' }], '2xl': ['1.5rem', { lineHeight: '1.3' }], '3xl': ['1.875rem', { lineHeight: '1.2' }], '4xl': ['2.25rem', { lineHeight: '1.1' }], '5xl': ['3rem', { lineHeight: '1.1' }], '6xl': ['3.75rem', { lineHeight: '1' }] },
      borderRadius: { 'xl': '1rem', '2xl': '1.5rem', '3xl': '2rem' },
      boxShadow: { 'soft': '0 2px 15px rgba(0,0,0,0.04)', 'medium': '0 4px 20px rgba(0,0,0,0.06)', 'large': '0 8px 30px rgba(0,0,0,0.08)', 'glow': '0 0 20px rgba(139,90,43,0.15)' },
      animation: { 'fade-in': 'fadeIn 0.5s ease-out forwards', 'slide-up': 'slideUp 0.5s ease-out forwards' },
      keyframes: { fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } }, slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } } },
    },
    screens: { 'xs': '475px', 'sm': '640px', 'md': '768px', 'lg': '1024px', 'xl': '1280px', '2xl': '1536px' },
  },
  plugins: [],
}
