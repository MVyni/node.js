import type { FastifyInstance } from "fastify"
import { knex } from "../database.js"
import { z } from "zod"
import { randomUUID } from "node:crypto"
import { checkUserSessionIdExist } from "../middlewares/check-user-sessioId-exists.js"

export async function transactionsRoutes(app: FastifyInstance) {

    app.get('/', {
        preHandler: [
            checkUserSessionIdExist
        ]
    }, async (req) => {

        const sessionId = req.cookies.sessionId

        const transactions = await knex('transactions')
            .select()
            .where('session_id', sessionId)

        return { transactions }
    })

    app.get('/:id', {
        preHandler: [
            checkUserSessionIdExist
        ]
    }, async (req) => {

        const sessionId = req.cookies.sessionId

        const getTransactionParamsSchema = z.object({
            id: z.string()
        })

        const { id } = getTransactionParamsSchema.parse(req.params)

        const transaction = await knex('transactions')
            .select()
            .where({
                session_id: sessionId,
                id,
            })
            .first()

        return { transaction }
    })

    app.get('/summary', {
        preHandler: [
            checkUserSessionIdExist
        ]
    }, async (req) => {

        const sessionId = req.cookies.sessionId

        const summary = await knex('transactions')
            .where('session_id', sessionId)
            .sum('amount', { as: 'amount' })
            .first()

        return { summary }
    })


    app.post('/', async (req, res) => {

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })

        const { title, amount, type } = createTransactionBodySchema.parse(req.body)

        let sessionId = req.cookies.sessionId // Creating user cookie

        if (!sessionId) {
            sessionId = randomUUID()

            res.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 days
            })
        }

        await knex('transactions')
            .insert({
                id: randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1,
                session_id: sessionId
            })
        return res.status(201).send("Transaction created successfull!")
    })
}