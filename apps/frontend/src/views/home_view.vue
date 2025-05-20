<script setup lang="ts">
const { data: users } = useUsersQuery()
</script>

<template>
  <Card v-for="user in users" :key="user.id">
    <template #content>
      <p>{{ user.fullName }}</p>
    </template>
  </Card>

  <Button label="coucou" />
</template>
