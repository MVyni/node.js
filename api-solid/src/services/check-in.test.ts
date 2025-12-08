import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInService } from './check-in.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { Decimal } from '@prisma/client/runtime/client'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check-ins Service', async () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInService(checkInsRepository, gymsRepository) //SUT => System Under Test => The principal variable

        gymsRepository.items.push({
            id: 'gym-01',
            name: 'Javascript gym',
            description: '',
            phone: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        })

        vi.isFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check-in twice in the same day', async () => {

        vi.setSystemTime(new Date(2025, 11, 6, 8, 0, 0))
        
        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })

        await expect(() => sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check-in twice but in differents day', async () => {

        vi.setSystemTime(new Date(2025, 11, 6, 8, 0, 0))

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })

        vi.setSystemTime(new Date(2025, 11, 7, 8, 0, 0))

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })
        expect(checkIn.id).toEqual(expect.any(String))
    })
})