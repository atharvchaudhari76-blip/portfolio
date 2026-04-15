import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No base path for portfolio integration - served from static folder
export default defineConfig({
  plugins: [react()],
  base: './',
})
