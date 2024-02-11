import express, { Request, Response, Router } from 'express'
import {IAccountRequest, ILoginRequest, IRegisterRequestDTO} from "./IAccountDTO";
import {IAccountService} from "./IAccountService";
import {AccountMap} from "../../mappers/AccountMap";
import {IAccountRepo} from "../../repositories/IAccountRepo";
import {PrismaAccountRepo} from "../../infrastructures/prisma/PrismaAccountRepo";
import AccountServiceImpl from "./AccountServiceImpl";

export class AccountController {
	private router: Router = express.Router()
	private accountService: IAccountService;

	constructor(accountService: IAccountService) {
		this.accountService = accountService

		this.router.post('/users/register', this.register) // создать
		this.router.post('/users/login', this.login) // создать
		this.router.get('/users/:id') // получить пользователя
		this.router.put('/users') // обновить
	}

	 private register = async (req: IAccountRequest<IRegisterRequestDTO>, res: Response) => {
		try {
			const data: IRegisterRequestDTO = req.body
			const newAccount = await this.accountService.signUp(data)
			const accountToHTTP = await AccountMap.toPersistence(newAccount)
			res.send({ data: accountToHTTP })
		} catch (err: any) {
			console.log('2345', err)
			res.status(500).send({message: err.message})
		}
	}

	private login = async (req: IAccountRequest<ILoginRequest>, res: Response) => {
		try {
			const data: ILoginRequest = req.body
			const newAccount = await this.accountService.login(data.password, data.email)
			const accountToHTTP = await AccountMap.toPersistence(newAccount)
			res.send({ data: accountToHTTP })
		} catch (err: any) {
			console.log('2345', err)
			res.status(500).send({message: err.message})
		}
	}

	// private getMe(req: Request, res: Response) {
	// 	res.send('тест')
	// }

	public use(): Router {
		return this.router
	}
}
