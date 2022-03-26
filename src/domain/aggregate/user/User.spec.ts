import { User } from './User'

describe('User', () => {
  describe('create', () => {
    it('should create a user with valid parameters', async () => {
      const createdUser = await User.create({ name: 'fake name', email: 'fakemail@mail.com', password: 'fakepassword123' })
      expect(createdUser).toBeDefined()
    })
    it('should not create a user with invalid e-mail', async () => {
      await expect(User.create({ name: 'fake name', email: 'fakemail', password: 'fakepassword123' })).rejects.toThrowError()
    })

    it('should not create a user with password less than 6 characters', async () => {
      await expect(User.create({ name: 'fake name', email: 'fakemail@mail.com', password: '12345' })).rejects.toThrowError()
    })
  })
})
