import { expect, describe, it } from 'vitest'
import { RegisterUserService } from './registerUser.js'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UserAlreadyExistError } from './errors/user-already-exist-error.js'

describe('Register Service', async () => {
    
    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUserService = new RegisterUserService(usersRepository)

        const { user } = await registerUserService.execute({
            name: 'Domnic Ferreira',
            email: 'dominicferreira@test.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('Should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUserService = new RegisterUserService(usersRepository)

        const { user } = await registerUserService.execute({
            name: 'Domnic Ferreira',
            email: 'dominicferreira@test.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUserService = new RegisterUserService(usersRepository)

        const email: string = 'dominicferreira@test.com'

         await registerUserService.execute({
            name: 'Domnic Ferreira',
            email,
            password: '123456'
        })

        await expect(() => registerUserService.execute({
            name: 'Domnic Ferreira',
            email,
            password: '123456'
        })).rejects.toBeInstanceOf(UserAlreadyExistError)
    })
})
    
