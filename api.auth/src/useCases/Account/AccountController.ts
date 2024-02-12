import express, { Request, Response, Router } from 'express'
import {IAccountRequest, ILoginRequest, IRegisterRequestDTO} from "./IAccountDTO";
import {IAccountService} from "./IAccountService";
import {AccountMap} from "../../mappers/AccountMap";
import {IAccountRepo} from "../../repositories/IAccountRepo";
import {PrismaAccountRepo} from "../../infrastructures/prisma/PrismaAccountRepo";
import AccountServiceImpl from "./AccountServiceImpl";
import jwt from "jsonwebtoken";
import {JWT} from "../../infrastructures/JWT/JWT";
import {checkJWT} from "./AccountMiddleware";

export class AccountController {
	private router: Router = express.Router()
	private accountService: IAccountService;
	private jwtToken = new JWT()

	constructor(accountService: IAccountService) {
		this.accountService = accountService

		this.router.post('/users/register', this.register) // создать
		this.router.post('/users/login', this.login) // создать
		this.router.get('/users',checkJWT, this.getUser) // получить пользователя
		this.router.put('/users',checkJWT) // обновить
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
			const token = this.jwtToken.generateToken(accountToHTTP.id, [accountToHTTP.user_role])
			res.send({ data: token })
		} catch (err: any) {
			console.log('2345', err)
			res.status(500).send({message: err.message})
		}
	}

	private getUser = async (req: IAccountRequest, res: Response) => {
		const token = req.headers.authorization?.split(' ')[1]
		const accountId = this.jwtToken.getMeAccountIDJWT(token || '')
		const account = await this.accountService.findAccountById(parseInt(accountId))
		if(!account) {
			res.status(404).send({message: 'Пользователь не найден'})
			return
		}
		res.send({data: account})

	}

	public use(): Router {
		return this.router
	}
}
