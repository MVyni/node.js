import request from 'supertest'
import { app } from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate a user', async () => {
        await request(app.server)
            .post('/users')
            .send({
                name: 'Cristiane',
                email: 'cristiane@teste.com',
                password: '123456',
            })
        
        const req = await request(app.server)
            .post('/sessions')
            .send({
                email: 'cristiane@teste.com',
                password: '123456',
            })

        expect(req.statusCode).toEqual(200)
        expect(req.body).toEqual({
            token: expect.any(String)
        })
    })
})