/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'node:path'

const preloadCss = () => ({
  name: 'preload-css',
  transformIndexHtml(html: string, ctx: any) {
    if (!ctx.bundle) return html;
    let newHtml = html;
    for (const [fileName, asset] of Object.entries(ctx.bundle)) {
      const bundleAsset = asset as any;
      if (fileName.startsWith('assets/index') && fileName.endsWith('.css') && bundleAsset.type === 'asset') {
        const preloadTag = `<link rel="preload" href="/${fileName}" as="style" />`;
        newHtml = newHtml.replace('<title>findua</title>', `<title>findua</title>\n    ${preloadTag}`);
      }
    }
    return newHtml;
  }
});

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    preloadCss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@ui": path.resolve(__dirname, "./src/styles/ui"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) {
              return 'react';
            }
            if (id.includes('@tanstack') || id.includes('axios')) {
              return 'query';
            }
            return 'vendor';
          }
        }
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
