const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Bungee', 'sans-serif'],
			},
			colors: {
				red: {
					300: '#FF7BAB',
					500: '#D83333',
				},
				blue: {
					300: '#AAC7FF',
					500: '#426AF5',
				},
			},
			dropShadow: {
				px: '0 1px 1px rgba(0, 0, 0, 1)',
			},
		},
	},

	plugins: [],
};

module.exports = config;
