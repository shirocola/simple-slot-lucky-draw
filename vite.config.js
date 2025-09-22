import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175
  },
  base: './', // Use relative paths for Electron
  build: {
    outDir: 'dist'
  }
})
