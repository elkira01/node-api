import { Response } from 'express'
import AbstractFileUploadService from '../../../core/application/services/AbstractFileUploadService'
import { AppAbstractController } from '../../../shared-kernel/user-interface/controller/AppAbstractController'
import { ImageUploadService } from '../../../infrastructure/upload/vercel/ImageUploadService'
import { PdfUploadService } from '../../../infrastructure/upload/vercel/PdfUploadService'

export class AssetController extends AppAbstractController {
    private uploadService: AbstractFileUploadService | undefined

    uploadImage = this.asyncHandler(async (req: any, res: Response) => {
        this.uploadService = new ImageUploadService('default-images')

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }

        const uploaded = await this.uploadService.uploadFile({
            name: req.file.originalname,
            buffer: req.file.buffer,
        })

        res.status(200).json({ url: uploaded })
    })

    uploadPdf = this.asyncHandler(async (req: any, res: Response) => {
        this.uploadService = new PdfUploadService()

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }

        const uploaded = await this.uploadService.uploadFile({
            name: req.file.originalname,
            buffer: req.file.buffer,
        })

        res.status(200).json({ url: uploaded })
    })
}
