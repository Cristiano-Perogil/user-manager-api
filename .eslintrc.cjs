module.exports = {
    env: { browser: true, es2020: true, node: true, jest: true },
    extends: [
        'eslint:recommended',
        'plugin:jest/recommended'
    ],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: ['jest'],
    settings: {
        jest: {
            version: 'global',
        },
    },
    rules: {
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        'no-case-declarations': 'off'
    },
};
