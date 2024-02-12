import { db } from '../config/database'

const query = async (sql: string, values: any[] | null = null) => {
	try {
		// Используйте параметры запросов для безопасности
		const result = await db.query(sql, values)
		return result.rows
	} catch (error: any) {
		// Обработка ошибок запросов
		throw new Error(`Database query error: ${error.message}`)
	}
}

const FileModel = {
	async create(
		name: string,
		path: string,
		entity_type: string,
		entity_id: number,
		typefile: string
	) {
		const sql =
			'INSERT INTO files (name, path, typefile, entity_type, entity_id) VALUES ($1, $2, $3, $4, $5)'
		const result = await query(sql, [
			name,
			path,
			typefile,
			entity_type,
			entity_id,
		])
	},
	async getByIdAndType(entity_type: string, entity_id: number) {
		const sql =
			'SELECT * FROM files WHERE entity_type = $1 AND entity_id::varchar = $2'
		const result: any = await query(sql, [entity_type, entity_id])
		return result
	},

	async getPathById(id: number) {
		const sql = 'SELECT path FROM files where id = $1;'
		const result: any = await query(sql, [id])
		return result[0]
	},
	async delete(id: number) {
		const sql = 'DELETE FROM files where id = $1;'
		const result: any = await query(sql, [id])
		return result
	},
}

export default FileModel
