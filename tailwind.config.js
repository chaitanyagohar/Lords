/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}" 
  ],
  theme: {
    extend: {
      colors: {
        vpsqft: {
          blue: "#2563EB",
          dark: "#0F172A",
          gray: "#F8FAFC",
          text: "#334155",
        }
      },
      fontFamily: {
        // Changed this line to use Poppins!
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}