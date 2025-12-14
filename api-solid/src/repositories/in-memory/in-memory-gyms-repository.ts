import { Prisma, type Gym } from "@/generated/prisma/client.js"
import type { FindManyNearByParams, GymsRepository } from "../gyms-repository.js"
import { randomUUID } from "crypto"
import { getDistanceBetweenCoordinates } from "@/services/utils/get-distance-between-coordinate-gym.js"

export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = []

    async findById(id: string): Promise<Gym | null> {
        const gym = this.items.find((item) => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }

    async search(query: string, page: number){
        return this.items
            .filter((item) => item.name.includes(query))
            .slice((page - 1) * 20, page * 20)
    }

    async fetchManyNearBy(params: FindManyNearByParams) {
        return this.items.filter((item) => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: params.latitude, longitude: params.longitude },
                { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() },
            )

            return distance < 10
            })
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