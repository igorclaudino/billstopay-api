import { IUserRepository } from '../../../core/entities/user/repositories/IUserRepository'
import { User } from '../../../core/entities/user/User'
import { UserMapper } from '@infra/data/mappers/UserMapper'
import prisma from '@infra/database'

export class UserRepository implements IUserRepository {
  async create (user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: UserMapper.toModel(user)
    })
    return UserMapper.toDomain(createdUser)
  }

  async findByEmail (email: string): Promise<User> {
    const foundUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return foundUser ? await UserMapper.toDomain(foundUser) : undefined
  }
}
