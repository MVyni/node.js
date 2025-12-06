import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { GetUserProfileService } from './get-user-profile.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', async () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileService(usersRepository) //SUT => System Under Test => The principal variable
    })

    it('should be able to get user profile', async () => {

        const createdUser = await usersRepository.create({
            name: 'Dominic Ferreira',
            email: 'dominicferreira@test.com',
            password_hash: await hash('123456', 6),
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual('Dominic Ferreira')
    })

    it('should not be able to get user profile with wrong id', async () => {

        await expect(() => sut.execute({
            userId: 'noun-existing-id'
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})