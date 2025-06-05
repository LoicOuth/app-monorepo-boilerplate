import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const MeController = () => import('#me/controllers/me.controller')

router
  .group(() => {
    router.get('', [MeController, 'index'])
  })
  .prefix('api/me')
  .middleware([middleware.auth()])
