import 'reflect-metadata'

import '@infra/shared/container'
import { config } from 'dotenv'

import app from './app'
config()

app.listen(process.env.APP_PORT || 3333, () =>
  console.log(
    `BillsToPay API is running at ${process.env.APP_PORT || 3333}`
  )
)

process.on('SIGTERM', () => {
  process.exit()
})
