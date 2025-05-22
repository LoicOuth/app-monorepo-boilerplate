import User from '#me/models/user'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class RegisterController {
  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
      fullName: vine.string(),
      password: vine.string(),
      passwordConfirmation: vine.string().sameAs('password'),
    })
  )

  async handle({ request, response, auth }: HttpContext) {
    const { email, password, fullName } = await request.validateUsing(RegisterController.validator)

    const user = await User.create({
      email,
      password,
      fullName,
    })

    await auth.use('web').login(user)

    return response.noContent()
  }
}
