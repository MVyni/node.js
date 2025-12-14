import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { ValidateCheckInService } from './validate-check-in.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Validate Check in Service', async () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckInService(checkInsRepository) //SUT => System Under Test => The principal variable

       // vi.isFakeTimers()
    })

    afterEach(() => {
        //vi.useRealTimers()
    })

    it('should be able to validate check-in', async () => {
        const createdCheckIn = await checkInsRepository.create({
            user_id: 'user-01',
            gym_id: 'gym-01',
        })


        await sut.execute({
            checkInId: createdCheckIn.id
        })

        expect(createdCheckIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepository.items[0]?.validated_at).toEqual(expect.any(Date))
    })

    it('should not be able to validate inexistent check-in', async () => {
        await expect(() =>
            sut.execute({
                checkInId: 'inexistent-check-in-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})