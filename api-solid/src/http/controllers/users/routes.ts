import type { FastifyInstance } from 'fastify'
import { registerUser } from './register.js'
import { authenticate } from './authenticate.js'
import { profile } from './profile.js'
import { verifyJwt } from '@/http/middlewares/verify-jwt.js'


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)

  /*Authenticated*/
  app.get('/profile', { onRequest: [verifyJwt] }, profile)
}
