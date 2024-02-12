import {Brand} from "../domains/Brand";
import {Product} from "../domains/Product";

export interface IProductRepo {
    getAll(): Promise<Product[]>
    save(product: Product): Promise<Product | null>
    findById(id: number): Promise<Product | null>
    search(search: string): Promise<(Product | null)[]>
    getByBrandId(brand_id: number): Promise<(Product | null)[]>
}