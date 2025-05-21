import { tuyau } from '@/services/tuyau'
import { type InferErrorType, type InferRequestType, type InferResponseType } from '@tuyau/client'

//TODO: Find a way to wrap this to avoid code duplication
const useLoginMutation = () => {
  const enpoint = tuyau.api.auth.login.$post

  return useMutation<
    InferResponseType<typeof enpoint>,
    InferErrorType<typeof enpoint>,
    InferRequestType<typeof enpoint>
  >({
    mutationFn: (data) => enpoint(data).unwrap(),
  })
}

export { useLoginMutation }
