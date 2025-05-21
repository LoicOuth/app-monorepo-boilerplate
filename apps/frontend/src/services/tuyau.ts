import { createTuyau } from '@tuyau/client'
import { api } from '@louth/backend/api'

export const tuyau = createTuyau({
  api,
  baseUrl: import.meta.env.VITE_API_URL,
  retry: undefined,
  credentials: 'include',
})
