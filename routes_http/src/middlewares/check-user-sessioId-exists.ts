import type { FastifyRequest, FastifyReply } from "fastify";

export async function checkUserSessionIdExist(req: FastifyRequest, res: FastifyReply) {
    const sessionId = req.cookies.sessionId

    if (!sessionId) {
        return res.status(401).send("Unathourized")
    }
}