import UserDto from '#me/dtos/user_dto'
import { assertExists } from '@adonisjs/core/helpers/assert'
import type { HttpContext } from '@adonisjs/core/http'

export default class MeController {
  index({ auth }: HttpContext) {
    assertExists(auth.user, 'User not authenticated')

    return new UserDto(auth.user)
  }
}
