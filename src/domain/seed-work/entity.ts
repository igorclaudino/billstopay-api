import { v4 as uuid } from 'uuid'

export class Entity<T> {
  private _id: string = uuid();

  protected props: T;

  constructor (props: T, id?: string) {
    this.props = props

    this._id = id || uuid()
  }

  public getId (): string {
    return this._id
  }

  public Equals (right: Entity<T>) {
    if (this.getId() !== right.getId()) {
      return false
    }

    return true
  }
}
