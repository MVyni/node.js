import { Prisma, type User } from "@/generated/prisma/client.js"

export interface UsersRepository {
    create(data: Prisma.UserCreateInput) : Promise<User>
}