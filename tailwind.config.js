/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		fontFamily: {
			primary: ['Inter', 'sans-serif'],
			secondary: ['Roboto', 'sans-serif'],
		},
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
