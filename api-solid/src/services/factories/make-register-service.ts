import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository.js"
import { RegisterUserService } from "../registerUser.js"

export function makeRegisterService() {
    const usersRepository = new PrismaUserRepository()
    const registerUserService = new RegisterUserService(usersRepository)

    return registerUserService
}