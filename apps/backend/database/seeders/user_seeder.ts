import User from '#auth/models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      fullName: 'Loïc OUTHIER',
      email: 'loic.outhier.work@gmail.com',
      password: 'password',
    })
  }
}
