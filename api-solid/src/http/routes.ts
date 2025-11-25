import type { FastifyInstance } from 'fastify'
import { registerUser } from './controllers/registerUser.js'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
}
