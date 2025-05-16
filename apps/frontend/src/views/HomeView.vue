<script setup lang="ts">
import { tuyau } from '@/services/tuyau'
import { useQuery } from '@tanstack/vue-query'

const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: () => tuyau.api.users.$get().then((res) => res.data),
})
</script>

<template>
  <div v-for="user in users" :key="user.id">
    <p>{{ user.fullName }}</p>
  </div>
</template>
