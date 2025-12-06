import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { CheckInService } from './check-in.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Authenticate Service', async () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInService(checkInsRepository) //SUT => System Under Test => The principal variable
    })

    it('should be able to authenticate', async () => {

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})