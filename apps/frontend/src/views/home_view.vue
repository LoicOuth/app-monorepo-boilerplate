<script setup lang="ts">
const { data: user } = useMeQuery()
</script>

<template>
  {{ user?.fullName }}
</template>
