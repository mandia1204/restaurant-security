module.exports = {
    env: {
        browser: false,
        commonjs: true,
        es6: true,
        node: true
    },
    extends: ['eslint:recommended', 'airbnb-base'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: false,
        },
        sourceType: 'module'
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
		'object-curly-newline': 'off',
		'no-underscore-dangle': 'off',
		'func-names': 'off',
		'max-len': ['error', { code: 160 }],
        // 'no-console':'off',
        // 'no-unused-vars':'off'
    }
};