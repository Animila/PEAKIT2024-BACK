import express, {Router, Request, Response} from "express";
import {IFileService} from "./IFileService";
import {ICreateFileRequest, IFileRequest} from "./IFileDTO";
import {validateImageMiddleware} from "./FileMiddleware";

export class FileController {
    private router: Router = express.Router()
    private fileService: IFileService


    constructor(fileService: IFileService) {
        this.fileService = fileService

        this.router.post('/images/upload', validateImageMiddleware, this.loadImage)
        this.router.get('/images/:entity_type/:entity_id', this.getByEntity)
        this.router.delete('/images/:id', this.deleteById)
    }


    private loadImage = async (req: IFileRequest<ICreateFileRequest>, res: Response) => {
        try {

            const {image}: any = req.files || []
            const { entity_type, entity_id }: ICreateFileRequest = req.body

            const file = await  this.fileService.createFile(parseInt(entity_id), entity_type, image)
            res.send({data: file})
        } catch (err: any) {
            res.status(500).send({message: err.message})
        }

    }

    private getByEntity = async (req: IFileRequest, res: Response) => {
        try {
            const {entity_type, entity_id} =  req.params
            const file = await this.fileService.getByIdAndType(parseInt(entity_id), entity_type)
            res.send({data: file})
        } catch (err: any) {
            res.status(500).send({message: "" +err.message})
        }
    }

    private deleteById = async (req: IFileRequest, res: Response) => {
        try {
            const {id} =  req.params
            const files = await this.fileService.delete(parseInt(id))
            res.send({data: files})
        } catch (err: any) {
            res.status(500).send({message: "" +err.message})
        }
    }

    public use(): Router {
        return this.router
    }
}