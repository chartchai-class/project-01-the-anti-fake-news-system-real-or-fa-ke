/** สถานะข่าวในระบบ */
export type Status = 'fake' | 'not-fake'

/** คะแนนโหวต (ถ้ามีเก็บไว้ในไฟล์/ฝั่ง client) */
export interface Votes {
  fake: number
  notFake: number
}

/** โครงสร้างข่าว 1 รายการ */
export interface NewsItem {
  id: string | number
  topic: string
  shortDetail: string
  fullDetail?: string
  status: Status
  reporterName: string
  datetime?: string
  reportedAt?: string
  imageUrl?: string
  votes?: Votes
  reporterId?: number

  /**
   * เผื่อ data เก่าบางที่ใช้ชื่อฟิลด์ reporter
   * จะยังอ่านได้โดยไม่ error (อย่าใช้สองอันพร้อมกัน)
   */
  reporter?: string
}

/** คอมเมนต์ใต้ข่าว */
export interface CommentItem {
  id: string | number
  newsId: string | number
  text: string
  username?: string
  imageUrl?: string
  createdAt?: string
  vote?: 'fake' | 'not_fake' | null
  at?: string // ISO timestamp
}

/** รูปแบบไฟล์ db.json ทั้งก้อน */
export interface DB {
  news: NewsItem[]
  comments: CommentItem[]
  developer: any[]
  users: any[]
}

/** params ของ route /news/:id */
export interface NewsRouteParams {
  id: string
}
