import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative paths for GitHub Pages subdirectory deployment
export default defineConfig({
  plugins: [react()],
  base: './',
})
