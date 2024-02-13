import {Storie} from "../../domain/Storie";

export interface IStoriesService {
    getAll(): Promise<Storie>
}