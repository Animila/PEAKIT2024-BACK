import {IProductService} from "./IProductService";
import {Brand} from "../../domains/Brand";
import {IBrandRepo} from "../../repositories/IBrandRepo";
import {BrandMap} from "../../mappers/BrandMap";
import {ICreateProductRequest} from "./ProductTDO";
import {Product} from "../../domains/Product";
import {ProductMap} from "../../mappers/ProductMap";
import {IProductRepo} from "../../repositories/IProductRepo";

export class ProductServiceImpl implements IProductService {
    private productRepo: IProductRepo
    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo
    }
    async create(brand: ICreateProductRequest): Promise<Product | null> {
        // const newBrand = Brand.create({
        //     title: brand.title,
        //     description: brand.description
        // })
        // if (newBrand.isFailure) {
        //     throw new Error('Ошибка создания бренда')
        // }
        // const brandSave = await this.brandRepo.save(newBrand.getValue())
        // if(!brandSave) throw new Error('Ошибка сохранения бренда')
        // return brandSave
        throw new Error('')
    }

    async getAll(query: any): Promise<any> {
        const {brand_id, search, minPrice, maxPrice} = query
        console.log(brand_id, search, minPrice, maxPrice)

        const data = await this.productRepo.getAll({brand_id, search, minPrice, maxPrice})
        return await Promise.all(data.map(async (item: any) => {
            if(item) return await ProductMap.toPersistence(item)
            return null
        }))

    }

    async getByBrandId(brand_id: number): Promise<Product[] | null> {
        throw new Error('')
    }

    async getById(id: number): Promise<Product | null> {
        const data = await this.productRepo.findById(id)
        if(!data) throw new Error('Товар не найден')
        return ProductMap.toPersistence(data)
    }

    search(text: string): Promise<Product[] | null> {
        throw new Error('')
    }





}