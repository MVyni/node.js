import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { FetchNearbyGymsService } from './fetch-nearby-gyms.js'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe('Fetch Nearby Gyms Service', async () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsService(gymsRepository) //SUT => System Under Test => The principal variable
    })


    it('should be able to fetch nearby gyms', async () => {

        await gymsRepository.create({
            name: 'Near Gym',
            description: null,
            phone: '',
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        await gymsRepository.create({
            name: 'Far Gym',
            description: null,
            phone: 'null',
            latitude: -27.0610928,
            longitude: -49.5229501,
        })

        const { gyms } = await sut.execute({
            userLatitude: -27.2092052,
            userLongitude: -49.64001091,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ name: 'Near Gym' }),
        ])
    })
})