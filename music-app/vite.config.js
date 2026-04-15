import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path for GitHub Pages root deployment
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
