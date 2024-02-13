import {IStorieRepo} from "../../repositories/IStorieRepo";
import {Storie} from "../../domain/Storie";
import {PrismaClient} from "@prisma/client";
import {StoriesMap} from "../../mappers/StoriesMap";

export class PrismaStoriesRepo implements IStorieRepo {
    prisma = new PrismaClient()
    async findById(id: number): Promise<Storie | null> {
        const storie = await this.prisma.storie.findUnique({where: {id}})
        if(!storie) return null
        return StoriesMap.toDomain(storie)
    }

    async getAll(): Promise<(Storie | null)[]> {
        const stories = await this.prisma.storie.findMany()
        const storiesToDomain = stories.map(item => {
            return StoriesMap.toDomain(item)
        })
        return storiesToDomain
    }

    async save(data: Storie): Promise<Storie | null> {
        const persisData = StoriesMap.toPersistance(data)
        const saved = await this.prisma.storie.upsert({
            where: {id: persisData.id},
            update: persisData,
            create: persisData
        })
        if(!saved) return null
        return StoriesMap.toDomain(saved)
    }

}