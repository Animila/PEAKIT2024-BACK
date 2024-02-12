import {IProductRepo} from "../../repositories/IProductRepo";
import {Product} from "../../domains/Product";
import {PrismaClient} from "@prisma/client";
import {ProductMap} from "../../mappers/ProductMap";

export  class PrismaProductRepo implements IProductRepo {

    prisma = new PrismaClient()

    async getAll(): Promise<Product[]> {
        const products = await this.prisma.product.findMany()
        const domainProducts = products.map(item => {
            return ProductMap.toDomain(item)
        })
        return domainProducts
    }

    async findById(id: number): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({where: {id}})
        if(!product) return null
        return ProductMap.toDomain(product)
    }

    async getByBrandId(brand_id: number): Promise<(Product | null)[]> {
        const products = await this.prisma.product.findMany({where: {brand_id}})
        const domainProducts = products.map(item => {
            return ProductMap.toDomain(item)
        })
        return domainProducts
    }

    async save(product: Product): Promise<Product | null> {
        const data = await ProductMap.toPersistence(product)
        const result = await this.prisma.product.upsert({
            where: {id: data.id},
            update: data,
            create: data
        })
        if(!result) return null
        return ProductMap.toDomain(result)
    }

    async search(search: string): Promise<(Product | null)[]> {
        const products = await this.prisma.product.findMany({
            where: {
                OR: [
                    { title: { contains: search } },
                    { description: { contains: search } }
                ]
            }
        })
        const domainProducts = products.map(item => {
            return ProductMap.toDomain(item)
        })
        return domainProducts
    }

}