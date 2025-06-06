import './assets/main.css'

import { LemmyHttp, type GetSiteResponse } from 'lemmy-js-client'
import { createApp, ref } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const instanceUrl = new URL('https://sopuli.xyz')
app.config.globalProperties.$instanceUrl = ref(instanceUrl)
app.config.globalProperties.$userIdentifier = ref('@' + instanceUrl.origin)
const client = new LemmyHttp(instanceUrl.origin)
app.config.globalProperties.$client = client
app.config.globalProperties.$localSite = ref<GetSiteResponse | undefined>()

app.use(createPinia())
app.use(router)

app.mount('#app')
