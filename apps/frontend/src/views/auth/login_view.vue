<script setup lang="ts">
import ExternalProviderButton from '@/components/auth/external_provider_button.vue'

const router = useRouter()
const toast = useToast()
const { mutate: login, isPending, error } = useLoginMutation()

const formData = ref<Parameters<typeof login>[0]>({
  email: '',
  password: '',
})

const handleLogin = () => {
  login(
    {
      ...formData.value,
    },
    {
      onSuccess: () => {
        router.push({ name: 'home' })
      },
    },
  )
}

onMounted(() => {
  const currentError = router.currentRoute.value.query.error
  if (currentError) {
    toast.add({
      severity: 'error',
      summary: 'Erreur de connexion',
      detail: currentError,
      life: 3000,
    })
    router.replace({ query: {} })
  }
})
</script>

<template>
  <Card class="p-3 w-md">
    <template #title>
      <div class="text-center flex flex-col justify-center gap-1">
        <div>Se connecter à votre compte</div>
        <div class="text-surface-400 text-sm">Se connecter avec un service externe</div>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col mt-6">
        <ExternalProviderButton :is-pending="isPending" provider="google" />

        <Divider align="center">
          <span class="text-sm text-surface-400">ou continuer avec</span>
        </Divider>
        <div class="flex flex-col gap-8 mt-3">
          <FloatLabel>
            <InputText id="email" v-model="formData.email" class="w-full" type="e" />
            <label for="email">Adresse email</label>
            <!-- TODO: Find simple way to display error message. https://github.com/Julien-R44/tuyau/issues/62 -->
            <!-- <Message severity="error" variant="simple" size="small">Username is required</Message> -->
            <!-- {{ error?.value.errors['email'].message }} -->
          </FloatLabel>
          <FloatLabel>
            <Password
              v-model="formData.password"
              toggleMask
              inputId="password"
              :feedback="false"
              class="w-full"
              input-class="w-full"
            />
            <label for="password">Mot de passe</label>
          </FloatLabel>

          <Button
            label="Se connecter"
            class="w-full justify-center"
            :loading="isPending"
            @click="handleLogin()"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center justify-center mt-7">
        <p class="text-sm mr-2">Vous n'avez pas de compte ?</p>
        <RouterLink :to="{ name: 'register' }" class="text-primary text-sm hover:underline">
          Créer un compte
        </RouterLink>
      </div>
    </template>
  </Card>
</template>
