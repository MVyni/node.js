import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js"
import { GetUserMetricsService } from "../get-user-metrics.js"

export function makeGetUserMetricsService() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new GetUserMetricsService(checkInsRepository)

    return useCase
}