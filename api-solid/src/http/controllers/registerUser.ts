import { UserAlreadyExistError } from '@/services/errors/user-already-exist-error.js'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { RegisterUserService } from '@/services/registerUser.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUserRepository()
    const registerUserService = new RegisterUserService(usersRepository)

    await registerUserService.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistError) {
      return reply.status(409).send({ message: err.message })
    }
    
    throw Error
  }
  return reply.status(201).send()
}
