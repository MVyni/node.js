import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterGymService } from '@/services/factories/make-register-gym-service.js'

export async function register(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const registerGymBodySchema = z.object({
        name: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 160
        }),
    })

    const { name, description, phone, latitude, longitude } = registerGymBodySchema.parse(request.body)

        const registerGymService = makeRegisterGymService()

        await registerGymService.execute({
            name,
            description,
            phone,
            latitude,
            longitude
        })

    return reply.status(201).send()
}
