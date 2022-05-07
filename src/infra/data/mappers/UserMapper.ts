import { User } from '@core/entities/user/User'
import { User as UserModel } from '@prisma/client'

export class UserMapper {
  static toModel (user: User): UserModel {
    return { name: user.name, email: user.email, createdAt: user.createdAt, password: user.password, updatedAt: user.updatedAt, id: user.getId() }
  }

  static async toDomain (user: UserModel): Promise<User> {
    return await User.create({ ...user }, user.id)
  }
}
