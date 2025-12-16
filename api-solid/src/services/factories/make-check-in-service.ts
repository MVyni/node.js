import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js"
import { CheckInService } from "../check-in.js"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js"

export function makeCheckInService() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()

    const useCase = new CheckInService(checkInsRepository, gymsRepository)

    return useCase
}