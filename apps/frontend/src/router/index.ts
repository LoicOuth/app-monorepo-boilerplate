import { createRouter, createWebHistory } from 'vue-router'
import AuthRoutes from '@/router/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home_view.vue'),
    },
    ...AuthRoutes,
  ],
})

export default router
