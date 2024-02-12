import 'dotenv/config'
import App from './app'
import {RESTConfiguration} from "./infrastructures/http/RESTConfiguration";
import {FileServiceImpl} from "./useCases/FileServiceImpl";
import {IFileService} from "./useCases/IFileService";
import {IFileRepo} from "./repositories/IFileRepo";
import {PrismaFileRepo} from "./infrastructures/prisma/PrismaFileRepo";

const corsDomains: string[] = [
	process.env.DOMAIN_URL || 'www.hackaton-yakse.ru',
]


try {
	const fileRepo: IFileRepo = new PrismaFileRepo()
	const fileService: IFileService = new FileServiceImpl(fileRepo)
	const rest = new RESTConfiguration(fileService)

	const app = new App(
		[rest.fileController().use()],
		Number(process.env.PORT),
		corsDomains
	)
	app.listen()
} catch (error) {
	throw new Error('' + error)
}
