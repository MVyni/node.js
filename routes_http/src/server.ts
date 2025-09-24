import fastify from 'fastify'
import { env } from './env/index.js'
import { transactionsRoutes } from './routes/transactions.js'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)

app.addHook('preHandler', async (req) => {
  console.log(`${req.method} ${req.url}`)
})

app.register(transactionsRoutes, {
  prefix: 'transactions'
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log('HTTP Server Running'))
