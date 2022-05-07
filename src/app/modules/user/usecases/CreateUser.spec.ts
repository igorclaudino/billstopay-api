
import { User } from '@core/entities/user/User'
import { UserRepository } from '@infra/adapters/repositories/UserRepository'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUser'

describe('CreateUserUseCase', () => {
  it('should create a user with valid parameters', async () => {
    jest.spyOn(UserRepository.prototype, 'create').mockResolvedValueOnce(Promise.resolve(
      new User({
        email: '',
        name: '',
        password: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, '123')
    ))
    const createUserUseCase = container.resolve(CreateUserUseCase)
    const createdUser = await createUserUseCase.execute({ name: 'fake name', email: 'fakemail2@mail.com', password: 'fakepassword123' })
    expect(createdUser).toBeDefined()
  })

  it('should not create a user an existing email', async () => {
    const createSpyOn = jest.spyOn(UserRepository.prototype, 'create')
    jest.spyOn(UserRepository.prototype, 'findByEmail').mockResolvedValueOnce(new User({
      name: 'fake name',
      email: 'fakemail@mail.com',
      password: 'fakepassword123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, '123'))
    const createUserUseCase = container.resolve(CreateUserUseCase)
    await expect(createUserUseCase.execute({ name: 'fake name', email: 'fakemail@mail.com', password: 'fakepassword123' })).rejects.toThrow()
    expect(createSpyOn).not.toBeCalled()
  })
})
