/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        marine: {
          50: '#f0fdff',
          100: '#ccfbff',
          200: '#99f6ff',
          300: '#66f0ff',
          400: '#33eaff',
          500: '#00e4ff',
          600: '#0ea5e9',
          700: '#0284c7',
          800: '#075985',
          900: '#0c4a6e',
        },
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        deep: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        neon: {
          blue: '#00f5ff',
          aqua: '#00ffff',
          electric: '#00e4ff',
          glow: '#66f0ff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out infinite 1s',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'wave': 'wave 4s ease-in-out infinite',
        'bubble': 'bubble 6s ease-in-out infinite',
        'tilt': 'tilt 10s infinite linear',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'ripple': 'ripple 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 228, 255, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 228, 255, 0.6)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        bubble: {
          '0%': { transform: 'translateY(0px) scale(1)', opacity: '0.7' },
          '50%': { transform: 'translateY(-20px) scale(1.1)', opacity: '1' },
          '100%': { transform: 'translateY(0px) scale(1)', opacity: '0.7' },
        },
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'ocean-gradient': 'linear-gradient(135deg, #004E92 0%, #000428 100%)',
        'deep-ocean': 'linear-gradient(180deg, #000428 0%, #004E92 50%, #000C40 100%)',
        'aurora': 'linear-gradient(45deg, #004E92, #009FDF, #00D4FF, #66F0FF)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 15px 35px 0 rgba(31, 38, 135, 0.4)',
        'neon': '0 0 20px rgba(0, 228, 255, 0.5)',
        'neon-lg': '0 0 40px rgba(0, 228, 255, 0.6)',
        'glow-sm': '0 0 10px rgba(102, 240, 255, 0.4)',
        'glow': '0 0 20px rgba(102, 240, 255, 0.5)',
        'glow-lg': '0 0 40px rgba(102, 240, 255, 0.6)',
        'floating': '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
      },
      blur: {
        xs: '2px',
        '4xl': '72px',
      }
    },
  },
  plugins: [],
}