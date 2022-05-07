import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
  if (params.model === 'User') {
    if (params.action === 'create') {
      params.args.data.password = await bcrypt.hash(params.args.data.password, 10)
    } else if (params.action === 'createMany') {
      if (params.args.data !== undefined) {
        params.args.data.password = await bcrypt.hash(params.args.data.password, 10)
      } else {
        params.args.data = { password: await bcrypt.hash(params.args.data.password, 10) }
      }
    }
  }
  return next(params)
})

export default prisma
