import fastify from 'fastify'
import { PrismaClient } from './generated/prisma/client.js'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
    data: {
        name: 'Marcus Vynicius',
        email: 'marcusvynicius@teste.com',
    },
})
