// @ts-ignore
import express, { Request, Response, Router } from 'express'

import {IProductService} from "./IProductService";
import {ICreateProductRequest, IProductRequest} from "./ProductTDO";

export class ProductController {
    private router: Router = express.Router()
    private productService: IProductService;

    constructor(productService: IProductService) {
        this.productService = productService

        this.router.get('/products', this.getAll) // получить все продукты
        this.router.get('/products/:id', this.getById) // получить продукт по id
        this.router.post('/products', this.create) // создать бренд
    }

    private getAll = async (req: IProductRequest, res: Response) => {
        try {
            const data = await this.productService.getAll()
            res.send({data: data})
        } catch (err: any) {
            res.status(500).send({message: err.message})
        }

    }

    private getById = async (req: IProductRequest, res: Response) => {
        try {
            const {id} = req.params
            const data = await this.productService.getById(parseInt(id))
            res.send({data: data})
        } catch (err: any) {
            res.status(500).send({message: err.message})
        }
    }

    private create = async (req: IProductRequest<ICreateProductRequest>, res: Response) => {
        try {
            const data: ICreateProductRequest = req.body

            const result = await this.productService.create(data)
            res.send({data: data})
        } catch (err: any) {
            res.status(500).send({message: err.message})
        }

    }


    public use(): Router {
        return this.router
    }
}
