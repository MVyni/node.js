import type { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { registerGym } from './register.js'


export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)
    
    app.post('/gyms', registerGym)
}
