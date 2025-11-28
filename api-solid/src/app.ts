import fastify from 'fastify'
import { appRoutes } from './http/routes.js'
import { ZodError, z } from 'zod'
import { env } from './env/index.js'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: 'Validation error. ', issues: z.treeifyError(error) })
    }
    
    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // Here we should log to on external tool like DataDog/NewRelic/Sentry
    }
    
    return reply.status(500).send({ message: 'Internal server error'})
    
})