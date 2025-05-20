import '@/assets/app.css'

import { createApp } from 'vue'
import App from '@/app.vue'
import router from '@/router'
import { registerPlugins } from '@/plugins/index'

const app = createApp(App)
registerPlugins(app)
app.use(router)
app.mount('#app')
