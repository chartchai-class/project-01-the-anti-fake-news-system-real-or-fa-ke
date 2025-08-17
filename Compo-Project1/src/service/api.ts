import type { DB, NewsItem, CommentItem } from '@/types'
import newsData from '@/mock/news.json'
import commentsData from '@/mock/comments.json'
import developerData from '@/mock/developer.json'
import usersData from '@/mock/users.json'

let cachedDB: DB | null = null

async function fetchDB(forceRefresh = false): Promise<DB> {
  if (cachedDB !== null && !forceRefresh) return cachedDB
  
  // Use imported mock data directly and map to correct types
  const news = Array.isArray(newsData) ? newsData : (newsData?.news ?? [])
  const comments = Array.isArray(commentsData) ? commentsData : (commentsData?.comments ?? [])
  
  // Map news data to match NewsItem interface
  const mappedNews: NewsItem[] = news.map(item => ({
    id: item.id,
    topic: item.topic,
    shortDetail: item.shortDetail,
    fullDetail: item.fullDetail,
    status: item.status === 'not_fake' ? 'not-fake' : 'fake', // Map status values
    reporterName: item.reporterName,
    reportedAt: item.reportedAt,
    imageUrl: item.imageUrl,
    votes: item.votes,
    reporterId: item.reporterId
  }))
  
  // Map comments data to match CommentItem interface
  const mappedComments: CommentItem[] = comments.map(item => ({
    id: item.id,
    newsId: item.newsId,
    text: item.comment, // Map 'comment' field to 'text'
    username: item.username,
    imageUrl: item.imageUrl,
    createdAt: item.createdAt,
    vote: item.vote === 'not_fake' ? 'not_fake' : (item.vote === 'fake' ? 'fake' : null)
  }))
  
  const db: DB = {
    news: mappedNews,
    comments: mappedComments,
    developer: developerData?.developer || [],
    users: Array.isArray(usersData) ? usersData : (usersData?.users ?? [])
  }
  
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
    .filter((c: CommentItem) => Number(c.newsId) === Number(newsId))
    .sort((a: CommentItem, b: CommentItem) => new Date(b.createdAt || b.at || '').getTime() - new Date(a.createdAt || a.at || '').getTime())
}

export async function getDeveloper() {
  const db = await fetchDB()
  return db.developer || []
}

