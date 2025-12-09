import type { Gym } from '@/generated/prisma/client.js'
import type { GymsRepository } from '@/repositories/gyms-repository.js'

interface RegisterGymServiceRequest {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface RegisterGymServiceResponse {
  gym: Gym
}

export class RegisterGymService {
  constructor(private gymsRepository: GymsRepository) {}

    async execute({ 
        name,
        description,
        phone,
        latitude,
        longitude,
}: RegisterGymServiceRequest): Promise<RegisterGymServiceResponse> {

    const gym = await this.gymsRepository.create({
        name,
        description,
        phone: phone ?? '',
        latitude,
        longitude,
    })

    return { gym }
  }
}
