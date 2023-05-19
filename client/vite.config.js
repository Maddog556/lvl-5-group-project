import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 // https://vitejs.dev/config/
 //https://vitejs.dev/config/server-options.html#server-proxy for example for mulitple Router
 export default defineConfig({
  server: {
    proxy: {
      // put target start params example localhost:9000/test
      '/Target start params here ': {
        target: 'http://localhost:{Port Number Here}/',
        changeOrigin: true,
      },
    }
  },
  plugins: [react()],
})