import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { GetUserMetricsService } from './get-user-metrics.js'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Get User Metrics Service', async () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsService(checkInsRepository) //SUT => System Under Test => The principal variable
    })


    it('should be able to get check-ins count', async () => {

        await checkInsRepository.create({
            user_id: 'user-01',
            gym_id: 'gym-01',
        })

        await checkInsRepository.create({
            user_id: 'user-01',
            gym_id: 'gym-02',
        })

        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        })

        expect(checkInsCount).toEqual(2)
    })
})