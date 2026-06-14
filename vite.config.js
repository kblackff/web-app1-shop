import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  base: '/web-app1-shop/',
  build: {
    ssr: false
  },
  define: {
    'import.meta.env.SSR': false
  }
})
