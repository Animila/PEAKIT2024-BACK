import {ISlideRepo} from "../../repositories/ISlideRepo";
import {PrismaClient} from "@prisma/client";
import {Slide} from "../../domain/Slide";
import {SlideMap} from "../../mappers/SlideMap";

export class PrismaSlideRepo implements ISlideRepo {
    prisma = new PrismaClient()
    async findById(id: number): Promise<Slide | null> {
        const slide = await this.prisma.slide.findUnique({
            where: {id}
        })
        if(!slide) return null
        return SlideMap.toDomain(slide)
    }

    async getAllByStorieId(storeId: number): Promise<(Slide | null)[]> {
        const slides = await this.prisma.slide.findMany({
            where: {stories_id: storeId}
        })
        const slidesToDomain = slides.map(item => {
            return SlideMap.toDomain(item)
        })
        return slidesToDomain
    }

    async save(slide: Slide): Promise<Slide | null> {
        const data = SlideMap.toPersistance(slide)
        const saved = await this.prisma.slide.upsert({
            where: {id: data.id},
            create: data,
            update: data
        })
        if(!saved) return null
        return SlideMap.toDomain(saved)
    }

}