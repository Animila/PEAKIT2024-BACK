import {Brand} from "../../domains/Brand";
import {ICreateBrandRequest} from "./BrandTDO";

export interface IBrandService {
    getAll(): Promise<any>
    getById(id: number): Promise<Brand | null>
    create(brand: ICreateBrandRequest): Promise<Brand>
}