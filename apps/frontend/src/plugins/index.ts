import type { App } from 'vue'
import primevue from '@/plugins/primevue'
import vueQuery from '@/plugins/vue_query'
import i18n from '@/plugins/i18n'

export const registerPlugins = (app: App) => {
  app.use(primevue)
  app.use(vueQuery)
  app.use(i18n)
}
