import { Prisma, type Gym } from "@/generated/prisma/client.js"
import type { GymsRepository } from "../gyms-repository.js"
import { randomUUID } from "crypto"

export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = []

    async findById(id: string): Promise<Gym | null> {
        const gym = this.items.find((item) => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
            const gym: Gym = {
                id: data.id ?? randomUUID(),
                name: data.name,
                description: data.description ?? null,
                phone: data.phone ?? null,
                latitude: new Prisma.Decimal(data.latitude.toString()),
                longitude: new Prisma.Decimal(data.longitude.toString()),
            }
            this.items.push(gym)
    
            return gym
        }
}