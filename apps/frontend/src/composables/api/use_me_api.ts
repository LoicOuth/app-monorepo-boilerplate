import { tuyau } from '@/services/tuyau'

const useMeQuery = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: () => tuyau.api.me.$get().unwrap(),
  })

export { useMeQuery }
