// @ts-ignore
import {Product as PersistanceProduct} from "@prisma/client";
import {UniqueEntityID} from "../../support/domain/UniqueEntityID";
import {Product} from "../domains/Product";
import Decimal from 'decimal.js';
export class ProductMap {
    public static toDomain(raw: PersistanceProduct): Product | null {

        const productOrError = Product.create({
            title: raw.title,
            description: raw.description,
            about: raw.about,
            price: raw.price.toString(),
            brand_id: raw.brand_id,
            content: raw.content,
            code: raw.code,
            priceM: raw.priceM,
            created_at: raw.created_at,
            type: raw.type
        },
            new UniqueEntityID(raw.id))

        if (productOrError.isFailure) {
            console.log(productOrError.error)
            return null
        }

        if (productOrError.isSuccess) {
            return productOrError.getValue()!
        }

        return null

    }

    public static async toPersistence(product: Product): Promise<any> {
        return {
            id: product.id.toValue(),
            title: product.getTitle(),
            description: product.getDescription(),
            about: product.getAbout(),
            price: product.getPrice(),
            brand_id: product.getBrandId(),
            content: product.getContentProduct(),
            code: product.getCodeProduct(),
            priceM: product.getPriceMEd(),
            type: product.getTypeProduct(),
            created_at: product.getDateCreate(),
        }
    }
}