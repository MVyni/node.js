import type { Gym, Prisma } from "@/generated/prisma/client.js";

export interface FindManyNearByParams {
    latitude: number,
    longitude: number,
}

export interface GymsRepository {
    findById(id: string): Promise<Gym | null>
    fetchManyNearBy(params: FindManyNearByParams): Promise<Gym[]>
    searchMany(query: string, page: number): Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}