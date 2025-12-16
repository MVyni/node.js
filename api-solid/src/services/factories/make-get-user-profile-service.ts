import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository.js"
import { GetUserProfileService } from "../get-user-profile.js"

export function makeGetUserProfileService() {
    const usersRepository = new PrismaUserRepository()
    const useCase = new GetUserProfileService(usersRepository)

    return useCase
}