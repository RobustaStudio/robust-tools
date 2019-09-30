module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'jasmine': true
	},
	'extends': [
		'eslint:recommended',
		'prettier'
	],
	'plugins': [
		'prettier'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'prettier/prettier': 2
	}
};
