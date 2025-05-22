import ErrorHandler from '@/services/error_handler'
import { QueryClient, VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'
import { TuyauHTTPError } from '@tuyau/client'
import type { App } from 'vue'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: ErrorHandler.queryHandleError,
    },
    mutations: {
      retry: ErrorHandler.queryHandleError,
    },
  },
})
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient,
}

export default {
  install(app: App) {
    app.use(VueQueryPlugin, vueQueryPluginOptions)
  },
}
