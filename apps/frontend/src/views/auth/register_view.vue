<script setup lang="ts">
import ExternalProviderButton from '@/components/auth/external_provider_button.vue'

const router = useRouter()

const { mutate: register, isPending, error } = useRegisterMutation()

const formData = ref<Parameters<typeof register>[0]>({
  email: '',
  password: '',
  fullName: '',
  passwordConfirmation: '',
})

const handleRegister = () => {
  register(
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
</script>

<template>
  <Card class="p-3 w-md">
    <template #content>
      <div class="flex flex-col">
        <ExternalProviderButton :is-pending="isPending" provider="google" />

        <Divider align="center">
          <span class="text-sm text-surface-400">Ou continuer avec</span>
        </Divider>
        <div class="flex flex-col gap-8 mt-3">
          <FloatLabel>
            <InputText
              id="email"
              v-model="formData.email"
              class="w-full"
              type="email"
              :invalid="!!error?.value.email"
            />
            <label for="email">Adresse email</label>
            <Message v-if="error?.value.email" severity="error" size="small" variant="simple">
              {{ error.value.email }}
            </Message>
          </FloatLabel>
          <FloatLabel>
            <InputText
              id="fullName"
              v-model="formData.fullName"
              class="w-full"
              :invalid="!!error?.value.fullName"
            />
            <label for="fullName">Nom</label>
            <Message v-if="error?.value.fullName" severity="error" size="small" variant="simple">
              {{ error.value.fullName }}
            </Message>
          </FloatLabel>
          <FloatLabel>
            <Password
              v-model="formData.password"
              toggleMask
              inputId="password"
              class="w-full"
              input-class="w-full"
              :invalid="!!error?.value.password"
            />
            <label for="password">Mot de passe</label>
            <Message v-if="error?.value.password" severity="error" size="small" variant="simple">
              {{ error.value.password }}
            </Message>
          </FloatLabel>
          <FloatLabel>
            <Password
              v-model="formData.passwordConfirmation"
              toggleMask
              inputId="password"
              class="w-full"
              input-class="w-full"
              :feedback="false"
            />
            <label for="password">Confirmation de mot de passe</label>
          </FloatLabel>

          <Button
            label="S'enregistrer avec un email"
            class="w-full justify-center"
            :loading="isPending"
            @click="handleRegister()"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center justify-center mt-7">
        <p class="text-sm mr-2">Vous avez déjà un compte ?</p>
        <RouterLink :to="{ name: 'login' }" class="text-primary text-sm hover:underline">
          Se connecter
        </RouterLink>
      </div>
    </template>
  </Card>
</template>
