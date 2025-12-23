import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const validateCheckInParamsSchema = z.object({
        checkInId: z.uuid()
    })

    const { checkInId } = validateCheckInParamsSchema.parse(request.params)

    const checkInUserHistoryService = makeValidateCheckInService()

    await checkInUserHistoryService.execute({
        checkInId,
    })

    return reply.status(204).send()
}
