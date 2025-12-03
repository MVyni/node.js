import type { FastifyInstance } from 'fastify'
import { registerUser } from './controllers/registerUser.js'
import { authenticate } from './controllers/authenticate.js'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)

  app.post('/sessions', authenticate)
}
