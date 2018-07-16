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
        'linebreak-style': ['error', 'windows']
        // 'no-console':'off',
        // 'no-unused-vars':'off'
    }
};