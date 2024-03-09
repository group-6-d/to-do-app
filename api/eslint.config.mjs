// @ts-check
import path from 'path';
import { fileURLToPath } from 'url';
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  eslintConfigPrettier,
  {
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/no-array-delete': 'error',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    },
  },
  {
    files: ['*.js'],
    ...tsEslint.configs.disableTypeChecked,
  },
);
