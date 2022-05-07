import express, { Express } from 'express'
import cors from 'cors'
import routes from './routes'

class App {
  app: Express

  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(express.json())
    this.app.use(cors())
  }

  routes () {
    this.app.use('/api/', routes)
  }
}

export default new App().app
