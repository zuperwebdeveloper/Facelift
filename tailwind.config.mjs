/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'Jakarta': ['Plus Jakarta Sans'],
			'Inter': ['Inter']
		},
		extend: {
			width: {
				'3/10': '30%',
				'7/10': '70%',
			}
		},

	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}
