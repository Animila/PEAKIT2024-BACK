import {Request} from 'express'
export interface IFileRequest<T = {}> extends Request {
    query: {}
    params: {
        entity_type: string
        entity_id: string
        id: string
    }
    body: T | any
}

export interface ICreateFileRequest {
    entity_type: string
    entity_id: string
}