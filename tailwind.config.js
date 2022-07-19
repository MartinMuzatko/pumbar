const defaultTheme = require('tailwindcss/defaultTheme')
// tailwind.config.js
module.exports = {
	darkMode: 'class',
	content: ['{pages,app}/**/*.{js,ts,jsx,tsx}'],
	safelist: [
		'dark:bg-yellow-bg-dark/100', 'w-1/3', 'w-1/2', 'w-full',
		'text-gray-400', 'bg-gray-400', 'text-green-400', 'bg-green-400',
		'text-orange-400', 'bg-orange-400', 'text-lime-400', 'bg-lime-400',
		'text-blue-400', 'bg-blue-400', 'text-red-400', 'bg-red-400',
		'text-violet-400', 'bg-violet-400'
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '0rem',
				sm: '2rem',
				lg: '0.5rem',
				xl: '5rem',
				'2xl': '9rem',
			},
		},
		extend: {
			maxWidth: defaultTheme.width,
			colors: {
				'yellow-400': '#FECC00',
				'yellow-bg': 'hsla(44,66%,93%,.6)',
				'yellow-bg-dark': 'hsla(44,3%,17%,.9)',
				'yellow-bg/100': 'hsla(44,66%,93%,1)',
				'yellow-bg-dark/100': 'hsla(44,3%,17%,1)',
				'yellow-bg-light': 'hsla(46,96%,91%,.6)',
			},
			typography: {
				DEFAULT: {
					css: {
						color: '#000',
					},
				},
			},
			boxShadow: {
				'top': '0.2em -0.1em 0.2em #00000024'
			}
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
