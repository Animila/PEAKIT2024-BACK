import {IStoriesService} from "./IStoriesService";
import {Storie} from "../../domain/Storie";
import {IStorieRepo} from "../../repositories/IStorieRepo";
import {StoriesMap} from "../../mappers/StoriesMap";

export class StoriesServiceImpl implements IStoriesService {
    private storieRepo: IStorieRepo;

    constructor(storieRepo: IStorieRepo) {
        this.storieRepo = storieRepo
    }
    async getAll(): Promise<any> {
        const stories = await this.storieRepo.getAll()
        return await Promise.all(stories.map( async (item: any) => {
            if(item) return await StoriesMap.toPersistance(item)
            return null
        }))
    }

}