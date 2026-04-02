/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        platinum: '#E5E4E2',
        silver: '#C0C0C0',
        gold: {
          DEFAULT: '#D4AF37',
          light: '#FFD700',
        },
        purpleDark: '#1A237E', // deep indigo
        purple: '#512DA8',     // main purple
        purpleLight: '#B39DDB', // light purple
        purpleBg: '#F3F0FF',   // very light purple
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Orbitron', 'sans-serif'],
        body: ['Inter', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        goldGlow: '0 0 16px 2px #FFD70099',
        silverGlow: '0 0 12px 2px #C0C0C099',
      },
      backgroundImage: {
        goldGradient: 'linear-gradient(90deg, #D4AF37 0%, #FFD700 100%)',
        purpleBanner: 'linear-gradient(90deg, #512DA8 0%, #B39DDB 100%)',
      },
      borderColor: {
        gold: '#D4AF37',
      },
      divideColor: {
        gold: '#D4AF37',
      },
      opacity: {
        15: '0.15',
      },
    },
  },
  plugins: [],
};
