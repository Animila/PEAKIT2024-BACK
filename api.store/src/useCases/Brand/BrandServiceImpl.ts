import {IBrandService} from "./IBrandService";
import {Brand} from "../../domains/Brand";
import {IBrandRepo} from "../../repositories/IBrandRepo";
import {BrandMap} from "../../mappers/BrandMap";
import {ICreateBrandRequest} from "./BrandTDO";

export class BrandServiceImpl implements IBrandService {
    private brandRepo: IBrandRepo
    constructor(brandRepo: IBrandRepo) {
        this.brandRepo = brandRepo
    }
    async create(brand: ICreateBrandRequest): Promise<Brand> {
        const newBrand = Brand.create({
            title: brand.title,
            description: brand.description
        })
        if (newBrand.isFailure) {
            throw new Error('Ошибка создания бренда')
        }
        const brandSave = await this.brandRepo.save(newBrand.getValue()!)
        if(!brandSave) throw new Error('Ошибка сохранения бренда')
        return BrandMap.toPersistence(brandSave)
    }

    async getAll(): Promise<any> {
        const data = await this.brandRepo.getAll()
        return await Promise.all(data.map(async item => {
            if(item) return await BrandMap.toPersistence(item)
            return null
        }))

    }

    async getById(id: number): Promise<Brand | null> {
        const brand = await this.brandRepo.findById(id)
        if(!brand) throw new Error('Бренд не найден')
        return BrandMap.toPersistence(brand)
    }

}