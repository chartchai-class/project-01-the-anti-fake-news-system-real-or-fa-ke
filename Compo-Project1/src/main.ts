import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'nprogress/nprogress.css'

// Initialize Vercel Analytics
inject()

// Initialize Vercel Speed Insights
injectSpeedInsights()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
