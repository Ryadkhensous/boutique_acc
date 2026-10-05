/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fdf8f7',
          100: '#faefe9',
          200: '#f5ded4',
          300: '#ecc5b5',
          400: '#dfa28d',
          500: '#cf7b61',
          600: '#b85f46',
          700: '#994c36',
          800: '#7e3f2e',
          900: '#673629',
        },
        gold: {
          50: '#fbf9f2',
          100: '#f5f0e0',
          200: '#ecdec1',
          300: '#dfc597',
          400: '#cca56a',
          500: '#b88a44',
          600: '#9e6e34',
          700: '#7d522a',
          800: '#674227',
          900: '#563723',
        },
        cream: {
          50: '#fdfbf7',
          100: '#f9f6ef',
          200: '#f2ece0',
          300: '#e8ddc9',
        },
        luxe: {
          black: '#171514',
          charcoal: '#2d2926',
          muted: '#6f6964',
          border: '#e8e4dc',
          card: '#ffffff'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
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
