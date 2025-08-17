import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  try {
    // Read mock data files
    const newsPath = path.join(process.cwd(), 'src', 'mock', 'news.json')
    const commentsPath = path.join(process.cwd(), 'src', 'mock', 'comments.json')
    const developerPath = path.join(process.cwd(), 'src', 'mock', 'developer.json')

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

    // Normalize data structure
    const news = Array.isArray(newsRaw) ? newsRaw : (newsRaw?.news ?? [])
    const comments = Array.isArray(commentsRaw) ? commentsRaw : (commentsRaw?.comments ?? [])
    const developers = developerRaw?.developer || []

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Content-Type', 'application/json')

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }

    // Return combined data
    res.status(200).json({ 
      news, 
      comments, 
      developer: developers 
    })

  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    })
  }
}
