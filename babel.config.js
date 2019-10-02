module.exports = (api) => {
	api.cache(true);

	return {
		presets: [
			[
				'@babel/env',
				{
					useBuiltIns: 'usage',
				},
			],
		],
		env: {
			build: {
				ignore: [
					'**/*.test.tsx',
					'**/*.test.ts',
					'**/*.story.tsx',
					'__snapshots__',
					'__tests__',
					'__stories__',
				],
			},
		},
		ignore: ['node_modules'],
	};
};
