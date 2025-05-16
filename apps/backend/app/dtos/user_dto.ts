import User from '#models/user'

export default class UserDto {
  id: number
  fullName: string | null
  email: string

  constructor(user: User) {
    this.id = user.id
    this.fullName = user.fullName
    this.email = user.email
  }

  static toList(users: User[]): UserDto[] {
    return users.map((user) => new UserDto(user))
  }
}
