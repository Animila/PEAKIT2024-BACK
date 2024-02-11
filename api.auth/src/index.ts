import 'dotenv/config'
import fs from 'fs'
import App from './app'
import { RESTConfiguration } from './infrastructures/http/RESTConfiguration'
import {PrismaAccountRepo} from "./infrastructures/prisma/PrismaAccountRepo";
import {IAccountService} from "./useCases/Account/IAccountService";
import {IAccountRepo} from "./repositories/IAccountRepo";
import AccountServiceImpl from "./useCases/Account/AccountServiceImpl";

const corsDomains: string[] = [
	process.env.DOMAIN_URL || 'www.hackaton-yakse.ru',
]

const httpsOptions = {
	key: fs.readFileSync('./ssl/cert.crt'),
	cert: fs.readFileSync('./ssl/privkey.key'),
}
try {
	const accountRepo =  new PrismaAccountRepo()

	const accountService =  new AccountServiceImpl(accountRepo)
	const rest = new RESTConfiguration(accountService)

	const app = new App(
		[rest.accountController().use()],
		Number(process.env.PORT),
		corsDomains
	)
	app.listen()
} catch (error) {
	throw new Error('' + error)
}
