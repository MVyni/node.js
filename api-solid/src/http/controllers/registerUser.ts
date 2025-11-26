import { registerUserService } from '@/services/registerUser.js'
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
    await registerUserService({
      name,
      email,
      password,
    })
  } catch (error) {
    console.error('Error on System ', error)
    return reply.status(409).send()
  }
  return reply.status(201).send()
}
