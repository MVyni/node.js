import type { Gym } from '@/generated/prisma/client.js'
import type { GymsRepository } from '@/repositories/gyms-repository.js'

interface SearchGymsServiceRequest {
    query: string
    page: number
}

interface SearchGymsServiceResponse {
  gym: Gym[]
}

export class SearchGymsService {
  constructor(private gymsRepository: GymsRepository) {}

    async execute({ 
        query,
        page,
}: SearchGymsServiceRequest): Promise<SearchGymsServiceResponse> {

    const gym = await this.gymsRepository.search(query, page)

    return { gym }
  }
}
