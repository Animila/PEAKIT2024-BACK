import 'dotenv/config'
import fs from 'fs'
import App from './app'
import { RESTConfiguration } from './infrastructures/http/RESTConfiguration'
import {PrismaBrandRepo} from "./infrastructures/prisma/PrismaBrandRepo";
import {BrandServiceImpl} from "./useCases/Brand/BrandServiceImpl";

const corsDomains: string[] = [
	process.env.DOMAIN_URL || 'www.hackaton-yakse.ru',
]

try {
	const brandRepo =  new PrismaBrandRepo()

	const brandService =  new BrandServiceImpl(brandRepo)
	const rest = new RESTConfiguration(brandService)

	const app = new App(
		[rest.brandController().use()],
		Number(process.env.PORT),
		corsDomains
	)
	app.listen()
} catch (error) {
	throw new Error('' + error)
}
