import './assets/main.css'

import { LemmyHttp } from 'lemmy-js-client'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

//const instance_url = 'https://sopuli.xyz'
const instance_url = 'https://lemmy.world'
app.config.globalProperties.$instance_url = instance_url
app.config.globalProperties.$client = new LemmyHttp(instance_url)

app.use(createPinia())
app.use(router)

app.mount('#app')
