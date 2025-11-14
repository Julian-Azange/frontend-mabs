import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  proxy: {
    '/api': {
      target: 'https://server-mabs-xo9s.onrender.com',
      changeOrigin: true,
      secure: false,
    }
  }
})