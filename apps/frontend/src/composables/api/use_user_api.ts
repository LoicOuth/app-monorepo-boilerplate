import { tuyau } from '@/services/tuyau'
import { useQuery } from '@tanstack/vue-query'

const useUsersQuery = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => tuyau.api.users.$get().unwrap(),
  })

export { useUsersQuery }
