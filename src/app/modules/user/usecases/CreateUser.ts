import { IUserRepository } from '@domain/aggregate/user/repositories/IUserRepository'
import { User } from '@domain/aggregate/user/User'

export type CreateUserRequest = {
  name: string,
  email: string,
  password: string
}

export class CreateUserUseCase {
  constructor (private readonly _userRepository: IUserRepository) {}

  async execute ({ name, email, password }: CreateUserRequest) {
    const userByEmail = await this._userRepository.findByEmail(email)
    if (userByEmail) throw new Error('User with this e-mail already exists')

    const user = await User.create({ name, email, password })

    const userCreated = await this._userRepository.create(user)

    return userCreated
  }
}
