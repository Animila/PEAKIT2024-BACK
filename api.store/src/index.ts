import 'dotenv/config'
import fs from 'fs'
import App from './app'
import { RESTConfiguration } from './infrastructures/http/RESTConfiguration'
import {PrismaBrandRepo} from "./infrastructures/prisma/PrismaBrandRepo";
import {BrandServiceImpl} from "./useCases/Brand/BrandServiceImpl";
import {PrismaProductRepo} from "./infrastructures/prisma/PrismaProductRepo";
import {ProductServiceImpl} from "./useCases/Product/ProductServiceImpl";

const corsDomains: string[] = [
	process.env.DOMAIN_URL || 'www.hackaton-yakse.ru',
]

try {
	const brandRepo =  new PrismaBrandRepo()
	const productRepo =  new PrismaProductRepo()
	const brandService =  new BrandServiceImpl(brandRepo)
	const productService =  new ProductServiceImpl(productRepo)

	const rest = new RESTConfiguration(brandService, productService)

	const app = new App(
		[rest.brandController().use(), rest.productController().use()],
		Number(process.env.PORT),
		corsDomains
	)
	app.listen()
} catch (error) {
	throw new Error('' + error)
}
