import { NextFunction, Response, Request } from 'express'

export async function validateImageMiddleware (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        console.log('1', req.files)
        console.log('2', req.body)
        const data = req.files
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
        ]

        if (!entity_type) {
            res.status(400).json({message: 'Нет entity_type в body'})
            return
        }

        if (!entity_id) {
            res.status(400).json({message: 'Нет entity_id в body'})
            return
        }

        // @ts-ignore
        if (!data ||  (data && !data.image) || (data && data.image && !allowTypes.includes(data.image.mimetype))) {
            res.status(400).json({message: 'Не подходящий тип файла'})
            return
        }

        next()
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}
