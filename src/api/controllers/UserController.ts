import { CreateUserUseCase } from '@app/modules/user/usecases/CreateUser'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UserController {
  async store (req: Request, res: Response) {
    const { email, name, password } = req.body
    const createUserUseCase = container.resolve(CreateUserUseCase)
    try {
      const userCreated = await createUserUseCase.execute({
        email, name, password
      })
      return res.json(userCreated)
    } catch (err) {
      return res.status(500).json({ error: true, message: err.message })
    }
  }
}

export default new UserController()
