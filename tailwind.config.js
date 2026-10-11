/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F6FA',
          100: '#DCE8F2',
          200: '#BDD4E5',
          300: '#94BBD4',
          400: '#649EBE',
          500: '#0B3C5D', // Primary Deep Blue
          600: '#0A3450',
          700: '#08293F',
          800: '#061E2E',
          900: '#04131E',
          950: '#020A10',
          blue: '#0B3C5D',
          'blue-dark': '#07263b',
          'blue-light': '#14537D',
          gold: '#FFB800',
          accent: '#00D26A',
          electric: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'sharp': '3px 3px 0px 0px rgba(0, 0, 0, 1)',
        'sharp-lg': '5px 5px 0px 0px rgba(0, 0, 0, 1)',
        'sharp-sm': '2px 2px 0px 0px rgba(0, 0, 0, 1)',
        'glow-green': '0 0 20px -2px rgba(34, 197, 94, 0.5)',
        'glow-sm': '0 4px 20px -2px rgba(11, 60, 93, 0.25)',
        'glow': '0 10px 30px -5px rgba(11, 60, 93, 0.4)',
        'glow-lg': '0 20px 45px -10px rgba(11, 60, 93, 0.5)',
        'glow-accent': '0 10px 25px -5px rgba(0, 210, 106, 0.35)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
      },
      animation: {
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
