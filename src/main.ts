import './assets/main.css'

import { LemmyHttp } from 'lemmy-js-client'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const instanceUrl = 'https://sopuli.xyz'
app.config.globalProperties.$instanceUrl = instanceUrl
app.config.globalProperties.$client = new LemmyHttp(instanceUrl)

app.use(createPinia())
app.use(router)

app.mount('#app')
