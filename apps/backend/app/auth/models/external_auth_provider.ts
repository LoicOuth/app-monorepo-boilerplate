import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#me/models/user'
import { type ExternalAuthProviders } from '#types/index'

export default class ExternalAuthProvider extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare providerName: ExternalAuthProviders

  @column()
  declare providerUserId: string

  @column()
  declare accessToken: string

  @column()
  declare refreshToken: string

  @column()
  declare isConnectedWith: boolean

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
