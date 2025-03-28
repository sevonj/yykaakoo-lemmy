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

const client: LemmyHttp = app.config.globalProperties.$client
app.config.globalProperties.$localSite = await client.getSite()
const federatedInstances = (await client.getFederatedInstances()).federated_instances
if (!federatedInstances) {
  console.error('Failed to get feredatedInstances')
}
app.config.globalProperties.$federatedInstances = federatedInstances

app.use(createPinia())
app.use(router)

app.mount('#app')
