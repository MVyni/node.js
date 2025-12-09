import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository.js"
import { RegisterUserService } from "../register-user.js"

export function makeRegisterService() {
    const usersRepository = new PrismaUserRepository()
    const registerUserService = new RegisterUserService(usersRepository)

    return registerUserService
}