import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        {
          primevue: ['useToast', 'useConfirm'],
          '@tanstack/vue-query': ['useQuery', 'useMutation'],
        },
      ],
      dirs: ['./src/composables/**'],
      vueTemplate: true,
    }),
    Components({
      resolvers: [PrimeVueResolver()],
      dirs: [],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
