import type { FastifyInstance } from "fastify"
import { knex } from "../database.js"
import { z } from "zod"
import { randomUUID } from "node:crypto"

export async function transactionsRoutes(app: FastifyInstance) {

    app.post('/', async (req, res) => {

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })

        const { title, amount, type } = createTransactionBodySchema.parse(req.body)

        knex('transactions')
            .insert({
                id: randomUUID(),
                title,
                amount,
                type: type === 'credit' ? amount : amount * -1
            })
        return res.status(201).send("Transaction created successfull!")
    })
}