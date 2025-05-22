import User from '#me/models/user'

export default class UserDto {
  id: number
  fullName: string | null
  email: string
  avatar: string | null

  constructor(user: User) {
    this.id = user.id
    this.fullName = user.fullName
    this.email = user.email
    this.avatar = user.avatar
  }

  static toList(users: User[]): UserDto[] {
    return users.map((user) => new UserDto(user))
  }
}
