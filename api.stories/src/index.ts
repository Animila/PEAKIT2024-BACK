import 'dotenv/config'
import fs from 'fs'
import App from './app'
import {RESTConfiguration} from "./infrastructures/http/RESTConfiguration";
import {PrismaStoriesRepo} from "./infrastructures/prisma/PrismaStoriesRepo";
import {StoriesServiceImpl} from "./useCases/Stories/StoriesServiceImpl";

const corsDomains: string[] = [
	process.env.DOMAIN_URL || 'www.hackaton-yakse.ru',
]

try {
	const storiesRepo = new PrismaStoriesRepo()
	const storiesService = new StoriesServiceImpl(storiesRepo)
	const rest = new RESTConfiguration(storiesService)

	const app = new App(
		[rest.storiesController().use()],
		Number(process.env.PORT),
		corsDomains
	)
	app.listen()
} catch (error) {
	throw new Error('' + error)
}
