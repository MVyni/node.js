import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInService } from './check-in.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Check-ins Service', async () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInService(checkInsRepository) //SUT => System Under Test => The principal variable

        vi.isFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {

        vi.setSystemTime(new Date(2025, 12, 6))
        
        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })

        await expect(() => sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in twice but in differents day', async () => {

        vi.setSystemTime(new Date(2025, 12, 6))

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })

        vi.setSystemTime(new Date(2025, 13, 6))

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })
        expect(checkIn.id).toEqual(expect.any(String))
    })
})