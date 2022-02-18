import { IUserRepository } from '@domain/aggregate/user/repositories/IUserRepository'
import { InMemoryUserRepository } from '@infra/adapters/repositories/UserRepositoryInMemory'
import { CreateUserUseCase } from './CreateUser'

describe('CreateUserUseCase', () => {
  let _userRepository: IUserRepository
  beforeAll(() => {
    _userRepository = new InMemoryUserRepository()
  })
  it('should create a user with valid parameters', async () => {
    const createUserUseCase = new CreateUserUseCase(_userRepository)
    const createdUser = await createUserUseCase.execute({ name: 'fake name', email: 'fakemail@mail.com', password: 'fakepassword123' })
    expect(createdUser).toBeDefined()
  })

  it('should not create a user an existing email', async () => {
    const createUserUseCase = new CreateUserUseCase(_userRepository)
    await createUserUseCase.execute({ name: 'fake name', email: 'fakemail@mail.com', password: 'fakepassword123' })
    await expect(createUserUseCase.execute({ name: 'fake name', email: 'fakemail@mail.com', password: 'fakepassword123' })).rejects.toThrowError()
  })
})
