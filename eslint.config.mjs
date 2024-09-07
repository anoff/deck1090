// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import love from 'eslint-config-love';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended
);