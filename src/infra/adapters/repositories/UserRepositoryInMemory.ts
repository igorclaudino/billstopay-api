import { IUserRepository } from '@domain/aggregate/user/repositories/IUserRepository'
import { User } from '@domain/aggregate/user/User'
import { UserMapper } from '@infra/data/mappers/UserMapper'
import { UserModel } from '@infra/data/models/User'

export class InMemoryUserRepository implements IUserRepository {
  users: UserModel[] = []

  async create (user: User): Promise<User> {
    this.users.push(UserMapper.toModel(user))
    return user
  }

  async findByEmail (email: string): Promise<User> {
    const foundUser = this.users.find(async (user) => user.email === email)

    return foundUser ? await UserMapper.toDomain(foundUser) : undefined
  }
}
