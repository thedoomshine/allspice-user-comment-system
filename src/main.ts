import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import './theme/global.css'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
