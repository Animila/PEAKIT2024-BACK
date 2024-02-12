import FileModel from '../models/file.model'

const imageController = {
	async getByIdAndType(req: any, res: any) {
		try {
			const { entity_type, entity_id } = req.params

			// Assuming you have a model method to get files by entity_type and entity_id
			const files = await FileModel.getByIdAndType(entity_type, entity_id)

			res.status(200).json({
				success: true,
				data: files,
			})
		} catch (error: any) {
			console.error(error)
			res.status(500).json({
				success: false,
				message: error.message,
			})
		}
	},
}

export default imageController
