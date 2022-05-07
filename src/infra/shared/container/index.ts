import { container } from 'tsyringe'
import { IUserRepository } from '@core/entities/user/repositories/IUserRepository'
import { UserRepository } from '@infra/adapters/repositories/UserRepository'
container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
