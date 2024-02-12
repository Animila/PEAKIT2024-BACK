import {Request} from "express";
export interface IBrandRequest<T = {}> extends Request {
    params: {
        brand_id: string
    }
    query: {}
    body: T | any
}

export interface ICreateBrandRequest {
    title: string
    description: string
}
