import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository.js"
import { AuthenticateService } from "../authenticate.js"

export function makeAuthenticateService() {
    const usersRepository = new PrismaUserRepository()
    const authenticateService = new AuthenticateService(usersRepository)

    return authenticateService
}