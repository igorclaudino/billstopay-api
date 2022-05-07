import UserController from '@api/controllers/UserController'
import { Router } from 'express'

const routes = Router()

routes.post(
  '/users',
  UserController.store
)

export default routes
