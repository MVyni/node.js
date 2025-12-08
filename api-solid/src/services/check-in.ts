import type { CheckIn } from "@/generated/prisma/client.js";
import type { CheckInsRepository } from "@/repositories/check-ins-repository.js";
import type { GymsRepository } from "@/repositories/gyms-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface CheckInServiceRequest {
    userId: string,
    gymId: string,
    userLatitude: number,
    userLongitude: number,
}

interface CheckInServiceResponse {
    checkIn: CheckIn
}

export class CheckInService {
    constructor(private checkInsRepository: CheckInsRepository, private gymsRepository: GymsRepository) { }
    
    async execute({ userId, gymId }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
        
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        //calculate distance between user and gym

        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        if (checkInOnSameDate) {
            throw new Error
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        })


        return { checkIn }
    }
}