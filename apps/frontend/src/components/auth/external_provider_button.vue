<script setup lang="ts">
import { tuyau } from '@/services/tuyau'
import type { PropType } from 'vue'
import type { ExternalAuthProviders } from '@louth/backend/types'

const props = defineProps({
  isPending: { type: Boolean, default: false },
  provider: { type: String as PropType<ExternalAuthProviders>, required: true },
})

const handleRedirect = () => {
  window.location.href = tuyau.api.auth({ provider: props.provider }).redirect.$url()
}
</script>

<template>
  <Button
    :label="`Continuer avec ${props.provider}`"
    :icon="`pi pi-${props.provider}`"
    variant="outlined"
    severity="contrast"
    class="w-full justify-center mb-3"
    :loading="props.isPending"
    @click="handleRedirect()"
  />
</template>
