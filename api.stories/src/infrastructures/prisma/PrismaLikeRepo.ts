import {ILikeRepo} from "../../repositories/ILikeRepo";
import {Like} from "../../domain/Like";
import {PrismaClient} from "@prisma/client";
import {LikeMap} from "../../mappers/LikeMap";
import {SlideMap} from "../../mappers/SlideMap";

export class PrismaLikeRepo implements ILikeRepo {
    prisma = new PrismaClient()
    async findById(id: number): Promise<Like | null> {
        const like = await this.prisma.like.findUnique({where: {id}})
        if(!like) return like
        return LikeMap.toDomain(like)
    }

    async getAllByAccountId(accountId: number): Promise<(Like | null)[]> {
        const likes = await this.prisma.like.findMany({where: {account_id: accountId}})
        const likesToDomain = likes.map(item => {
            return LikeMap.toDomain(item)
        })
        return likesToDomain
    }

    async getAllByStoriesId(storeId: number): Promise<(Like | null)[]> {
        const likes = await this.prisma.like.findMany({where: {stories_id: storeId}})
        const likesToDomain = likes.map(item => {
            return LikeMap.toDomain(item)
        })
        return likesToDomain
    }

    async save(data: Like): Promise<Like | null> {
        const persisData = LikeMap.toPersistance(data)
        const saved = await this.prisma.like.upsert({
            where: {id: persisData.id},
            create: persisData,
            update: persisData
        })
        if(!saved) return null
        return LikeMap.toDomain(saved)
    }

}