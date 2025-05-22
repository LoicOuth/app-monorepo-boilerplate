import User from '#me/models/user'
import env from '#start/env'
import { ExternalAuthProviders } from '#types/index'
import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'
import encryption from '@adonisjs/core/services/encryption'

export default class ExternalProviderLoginController {
  private readonly frontUrl = env.get('FRONT_URL')

  redirect({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async callback({ ally, auth, response, request }: HttpContext) {
    const providerName = request.param('provider') as ExternalAuthProviders
    const provider = ally.use(providerName)

    if (provider.accessDenied()) {
      return response.redirect(`${this.frontUrl}/login?error=access_denied`)
    }

    if (provider.stateMisMatch()) {
      return response.redirect(`${this.frontUrl}/login?error=state_mismatch`)
    }

    if (provider.hasError()) {
      return response.redirect(`${this.frontUrl}/login?error=authentication_failed`)
    }

    const providerUser = await provider.user()

    let user = await User.query()
      .whereHas('externalAuthProviders', (query) => {
        query
          .where('providerName', providerName)
          .where('providerUserId', providerUser.id)
          .where('isConnectedWith', true)
      })
      .first()

    if (user) {
      await user
        .merge({
          fullName: providerUser.name,
          email: providerUser.email,
          avatar: providerUser.avatarUrl,
        })
        .save()

      await user
        .related('externalAuthProviders')
        .query()
        .where('providerUserId', providerUser.id)
        .where('providerName', providerName)
        .where('isConnectedWith', true)
        .update({
          accessToken: encryption.encrypt(providerUser.token.token),
          refreshToken: encryption.encrypt(providerUser.token.refreshToken),
        })
    } else {
      const existingUserByEmail = await User.findBy('email', providerUser.email)
      if (existingUserByEmail) {
        return response.redirect(`${this.frontUrl}/login?error=email_already_exists`)
      }

      user = await User.create({
        fullName: providerUser.name,
        email: providerUser.email,
        password: null,
        avatar: providerUser.avatarUrl,
      })
      await user.related('externalAuthProviders').create({
        providerName,
        providerUserId: providerUser.id,
        accessToken: encryption.encrypt(providerUser.token.token),
        refreshToken: encryption.encrypt(providerUser.token.refreshToken),
        isConnectedWith: true,
      })
    }

    await auth.use('web').login(user)

    return response.redirect(env.get('FRONT_URL'))
  }
}
