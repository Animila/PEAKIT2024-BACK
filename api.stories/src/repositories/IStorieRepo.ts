import {Storie} from "../domain/Storie";

export interface IStorieRepo {
    getAll(): Promise<(Storie | null)[]>
    save(data: Storie): Promise<Storie | null>
    findById(id: number): Promise<Storie | null>
}