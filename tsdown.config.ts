import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
});