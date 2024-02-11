import { AccountController } from '../../useCases/Account/AccountController'
import {IAccountService} from "../../useCases/Account/IAccountService";
import {IAccountRepo} from "../../repositories/IAccountRepo";
import {PrismaAccountRepo} from "../prisma/PrismaAccountRepo";
import AccountServiceImpl from "../../useCases/Account/AccountServiceImpl";

export class RESTConfiguration {
	private accountService: IAccountService;
	constructor(accountService: IAccountService) {
		this.accountService = accountService
	}

	public accountController(): AccountController {
		return new AccountController(this.accountService)
	}
}
