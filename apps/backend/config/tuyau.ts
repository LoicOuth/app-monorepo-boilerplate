import { defineConfig } from '@tuyau/core'
import '@tuyau/utils/types'

const tuyauConfig = defineConfig({
  codegen: {
    /**
     * Filters the definitions and named routes to be generated
     */
    // definitions: {
    //  only: [],
    // }
    // routes: {
    //  only: [],
    // }
    definitions: {
      except: [/^\/api\/auth\/(.+)\/callback$/],
    },
  },
})

// declare module '@tuyau/utils/types' {
//   interface ValidationExceptionResponse {
//     errors: Record<string, Array<{ message: string; rule: string; field: string }>>
//   }
// }

export default tuyauConfig
