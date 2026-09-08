import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crawlerContent } from './crawlerContent'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), crawlerContent()],
})
