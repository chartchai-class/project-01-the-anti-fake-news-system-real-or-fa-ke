import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
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
          const developerPath = path.resolve(process.cwd(), 'src', 'mock', 'developer.json')

          let newsRaw = []
          let commentsRaw = []
          let developerRaw = []

          try {
            newsRaw = JSON.parse(fs.readFileSync(newsPath, 'utf-8'))
            commentsRaw = JSON.parse(fs.readFileSync(commentsPath, 'utf-8'))
            developerRaw = JSON.parse(fs.readFileSync(developerPath, 'utf-8'))
          } catch (e) {
            console.error('Error reading mock data:', e)
          }

          const news = Array.isArray(newsRaw) ? newsRaw : (newsRaw?.news ?? [])
          const comments = Array.isArray(commentsRaw) ? commentsRaw : (commentsRaw?.comments ?? [])
          const developers = developerRaw?.developer || []

          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          res.end(JSON.stringify({ news, comments, developer: developers }))
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
