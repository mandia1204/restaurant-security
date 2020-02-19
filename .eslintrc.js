module.exports = {
    env: {
        browser: false,
        commonjs: true,
        es6: true,
        node: true
    },
    extends: ['eslint:recommended', 'airbnb-base', 'plugin:@typescript-eslint/recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: false,
        },
        sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint',
    'import',
	],
	settings: {
		'import/parsers': {
		  '@typescript-eslint/parser': ['.ts'],
		},
		'import/resolver': {
		  // use <root>/tsconfig.json
		  typescript: {},
		},
	},
    rules: {
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ],
		'linebreak-style': ['error', 'unix'],
		'max-len': ['error', { 'code': 125 }],
		"no-useless-constructor": "off",
		'@typescript-eslint/indent': ['error', 2],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/camelcase': 'off',
		"@typescript-eslint/no-useless-constructor": "error",
		'object-curly-newline': 'off',
		'no-underscore-dangle': 'off',
		'func-names': 'off',
		'max-len': ['error', { code: 160 }],
		"import/extensions": ["error", "never", { "svg": "always" }]
        // 'no-console':'off',
        // 'no-unused-vars':'off'
	},
	globals: {
		"Record": "readonly"
	},
	overrides:[
		{
			files: ['src/grpc-services/*.d.ts'],
			parser: '@typescript-eslint/parser',
		},
	]
};
