/* eslint-env node */

const config = {
	src: './src',
	language: 'typescript',
	schema: './src/graphql/schema.graphql',
	exclude: [
		'**/node_modules/**',
		'**/__mocks__/**',
		'**/__generated__/**',
		'**/data/**',
	],
};

export default config;
