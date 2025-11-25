import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '@/lib/prisma.js'

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
    await prisma.user.create({
      data: {
        name,
        email,
        password_hash: password,
      },
    })

    return reply.status(201).send()
  } catch (error) {
    console.error('Error on System ', error)
    throw new Error()
  }
}
