import { AppAbstractController } from '@shared/user-interface/controller/AppAbstractController'
import { Response } from 'express'
import AbstractFileUploadService from '../../../application/services/AbstractFileUploadService'
import { ImageUploadService } from '@infra/upload/vercel/ImageUploadService'

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
}
