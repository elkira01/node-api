import express from 'express'
import { AssetController } from '../controllers/assets/AssetController'
import { imageUpload, pdfUpload } from '../../infrastructure/middlewares/upload'

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
