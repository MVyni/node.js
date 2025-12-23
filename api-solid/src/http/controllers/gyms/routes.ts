import type { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt.js'

import { register } from './register.js'
import { search } from './search.js'
import { nearby } from './nearby.js'


export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)
    
    app.post('/gyms', register)

    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearby)
}
