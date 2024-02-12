// routes.ts
import { Express, NextFunction, Request, Response } from 'express'
import imageController from '../Controllers/imageController'
import ImageServices from '../Services/image'
import validateImageMiddleware from '../middleware/validateImageMiddleware'
export default function attachRoutes(app: Express) {
	app.post(
		'/file/api/images/upload',
		validateImageMiddleware,
		(req: any, res: Response, next: NextFunction) => {
			try {
				const { image } = req.files
				const { entity_type, entity_id } = req.body

				ImageServices.upload(image, entity_type, entity_id)
					.then(result => {
						return res.status(200).json({
							success: true,
							data: result,
						})
					})
					.catch(error => {
						return res.status(500).json({
							success: false,
							message: error,
						})
					})
			} catch (error: any) {
				return res.status(500).json({
					success: false,
					message: error.message,
				})
			}
		}
	)

	app.get(
		'/file/api/images/:entity_type/:entity_id',
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				await imageController.getByIdAndType(req, res)
			} catch (error: any) {
				console.error(error)
				res.status(500).json({
					success: false,
					message: error.message,
				})
			}
		}
	)
	app.delete(
		'/file/api/images/:id',
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const { id } = req.params
				if (!id) {
					throw new Error('Нет id в params')
				}
				await ImageServices.delete(id)
				return res.status(200).json({
					success: true,
					message: 'Image deleted successfully',
				})
			} catch (error: any) {
				console.error(error)
				res.status(500).json({
					success: false,
					message: error.message,
				})
			}
		}
	)
}
