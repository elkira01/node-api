import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { PublicationCategoryController } from '../controller/PublicationCategoryController'

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

publicationCategoryRouter.get(
    '/:id',
    expressAsyncHandler(categoryController.getOne)
)

publicationCategoryRouter.patch(
    '/:id/update',
    expressAsyncHandler(categoryController.update)
)

publicationCategoryRouter.delete(
    '/:id/delete',
    expressAsyncHandler(categoryController.delete)
)

export default publicationCategoryRouter
