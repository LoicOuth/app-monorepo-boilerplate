import type { RouteRecordRaw } from 'vue-router'

const AuthRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/auth_layout.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/login_view.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/register_view.vue'),
      },
    ],
  },
]

export default AuthRoutes
