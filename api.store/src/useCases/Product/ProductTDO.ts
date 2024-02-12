import {Request} from "express";
export interface IProductRequest<T = {}> extends Request {
    params: {
        id: string

    }
    query: {
        brand_id: string
        search: string
        minPrice: string
        maxPrice: string

    }
    body: T | any
}

export interface ICreateProductRequest {
    title: string
    description: string
}
