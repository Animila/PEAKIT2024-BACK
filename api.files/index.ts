// index.ts
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import path from 'path'
import attachRoutes from './API/Routes/image'
const fileUploads = require('express-fileupload')

const app = express()
const PORT = 8900
const corsOptions = {
	credentials: true,
	origin: 'https://oneseljob.com',
}

app.use(express.json({ strict: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUploads())
app.use('/file/storage', express.static(path.join(__dirname, 'storage')))
app.use(cors(corsOptions))

attachRoutes(app)

const start = () => {
	app.listen(PORT, '0.0.0.0', () => {
		console.log(`Server listening on ${PORT}`)
	})
}

start()
