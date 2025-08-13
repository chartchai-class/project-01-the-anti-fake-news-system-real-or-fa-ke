import type { DB, NewsItem } from '@/types'

let cachedDB: DB | null = null

async function fetchDB(forceRefresh = false): Promise<DB> {
  if (cachedDB !== null && !forceRefresh) return cachedDB
  const res = await fetch('/api/db.json', { cache: 'force-cache' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const db: DB = await res.json()
  cachedDB = db
  return db
}

export async function getDB(forceRefresh = false): Promise<DB> {
  return fetchDB(forceRefresh)
}

export async function getNewsList(): Promise<NewsItem[]> {
  const db = await fetchDB()
  return db.news
}

export async function getNewsById(id: number): Promise<NewsItem | undefined> {
  const db = await fetchDB()
  return db.news.find(n => Number(n.id) === Number(id))
}

export async function getCommentsByNewsId(newsId: number) {
  const db = await fetchDB()
  return db.comments
    .filter((c: any) => Number(c.newsId) === Number(newsId))
    .sort((a: any, b: any) => new Date(b.createdAt || b.at).getTime() - new Date(a.createdAt || a.at).getTime())
}

export async function getDeveloper() {
  const db = await fetchDB()
  // some db.json files may not have developer; return [] in that case
  // @ts-expect-error permissive for mock shape
  return db.developer || []
}

