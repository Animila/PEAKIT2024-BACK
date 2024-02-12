import {Brand} from "../domains/Brand";

export interface IBrandRepo  {
    getAll(): Promise<(Brand | null)[]>
    save(brand: Brand): Promise<Brand | null>
    findById(id: number): Promise<Brand | null>
}