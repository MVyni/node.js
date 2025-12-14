import type { Gym, Prisma } from "@/generated/prisma/client.js";

export interface GymsRepository {
    findById(id: string): Promise<Gym | null>
    search(query: string, page: number): Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}