import { defineStore } from 'pinia'

export interface CommentItem {
  id: number
  newsId: number
  username: string
  vote: 'fake' | 'not_fake' | null
  text: string
  imageUrl?: string
  createdAt: string
}

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [] as CommentItem[],
    loading: false,
    errorMsg: null as string | null,
  }),
  actions: {
    setComments(comments: CommentItem[]) {
      this.comments = comments
    },
    addComment(comment: CommentItem) {
      this.comments.unshift(comment)
    },
    setLoading(val: boolean) {
      this.loading = val
    },
    setError(msg: string | null) {
      this.errorMsg = msg
    },
  },
  getters: {
    getCommentsByNewsId: (state) => (newsId: number) =>
      state.comments.filter(c => c.newsId === newsId)
  },
})
