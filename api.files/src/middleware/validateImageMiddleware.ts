import { NextFunction, Response } from 'express'

export default function validateImageMiddleware(
	req: any,
	res: Response,
	next: NextFunction
) {
	try {
		const { image } = req.files
		const { entity_type, entity_id } = req.body
		const allowTypes = [
			'image/jpeg',
			'image/png',
			'image/jpg',
			'image/avif',
			'image/svg+xml',
			'image/webp',
			'image/bmp',
			'image/x-icon',
			'image/tiff',
		] // Add more types as needed

		if (!entity_type) {
			throw new Error('Нет entity_type в body')
		}

		if (!entity_id) {
			throw new Error('Нет entity_id в body')
		}

		if (!image || !allowTypes.includes(image.mimetype)) {
			throw new Error('Не подходящий тип файла')
		}

		next()
	} catch (error: any) {
		return res.status(400).json({
			success: false,
			message: error.message,
		})
	}
}
