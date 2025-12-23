import { makeCheckInService } from '@/services/factories/make-check-in-service.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const registerCheckInBodySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 160
        }),
    })

    const registerCheckInParamsSchema = z.object({
        gymId: z.uuid()
    })

    const { latitude, longitude } = registerCheckInBodySchema.parse(request.body)
    const { gymId } = registerCheckInParamsSchema.parse(request.params)

        const checkInService = makeCheckInService()

        await checkInService.execute({
            gymId,
            userId: request.user.sub,
            userLatitude: latitude,
            userLongitude: longitude,
        })

    return reply.status(201).send({
        checkInService
    })
}
