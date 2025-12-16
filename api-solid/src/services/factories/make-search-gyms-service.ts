import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js"
import { SearchGymsService } from "../search-gyms.js"

export function makeSearchGymsService() {
    const gymsRepository = new PrismaGymsRepository()

    const useCase = new SearchGymsService(gymsRepository)

    return useCase
}