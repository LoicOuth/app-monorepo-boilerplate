import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const LoginController = () => import('#auth/controllers/login.controller')
const RegisterController = () => import('#auth/controllers/register.controller')
const ExternalProviderLoginController = () =>
  import('#auth/controllers/external_provider_login.controller')

router
  .group(() => {
    router.post('login', [LoginController, 'handle'])

    router.get(':provider/redirect', [ExternalProviderLoginController, 'redirect'])
    router.get(':provider/callback', [ExternalProviderLoginController, 'callback'])

    router.post('register', [RegisterController, 'handle'])
  })
  .prefix('api/auth')
  .middleware([middleware.guest()])
