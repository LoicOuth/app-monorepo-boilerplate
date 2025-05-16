/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    hello: 'test',
  }
})
router
  .group(() => {
    router.get('/users', [UsersController, 'index'])
  })
  .prefix('/api')
