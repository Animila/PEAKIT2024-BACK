import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import userAgent from 'express-useragent'
import helmet from 'helmet'
import http, { Server } from 'http'
import morgan from 'morgan'
import requestIp from 'request-ip'

class App {
	public express: Application
	public port: number
	public corsDomains: string[]
	public server: Server

	constructor(
		router: express.Router[],
		port: number,
		corsDomains: string[]
		// httpsOptions: { cert: Buffer; key: Buffer }
	) {
		this.port = port
		this.corsDomains = corsDomains
		this.express = express()
		this.express.set('trust proxy', true)
		this.server = new http.Server(this.express)

		this.initMiddleware()
		this.initRoutes(router)
	}

	private initMiddleware(): void {
		this.express.use(requestIp.mw())
		this.express.use(userAgent.express())
		this.express.use(helmet())
		this.express.use(
			cors({
				credentials: true,
				origin: this.corsDomains,
			})
		)
		this.express.use(cookieParser(process.env.COOKIE_SIGNED_KEY))
		this.express.use(morgan('dev'))
		this.express.use(express.json())
		this.express.use(express.urlencoded({ extended: false }))
		this.express.use(compression())
	}

	private initRoutes(routes: express.Router[]): void {
		routes.forEach(route => {
			this.express.use('/store', route)
		})
	}

	public listen(): void {
		this.server.listen(this.port, () => {
			console.log(`Микросервис авторизации запущен на ${this.port}`)
		})
	}
}

export default App
