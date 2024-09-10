module.exports = [
    {
        ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
    },
    {
        files: ['src/**/*.{js,ts,jsx,tsx}'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
        },
        plugins: {
            node: require('eslint-plugin-node'),
            promise: require('eslint-plugin-promise'),
            import: require('eslint-plugin-import'),
            asyncAwait: require('eslint-plugin-async-await'),
        },
        rules: {
            'node/no-unsupported-features/es-syntax': [
                'error',
                { ignores: ['modules'] },
            ],
            'promise/always-return': 'warn',
            'promise/no-return-wrap': 'error',
            'promise/param-names': 'error',
            'promise/catch-or-return': 'warn',
            'promise/no-promise-in-callback': 'warn',
            'promise/no-callback-in-promise': 'warn',
            'promise/avoid-new': 'warn',
            'import/no-unresolved': 'off',
            'import/no-extraneous-dependencies': 'off',
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    'alphabetize': { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    },
];
