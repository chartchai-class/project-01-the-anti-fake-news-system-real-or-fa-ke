import { defineStore } from 'pinia'
import type { NewsItem, Status } from '@/types'

export const useNewsStore = defineStore('news', {
    state: () => ({
        list: [] as NewsItem[],
    page: 1,
    perPage: 6,
        filter: 'all' as 'all' | Status,
        loading: false,
        errorMsg: null as string | null,
    }),
    actions: {
        setNews(news: NewsItem[]) {
            this.list = news
            this.clampPage()
        },
        setPage(page: number) {
            this.page = page
            this.clampPage()
        },
        setPerPage(perPage: number) {
            this.perPage = perPage
            this.clampPage()
        },
        setFilter(filter: 'all' | Status) {
            this.filter = filter
            this.clampPage()
        },
    // Removed updateTotalPages, totalPages is now only a getter
        clampPage() {
            const totalPages = this.totalPages
            if (this.page > totalPages) {
                this.page = totalPages
            }
            if (this.page < 1) {
                this.page = 1
            }
        },
        setLoading(val: boolean) {
            this.loading = val
        },
        setError(msg: string | null) {
            this.errorMsg = msg
        },
    },
    getters: {
        filteredNews(state) {
            if (state.filter === 'all') return state.list
            return state.list.filter(n => String(n.status).replace(/[_-]/g, '').toLowerCase() === String(state.filter).replace(/[_-]/g, '').toLowerCase())
        },
        paginatedNews(state) {
            const start = (state.page - 1) * state.perPage
            const filtered = state.filter === 'all'
                ? state.list
                : state.list.filter(n => String(n.status).replace(/[_-]/g, '').toLowerCase() === String(state.filter).replace(/[_-]/g, '').toLowerCase())
            return filtered.slice(start, start + state.perPage)
        },
        totalPages(state) {
            const filtered = state.filter === 'all'
                ? state.list
                : state.list.filter(n => String(n.status).replace(/[_-]/g, '').toLowerCase() === String(state.filter).replace(/[_-]/g, '').toLowerCase())
            return Math.max(1, Math.ceil(filtered.length / state.perPage))
        },
    },
})
