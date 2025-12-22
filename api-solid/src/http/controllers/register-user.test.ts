import request from 'supertest'
import { app } from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register a user', async () => {
        const req = await request(app.server)
            .post('/users')
            .send({
                name: 'Carolina',
                email: 'carolina@teste.com',
                password: '123456',
            })
            
        expect(req.statusCode).toEqual(201)
    })
})