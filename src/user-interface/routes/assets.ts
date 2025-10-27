import { AssetController } from '@ui/controllers/assets/AssetController'
import express from 'express'
import { imageUpload, pdfUpload } from '@infra/middlewares/upload'

const assetController = new AssetController()

const assetRouter = express.Router()

assetRouter.post(
    '/upload-image',
    imageUpload.single('image'),
    assetController.uploadImage
)

assetRouter.post(
    '/upload-file',
    pdfUpload.single('file'),
    assetController.uploadPdf
)

export { assetRouter }
