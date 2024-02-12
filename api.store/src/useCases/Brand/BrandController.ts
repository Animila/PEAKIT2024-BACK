// @ts-ignore
import express, { Request, Response, Router } from 'express'

import {IBrandService} from "./IBrandService";
import {IBrandRequest, ICreateBrandRequest} from "./BrandTDO";
import {BrandMap} from "../../mappers/BrandMap";

export class BrandController {
    private router: Router = express.Router()
    private brandService: IBrandService;

    constructor(brandService: IBrandService) {
        this.brandService = brandService

        this.router.get('/brand', this.getAll) // получить все бренды
        this.router.get('/brand/:brand_id', this.getById) // получить бренд
        this.router.post('/brand', this.create) // создать бренд
    }

    private getAll = async (req: IBrandRequest, res: Response) => {
        try {
            const data = await this.brandService.getAll()
            res.send({data: data})
        } catch (err: any) {
            res.status(500).send({message: err.message})
        }

    }

    private getById = async (req: IBrandRequest, res: Response) => {
        try {
            const {brand_id} = req.params
            const data = await this.brandService.getById(parseInt(brand_id))
            res.send({data: data})
        } catch (err: any) {
            res.status(500).send({message: err.message})
        }
    }

    private create = async (req: IBrandRequest<ICreateBrandRequest>, res: Response) => {
        try {
            const data: ICreateBrandRequest = req.body
            const brand = await this.brandService.create(data)
            res.send({data: brand})
        } catch (err: any) {
            res.status(500).send({message: err.message})
        }

    }

    public use(): Router {
        return this.router
    }
}
