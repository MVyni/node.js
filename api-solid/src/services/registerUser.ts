import { UserAlreadyExistError } from '@/services/errors/user-already-exist-error.js'
import { prisma } from '@/lib/prisma.js'
import { hash } from 'bcryptjs'
import type { User } from '@/generated/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new UserAlreadyExistError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
