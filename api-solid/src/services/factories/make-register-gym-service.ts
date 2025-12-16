import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js"
import { RegisterGymService } from "../register-gym.js"

export function makeRegisterGymService() {
    const gymsRepository = new PrismaGymsRepository()

    const useCase = new RegisterGymService(gymsRepository)

    return useCase
}