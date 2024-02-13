import {Storie} from "../domain/Storie";
import {Slide} from "../domain/Slide";

export interface ISlideRepo {
    getAllByStorieId(storeId: number): Promise<(Slide | null)[]>
    save(slide: Slide): Promise<Slide | null>
    findById(id: number): Promise<Slide | null>
}