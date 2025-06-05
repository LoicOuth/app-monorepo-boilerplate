import { HttpStatusCode } from '@/models/error.model'
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
      onError: (error) => {
        if (
          error instanceof TuyauHTTPError &&
          error.status === HttpStatusCode.UnprocessableEntity
        ) {
          error.value = (error.value as any).errors.reduce(
            (acc: Record<string, string>, err: any) => {
              acc[err.field] = err.message
              return acc
            },
            {},
          )

          return error
        }

        return error
      },
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
