import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { SearchGymsService } from './search-gyms.js'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Search Gyms Service', async () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsService(gymsRepository) //SUT => System Under Test => The principal variable
    })


    it('should be able to search gym', async () => {

        await gymsRepository.create({
            name: 'Thor Gym',
            description: null,
            phone: '',
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        await gymsRepository.create({
            name: 'Dom Gym',
            description: null,
            phone: 'null',
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        const { gym } = await sut.execute({
            query: 'Dom Gym',
            page: 1,
        })

        expect(gym).toHaveLength(1)
        expect(gym).toEqual([
            expect.objectContaining({ name: 'Dom Gym' }),
        ])
    })

    it('should be able to search pagineted gym', async () => {

        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                name: `Dom Gym ${i}`,
                description: null,
                phone: 'null',
                latitude: -27.2092052,
                longitude: -49.6401091,
            })
        }

        const { gym } = await sut.execute({
            query: 'Dom Gym',
            page: 2,
        })

        expect(gym).toHaveLength(2)
        expect(gym).toEqual([
            expect.objectContaining({ name: 'Dom Gym 21' }),
            expect.objectContaining({ name: 'Dom Gym 22' }),
        ])
    })
})