import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SPA fallback: serve index.html for routes like /borrow, /invest so refresh/direct URL works
function spaFallback() {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'GET' && req.url && !req.url.includes('.') && !req.url.startsWith('/@')) {
          req.url = '/index.html'
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'GET' && req.url && !req.url.includes('.')) {
          req.url = '/index.html'
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback()],
})
