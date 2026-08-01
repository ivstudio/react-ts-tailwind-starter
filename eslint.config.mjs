import pluginJs from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        ignores: [
            '.config/*',
            'webpack/*',
            'dist/*',
            'coverage/*',
            'node_modules',
        ],
    },
    {
        languageOptions: {
            globals: globals.browser,
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    presets: [
                        '@babel/preset-react',
                        '@babel/preset-typescript',
                    ],
                },
            },
        },
    },
    pluginJs.configs.recommended,
    eslintConfigPrettier,
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            'no-undef': 'off',
            'no-unused-vars': 'off',
            'no-redeclare': 'off',
        },
    },
    {
        files: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
        languageOptions: {
            globals: globals.jest,
        },
    },
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^react'],
                        // third-party imports
                        ['^@?\\w'],
                        // absolute imports
                        ['^'],
                        // relative imports
                        ['^\\.'],
                        // styles and types
                        ['^(styles|types)(/.*|$)'],
                        // CSS imports
                        ['^.+\\.css$'],
                    ],
                },
            ],
        },
    },
    {
        rules: {
            'no-duplicate-imports': 'error',
            'no-redeclare': 'error',
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            'no-redeclare': 'off',
        },
    },
];
