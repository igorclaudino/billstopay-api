import { Entity } from '@domain/seed-work/entity'
import * as yup from 'yup'

type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
})

export class User extends Entity<UserProps> {
  constructor (props: UserProps, id?: string) {
    super(props, id)
  }

  static async create (props: UserProps, id?: string) {
    try {
      await UserSchema.validate(props)
    } catch (err) {
      throw new Error(err)
    }
    return new User(props)
  }

  public get name (): string {
    return this.props.name
  }

  public get password (): string {
    return this.props.password
  }

  public get email (): string {
    return this.props.email
  }

  public get createdAt (): Date {
    return this.props.createdAt
  }

  public get updatedAt (): Date {
    return this.props.updatedAt
  }
}
