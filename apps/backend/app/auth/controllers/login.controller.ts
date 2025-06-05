import User from '#me/models/user'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { JsonApiErrors } from '#core/exceptions/json_api_error_reporter'
import { TuyauExceptionResponseInterface } from '@tuyau/utils/types'

export default class LoginController implements TuyauExceptionResponseInterface {
  declare validationExceptionResponse: JsonApiErrors
  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string(),
    })
  )

  async handle({ auth, response, request }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginController.validator)
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.noContent()
  }
}
