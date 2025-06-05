import type { InferErrorType, InferRequestType, InferResponseType } from '@tuyau/client'
import { useMutation, type UseMutationOptions } from '@tanstack/vue-query'

export const useTuyauMutation = <T extends (...args: any) => any>(
  endpoint: T,
  options?: UseMutationOptions<
    InferResponseType<typeof endpoint>,
    { value: Record<keyof Parameters<typeof endpoint>[0], string> },
    InferRequestType<typeof endpoint>
  >,
) => {
  return useMutation({
    mutationFn: (data) => endpoint(data).unwrap(),
    ...options,
  })
}
