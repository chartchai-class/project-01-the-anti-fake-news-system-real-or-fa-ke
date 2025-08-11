import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// ✅ ใช้ ESM import
import fs from 'node:fs'
import path from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    {
      name: 'mock-db-api',
      configureServer(server) {
        server.middlewares.use('/api/db.json', (_req, res) => {
          const newsPath = path.resolve(process.cwd(), 'src', 'mock', 'news.json')
          const commentsPath = path.resolve(process.cwd(), 'src', 'mock', 'comments.json')

          let newsRaw = []
          let commentsRaw = []

          try {
            newsRaw = JSON.parse(fs.readFileSync(newsPath, 'utf-8'))
          } catch (e) {
            console.error('Read news.json error:', e.message)
          }
          try {
            commentsRaw = JSON.parse(fs.readFileSync(commentsPath, 'utf-8'))
          } catch (e) {
            console.error('Read comments.json error:', e.message)
          }

          // ✅ รองรับทั้ง array ตรง ๆ และ object หุ้ม array
          const news = Array.isArray(newsRaw) ? newsRaw : (newsRaw?.news ?? [])
          const comments = Array.isArray(commentsRaw) ? commentsRaw : (commentsRaw?.comments ?? [])

          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          res.end(JSON.stringify({ news, comments }))
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
