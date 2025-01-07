import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactNative from 'eslint-plugin-react-native';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import prettierConfig from './prettier.config.js';

export default tseslint.config(
  { files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'] },
  { ignores: ['app-example'] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },
  {
    plugins: {
      'react-native': pluginReactNative,
    },
    rules: pluginReactNative.configs.all.rules,
  },
  { ...pluginPrettierRecommended, rules: { 'prettier/prettier': ['error', prettierConfig] } },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
);
