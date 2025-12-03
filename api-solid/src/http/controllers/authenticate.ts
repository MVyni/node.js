import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticateService } from '@/services/authenticate.js'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error.js'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUserRepository()
    const authenticateService = new AuthenticateService(usersRepository)

    await authenticateService.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    
    throw Error
  }
  return reply.status(200).send()
}
