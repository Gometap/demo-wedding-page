import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // CRITICAL for GitHub Pages: makes assets use relative paths
  server: {
    allowedHosts: true
  }
})

