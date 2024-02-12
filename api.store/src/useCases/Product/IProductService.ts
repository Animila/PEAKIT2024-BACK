import {Brand} from "../../domains/Brand";
import {ICreateProductRequest} from "./ProductTDO";
import {Product} from "../../domains/Product";

export interface IProductService {
    getAll(query: any): Promise<any>
    getById(id: number): Promise<Product | null>
    search(text: string): Promise<Product[] | null>
    getByBrandId(brand_id: number): Promise<Product[] | null>
    create(brand: ICreateProductRequest): Promise<Brand | null>
}