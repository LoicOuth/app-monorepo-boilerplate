import User from '#me/models/user'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class LoginController {
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
