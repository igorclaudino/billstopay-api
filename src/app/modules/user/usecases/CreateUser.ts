import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../../../core/entities/user/repositories/IUserRepository'
import { User } from '../../../../core/entities/user/User'

export type CreateUserRequest = {
  name: string,
  email: string,
  password: string
}
@injectable()
export class CreateUserUseCase {
  constructor (
    @inject('UserRepository')
    private readonly _userRepository: IUserRepository) {}

  async execute ({ name, email, password }: CreateUserRequest) {
    const userByEmail = await this._userRepository.findByEmail(email)
    if (userByEmail) throw new Error('User with this e-mail already exists')

    const user = await User.create({ name, email, password })

    const userCreated = await this._userRepository.create(user)

    return userCreated
  }
}
