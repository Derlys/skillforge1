import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: true,
  entry: ['./src/index.ts', './src/server.ts'],
  external: [/@loris-sandbox\/.*/],
  format: 'esm',
  noExternal: [/@solana-mobile-stack\/.*/],
  outDir: './dist',
})
