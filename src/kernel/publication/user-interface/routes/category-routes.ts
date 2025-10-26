import express from 'express'
import expressAsyncHandler from 'express-async-handler'

import { PublicationCategoryController } from '@app/publication/user-interface/controller/PublicationCategoryController'

const categoryController = new PublicationCategoryController()

const publicationCategoryRouter = express.Router()

publicationCategoryRouter.get(
    '/collection',
    expressAsyncHandler(categoryController.getAll)
)

publicationCategoryRouter.post(
    '/create',
    expressAsyncHandler(categoryController.create)
)

export default publicationCategoryRouter
