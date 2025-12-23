import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const historyCheckInBodySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    })

    const { page } = historyCheckInBodySchema.parse(request.body)

    const checkInUserHistoryService = makeFetchUserCheckInsHistoryService()

    const { checkIns } = await checkInUserHistoryService.execute({
        userId: request.user.sub,
        page,
    })

    return reply.status(200).send({
        checkIns
    })
}
