import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { AuthenticateService } from './authenticate.js'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', async () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateService(usersRepository) //SUT => System Under Test => The principal variable
    })

    it('should be able to authenticate', async () => {

        await usersRepository.create({
            name: 'Dominic Ferreira',
            email: 'dominicferreira@test.com',
            password_hash: await hash('123456', 6),
        })

        const { user } = await sut.execute({
            email: 'dominicferreira@test.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {

        await expect(() => sut.execute({
            email: 'dominicferreira@test.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {

        await usersRepository.create({
            name: 'Dominic Ferreira',
            email: 'dominicferreira@test.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() => sut.execute({
            email: 'dominicferreira@test.com',
            password: '123456875'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})