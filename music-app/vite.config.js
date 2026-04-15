import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path set to /music/ so the app is served at:
// https://<username>.github.io/portfolio/music/
export default defineConfig({
  plugins: [react()],
  base: '/music/',
})
