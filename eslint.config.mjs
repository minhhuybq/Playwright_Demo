import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default defineConfig(
  { ignores: ['node_modules/', 'reports/', 'test-results/', 'playwright-report/'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  { ...playwright.configs['flat/recommended'], files: ['tests/**/*.ts'] },
  prettier, // keep last: switches off style rules that clash with Prettier
);