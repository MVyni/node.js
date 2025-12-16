import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository.js"
import { RegisterUserService } from "../register-user.js"

export function makeRegisterUserService() {
    const usersRepository = new PrismaUserRepository()
    const useCase = new RegisterUserService(usersRepository)

    return useCase
}