import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { PublicationController } from '../controller/PublicationController'

const publicationController = new PublicationController()

const publicationRouter = express.Router()

publicationRouter.get(
    '/collection',
    expressAsyncHandler(publicationController.getAll)
)

publicationRouter.post(
    '/create',
    expressAsyncHandler(publicationController.create)
)

publicationRouter.get('/:id', expressAsyncHandler(publicationController.getOne))

publicationRouter.patch(
    '/:id/update',
    expressAsyncHandler(publicationController.update)
)

publicationRouter.put(
    '/:id/change-status',
    expressAsyncHandler(publicationController.updateStatus)
)

publicationRouter.delete(
    '/:id/delete',
    expressAsyncHandler(publicationController.delete)
)

export default publicationRouter
