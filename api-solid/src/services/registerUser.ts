import { prisma } from '@/lib/prisma.js'
import { PrismaUserRepository } from '@/repositories/prisma-users-repository.js'
import { hash } from 'bcryptjs'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

export async function registerUserService({
  name,
  email,
  password,
}: RegisterServiceRequest) {
  const password_hash = await hash(password, 6)
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exist.')
  }

  const prismaUserRepository = new PrismaUserRepository()

  await prismaUserRepository.create({
    name,
    email,
    password_hash,
  })
}
