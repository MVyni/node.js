import { afterAll, beforeAll, describe, it, expect, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import { app } from '../app'
import request from 'supertest'

describe('Transactions routes', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(async () => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })

    it('User can create a new transaction', async () => {
        await request(app.server)
            .post('/transactions')
            .send({
                title: 'New transaction',
                amount: 2000,
                type: 'credit'
            })
            .expect(201)
    })

    it('Should be able to list all transactions', async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New transaction',
                amount: 2000,
                type: 'credit'
            })
        
        const cookies = createTransactionResponse.get('Set-Cookie')

        const listAllTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)
        
        expect(listAllTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New transaction',
                amount: 2000
            })
        ])
    })
})
