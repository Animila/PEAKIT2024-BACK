// @ts-ignore
import {Brand as PersistanceBrand} from "@prisma/client";
import {UniqueEntityID} from "../../support/domain/UniqueEntityID";
import {Product} from "../domains/Product";
import Decimal from 'decimal.js';
import {Brand} from "../domains/Brand";
export class BrandMap {
    public static toDomain(raw: PersistanceBrand): Brand | null {

        const brandOrError = Brand.create({
                title: raw.title,
                description: raw.description,
            },
            new UniqueEntityID(raw.id))

        if (brandOrError.isFailure) {
            console.log(brandOrError.error)
            return null
        }

        if (brandOrError.isSuccess) {
            return brandOrError.getValue()!
        }

        return null

    }

    public static async toPersistence(brand: Brand): Promise<any> {
        return {
            id: brand.id.toValue(),
            title: brand.getTitle(),
            description: brand.getDescription(),

        }
    }
}