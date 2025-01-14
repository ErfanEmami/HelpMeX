import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: './.vite-cache', // Moves the cache to .vite-cache in the root of the frontend folder

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
