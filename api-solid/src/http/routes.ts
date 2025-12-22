import type { FastifyInstance } from 'fastify'
import { registerUser } from './controllers/register-user.js'
import { authenticate } from './controllers/authenticate.js'
import { profile } from './controllers/profile.js'
import { verifyJwt } from './middlewares/verify-jwt.js'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)

  /*Authenticated*/
  app.get('/profile', { onRequest: [verifyJwt] }, profile)
}
