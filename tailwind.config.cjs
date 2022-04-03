const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
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
		},
	},

	plugins: [],
};

module.exports = config;
