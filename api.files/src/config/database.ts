import dotenv from 'dotenv'
dotenv.config()

const { Pool } = require('pg')

// Создание подключения к базе данных Postgres
const db = new Pool({
	port: process.env.DEV_PG_DB_PORT as string,
	host: process.env.DEV_PG_DB_HOST as string,
	user: process.env.DEV_PG_DB_USER as string,
	password: process.env.DEV_PG_DB_PASS as string,
	database: process.env.DEV_PG_DATABASE as string,
	connectionLimit: 10, // проверить
	multipleStatements: false,
})

db.on('error', (error: Error) => {
	console.error('База данных не подключена:', error.message)
})

db.once('open', () => {
	console.log('БД подключена')
})

export { db }
