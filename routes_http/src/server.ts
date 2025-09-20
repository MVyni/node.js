import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database.js'


const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .where('amount', 2000)
    .select('*')
  return transaction
})

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('HTTP Server Running'))
