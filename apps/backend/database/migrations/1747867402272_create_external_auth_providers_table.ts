import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'external_auth_providers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('provider_name').notNullable()
      table.string('provider_user_id').notNullable()
      table.text('access_token').nullable()
      table.text('refresh_token').nullable()
      table.boolean('is_connected_with').defaultTo(false)

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.unique(['provider_name', 'provider_user_id', 'user_id'], {
        indexName: 'external_auth_providers_unique',
      })

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
