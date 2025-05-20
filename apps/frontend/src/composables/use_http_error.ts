import type { HttpToastError } from '@/models/error_model'

export const httpErrorToast = ref<HttpToastError[]>([])

export const useHttpError = () => {
  const toast = useToast()

  watch(
    httpErrorToast,
    (newValue) => {
      toast.add({
        severity: 'error',
        life: 3000,
        ...newValue[newValue.length - 1],
      })
    },
    { deep: true },
  )
}
