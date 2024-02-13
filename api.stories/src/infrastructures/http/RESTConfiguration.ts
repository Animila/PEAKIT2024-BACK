import {IStoriesService} from "../../useCases/Stories/IStoriesService";
import {StoriesController} from "../../useCases/Stories/StoriesController";

export class RESTConfiguration {
    private storiesService: IStoriesService
    constructor(storiesService: IStoriesService) {
        this.storiesService = storiesService
    }
    public storiesController(): StoriesController {
        return new StoriesController(this.storiesService)
    }
}