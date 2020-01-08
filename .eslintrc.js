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
		"@typescript-eslint/explicit-function-return-type": "off",
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
		'object-curly-newline': 'off',
		'no-underscore-dangle': 'off',
		'func-names': 'off',
		'max-len': ['error', { code: 160 }],
        // 'no-console':'off',
        // 'no-unused-vars':'off'
	},
	overrides:[
		{
			"files": ["*.ts"],
			"rules": {
				"@typescript-eslint/explicit-function-return-type": ["error"]
			}
		}
	]
};
