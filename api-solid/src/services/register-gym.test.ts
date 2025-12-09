import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterGymService } from './register-gym.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'

let gymsRepository: InMemoryGymsRepository
let sut: RegisterGymService

describe('Register Service', async () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new RegisterGymService(gymsRepository)
    })

    it('should be able to register gym', async () => {


        const { gym } = await sut.execute({
            name: 'Domnic Ferreira',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})
