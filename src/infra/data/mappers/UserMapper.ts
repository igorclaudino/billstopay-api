import { User } from '@domain/aggregate/user/User'
import { UserModel } from '../models/User'

export class UserMapper {
  static toModel ({ name, email, createdAt, password, updatedAt, getId }: User): UserModel {
    return Object.assign(new UserModel(), { name, email, createdAt, password, updatedAt, id: getId() })
  }

  static async toDomain (user: UserModel): Promise<User> {
    return await User.create({ ...user }, user.id)
  }
}
