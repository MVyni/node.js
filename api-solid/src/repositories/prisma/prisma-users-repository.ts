import { Prisma } from '@/generated/prisma/client.js'
import { prisma } from '@/lib/prisma.js'

export class PrismaUserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
