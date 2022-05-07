import { Entity } from '../../seed-work/entity'

type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Entity<UserProps> {
  constructor (props: UserProps, id?: string) {
    super(props, id)
  }

  static async create (props: UserProps, id?: string) {
    return new User(props, id)
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
