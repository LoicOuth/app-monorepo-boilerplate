import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const LoginController = () => import('#auth/controllers/login_controller')

router
  .group(() => {
    router.post('login', [LoginController, 'handle'])
  })
  .prefix('api/auth')
  .middleware([middleware.guest()])
