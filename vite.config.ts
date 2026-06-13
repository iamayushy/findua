/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
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
      },
      // minfication of css
      
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
