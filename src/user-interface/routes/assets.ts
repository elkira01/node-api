import { AssetController } from '@ui/controllers/assets/AssetController'
import express from 'express'

const assetController = new AssetController()

const assetRouter = express.Router()

assetRouter.post('/upload-image', assetController.uploadImage)

export { assetRouter }
