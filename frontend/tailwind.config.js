/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bordeaux: {
          50: '#faf2f3',
          100: '#f4e3e6',
          200: '#eacace',
          300: '#dba5ad',
          400: '#c57482',
          500: '#aa4d5e',
          600: '#8c2c40',
          700: '#6f1d2e',
          800: '#541221', // Teinte exacte des pétales de la fleur du logo
          900: '#3c0a15',
          950: '#26040c',
        },
        blush: {
          50: '#faf2f3',
          100: '#f4e3e6',
          200: '#eacace',
          300: '#dba5ad',
          400: '#c57482',
          500: '#aa4d5e',
          600: '#8c2c40',
          700: '#6f1d2e',
          800: '#541221',
          900: '#3c0a15',
        },
        gold: {
          50: '#fcfaf5',
          100: '#f7f2e5',
          200: '#ede2ca',
          300: '#dfcca5',
          400: '#ceb17b',
          500: '#b89456',
          600: '#9b763e',
          700: '#7d592e',
          800: '#674626',
          900: '#553921',
        },
        cream: {
          50: '#faf8f4',
          100: '#f5efe5',
          200: '#ece5d5', // Teinte exacte du médaillon beige du logo
          300: '#dfd6c2',
          400: '#cdbfab',
          500: '#b8a68f',
        },
        luxe: {
          black: '#1a1415',   // Noir chaleureux inspiré de la tige du logo
          charcoal: '#2b2123',
          bordeaux: '#541221',
          muted: '#6f6364',
          border: '#ece4d6',
          card: '#ffffff'
        }
      },
      fontFamily: {
        serif: ['"Amiri"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Cairo"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(184, 138, 68, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'luxe': '0 20px 40px -15px rgba(45, 41, 38, 0.08)',
        'glow': '0 0 25px rgba(204, 165, 106, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-subtle': 'pulseSubtle 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.92' },
        }
      }
    },
  },
  plugins: [],
}
