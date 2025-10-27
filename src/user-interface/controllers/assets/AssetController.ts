import { AppAbstractController } from '@shared/user-interface/controller/AppAbstractController'
import { Request, Response } from 'express'
import AbstractFileUploadService from '../../../application/services/AbstractFileUploadService'
import { VercelImageUploadService } from '../../../application/services/vercel/VercelImageUploadService'

export class AssetController extends AppAbstractController {
    private uploadService: AbstractFileUploadService | undefined

    uploadImage = this.asyncHandler(async (req: Request, res: Response) => {
        this.uploadService = new VercelImageUploadService('default-images')

        console.log(req)

        return await this.uploadService.uploadFile(req.body.file)
    })
}
