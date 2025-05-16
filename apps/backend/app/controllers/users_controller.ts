import UserDto from '#dtos/user_dto'
import User from '#models/user'

export default class UsersController {
  async index() {
    const users = await User.all()

    return UserDto.toList(users)
  }
}
