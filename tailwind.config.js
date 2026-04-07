/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './config/**/*.{js,ts}'],
  theme: {
    extend: {
      colors: {
        surface: '#111827',
        surface2: '#0B0B1A',
        brand: '#7C3AED',
        brandLight: '#38BDF8',
        gold: '#D4AF37',
        slate: {
          950: '#020617',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Orbitron', 'sans-serif'],
        body: ['Inter', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 24px 80px rgba(59, 130, 246, 0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
