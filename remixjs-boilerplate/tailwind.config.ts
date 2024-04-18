import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: 'rgba(234, 235, 242, 0.8)',
          light2: 'rgba(249, 249, 252, 0.8)',
          base: 'rgba(40, 58, 129, 1)',
          disable: 'rgba(148, 157, 192, 1)',
        },
        secondary: {
          orange: 'rgba(255, 201, 173, 1)',
          purple: 'rgba(95, 55, 255, 1)',
          blue: 'rgba(186, 234, 255, 1)',
          green: 'rgba(194, 238, 214, 1)',
          yellow: 'rgba(255, 225, 166, 1)',
          red: 'rgba(255, 144, 144, 1)',
        },
        status: {
          progress: 'rgba(42, 133, 255, 1)',
          success: 'rgba(60, 159, 25, 1)',
          error: 'rgba(229, 58, 34, 1)',
          warning: 'rgba(228, 137, 0, 1)',
        },
        neutral: {
          100: "rgba(250, 250, 250, 1)",
          200: "rgba(244, 245, 246, 1)",
          300: "rgba(230, 232, 236, 1)",
          400: "rgba(177, 181, 195, 1)",
          500: "rgba(119, 126, 144, 1)",
          600: "rgba(53, 57, 69, 1)",
          700: "rgba(35, 38, 47, 1)",
          800: "rgba(20, 20, 20, 1)",
        },
      },
      animation: {
        enter: 'enter 200ms ease-out',
        'slide-in': 'slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)',
        leave: 'leave 150ms ease-in forwards',
        'fade-in-forward': 'fade-in-forward 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
      },
      keyframes: {
        enter: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        leave: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'fade-in-forward': {
          '0%': {
            transform: 'translateZ(-80px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateZ(0px)',
            opacity: '1',
          },
        },
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
      },
    },
    fontFamily: {
      sans: ['Bruno Ace, cursive'],
    },
  },
  plugins: [],
} satisfies Config;
