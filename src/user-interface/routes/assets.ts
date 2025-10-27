import { AssetController } from '@ui/controllers/assets/AssetController'
import express from 'express'
import { imageUpload } from '@infra/middlewares/upload'

const assetController = new AssetController()

const assetRouter = express.Router()

assetRouter.post(
    '/upload-image',
    imageUpload.single('image'),
    assetController.uploadImage
)

export { assetRouter }
