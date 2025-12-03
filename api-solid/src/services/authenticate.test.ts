import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { AuthenticateService } from './authenticate.js'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'

describe('Authenticate Service', async () => {

    it('should be able to authenticate', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateService(usersRepository) //SUT => System Under Test => The principal variable

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
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateService(usersRepository)

        await expect(() => sut.execute({
            email: 'dominicferreira@test.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateService(usersRepository)

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