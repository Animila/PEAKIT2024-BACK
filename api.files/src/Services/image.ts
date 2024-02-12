import { format } from 'date-fns'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import FileModel from '../models/file.model'

const ImageServices = {
	async upload(image: any, type: string, entity_id: number) {
		if (!image || !image.data) {
			console.error('Invalid image data')
			return // or handle the error accordingly
		}
		const currentDate = new Date()
		const formattedDate = format(currentDate, 'yyyy-MM-dd_HH-mm-ss')
		const uniqueCode = uuidv4()
		const fileName = `${formattedDate}_${uniqueCode}.jpg`
		const storageDirectory = path.join(__dirname, '../../storage', type)
		if (!fs.existsSync(storageDirectory)) {
			fs.mkdirSync(storageDirectory, { recursive: true })
		}
		const typeDirectory = path.join(storageDirectory, 'image')
		if (!fs.existsSync(typeDirectory)) {
			fs.mkdirSync(typeDirectory, { recursive: true })
		}
		const pathDirectory = path.join(typeDirectory, fileName)

		const maxWidth = 1000
		const maxHeight = 1000

		await sharp(image.data)
			.resize({
				width: maxWidth,
				height: maxHeight,
				fit: sharp.fit.inside,
				withoutEnlargement: true,
			})
			.jpeg({ quality: 80 })
			.toFile(pathDirectory, (err, info) => {
				if (err) {
					console.error('Ошибка преобразования ' + err)
					throw new Error('Ошибка преобразования ' + err)
				} else {
					FileModel.create(
						fileName,
						'/' + type + '/image/' + fileName,
						type,
						entity_id,
						'image'
					)
				}
			})
		return '/' + type + '/image/' + fileName
	},
	async delete(id: string) {
		try {
			const relativePath = await FileModel.getPathById(parseInt(id))

			const absolutePath = path.join(
				__dirname,
				'../../storage',
				relativePath.path
			)

			// Delete the file from the server
			if (fs.existsSync(absolutePath)) {
				fs.unlinkSync(absolutePath)
			}

			// Delete the file record from the database
			await FileModel.delete(parseInt(id))
		} catch (error: any) {
			throw new Error(`Error deleting image: ${error.message}`)
		}
	},
}

export default ImageServices
