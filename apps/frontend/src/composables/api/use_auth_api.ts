import { tuyau } from '@/services/tuyau'

const useLoginMutation = () => useTuyauMutation(tuyau.api.auth.login.$post)

const useRegisterMutation = () => useTuyauMutation(tuyau.api.auth.register.$post)

export { useLoginMutation, useRegisterMutation }
