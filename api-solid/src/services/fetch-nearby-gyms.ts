import type { Gym } from '@/generated/prisma/client.js'
import type { GymsRepository } from '@/repositories/gyms-repository.js'

interface FetchNearbyGymsServiceRequest {
    userLatitude: number
    userLongitude: number
}

interface FetchNearbyGymsServiceResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

    async execute({ 
        userLatitude,
        userLongitude,
}: FetchNearbyGymsServiceRequest): Promise<FetchNearbyGymsServiceResponse> {

        const gyms = await this.gymsRepository.fetchManyNearBy({
            latitude: userLatitude,
            longitude: userLongitude,
        })

    return { gyms }
  }
}
