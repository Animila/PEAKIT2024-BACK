import express, {Router, Request,Response} from "express";
import {IStoriesService} from "./IStoriesService";

export class StoriesController {
    private router: Router = express.Router()
    private storiesService: IStoriesService
    constructor(storiesService: IStoriesService) {
        this.storiesService = storiesService

        this.router.get('/stories', this.getAll)
    }

    private getAll = async (req: Request, res: Response) => {
        try {
            const data = await this.storiesService.getAll()
            res.send({data: data})
        } catch (err: any) {
            res.status(500).send({message: err.message})
        }
    }

    public use(): Router {
        return this.router
    }

}