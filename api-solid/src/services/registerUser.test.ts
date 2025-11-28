import { expect, describe, it } from 'vitest'
import { RegisterUserService } from './registerUser.js'
import { compare } from 'bcryptjs'

describe('Register Service', () => {
    it('Should hash user password upon registration', async () => {
        const registerUserService = new RegisterUserService({
            async create(data) {
                return {
                    id: 'user1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date()
                }
            }
        })

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
})
    
