import { Request } from 'express'

export interface IAccountRequest<T ={}> extends Request {
	params: {
		accountId: string
	}
	query: {}
	body: T | any
}

export interface IRegisterRequestDTO {
	email: string
	phone: string
	password: string
}

export interface ILoginRequest {
	email: string
	password: string
}

export interface IUpdateRequestDTO {
	id?: number
	email?: string
	phone?: string
	password?: string
}