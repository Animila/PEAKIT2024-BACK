import {IProductService} from "./IProductService";
import {Brand} from "../../domains/Brand";
import {IBrandRepo} from "../../repositories/IBrandRepo";
import {BrandMap} from "../../mappers/BrandMap";
import {ICreateProductRequest} from "./ProductTDO";
import {Product} from "../../domains/Product";

export class ProductServiceImpl implements IProductService {
    private brandRepo: IBrandRepo
    constructor(brandRepo: IBrandRepo) {
        this.brandRepo = brandRepo
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

    async getAll(): Promise<any> {
        const data = await this.brandRepo.getAll()
        return await Promise.all(data.map(async item => {
            if(item) return await BrandMap.toPersistence(item)
            return null
        }))

    }

    getByBrandId(brand_id: number): Promise<Product[] | null> {
        return Promise.resolve(undefined);
    }

    getById(id: number): Promise<Product | null> {
        return Promise.resolve(undefined);
    }

    search(text: string): Promise<Product[] | null> {
        return Promise.resolve(undefined);
    }





}