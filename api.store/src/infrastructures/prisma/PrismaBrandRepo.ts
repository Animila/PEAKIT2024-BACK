import {IBrandRepo} from "../../repositories/IBrandRepo";
import {Brand} from "../../domains/Brand";
import {PrismaClient} from "@prisma/client";
import {BrandMap} from "../../mappers/BrandMap";

export class PrismaBrandRepo implements IBrandRepo {

    prisma = new PrismaClient()
    async getAll(): Promise<(Brand | null)[]> {
        const brands = await this.prisma.brand.findMany()
        const brandsToDomain = brands.map(item => {
            return BrandMap.toDomain(item)
        })
        return brandsToDomain
    }
    async findById(id: number): Promise<Brand | null> {
        const brand = await this.prisma.brand.findUnique({where: {id}})
        if(!brand) return null
        return BrandMap.toDomain(brand)
    }

    async save(brand: Brand): Promise<Brand | null> {
        const data = await BrandMap.toPersistence(brand)
        const result = await this.prisma.brand.upsert({
            where: {id: data.id},
            create: data,
            update: data
        })
        if(!result) return null
        return BrandMap.toDomain(result)
    }

}