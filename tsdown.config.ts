import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  external: ['@typescript-eslint/parser', 'eslint/config', 'eslint'],
});