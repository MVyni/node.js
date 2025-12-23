import type { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt.js'

import { register } from './register.js'
import { history } from './history.js'
import { validate } from './validate.js'
import { metrics } from './metrics.js'



export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.post('/gyms/:gymId/check-ins', register)
    app.patch('/gyms/:checkInId/validate', validate)

    app.get('/check-ins/history', history)
    app.get('/check-ins/metrics', metrics)
}
