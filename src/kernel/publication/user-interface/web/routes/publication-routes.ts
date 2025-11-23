import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { PublicationController } from '../controller/PublicationController'
import { servicesBindings } from '../../../../../infrastructure/config/services-bindings'

const publicationController = new PublicationController(
    servicesBindings.publication.get('IPublicationCollection'),
    servicesBindings.publication.get('IPublicationReadModel')
)

const publicationRouter = express.Router()

publicationRouter.get(
    '/collection',
    expressAsyncHandler(publicationController.getAll)
)

publicationRouter.get(
    '/collection/category/:categoryId',
    expressAsyncHandler(publicationController.getByCategory)
)

publicationRouter.get(
    '/for-select',
    expressAsyncHandler(publicationController.getAllForSelect)
)

publicationRouter.post(
    '/create',
    expressAsyncHandler(publicationController.create)
)

publicationRouter.get(
    '/:id/:publicationType',
    expressAsyncHandler(publicationController.getOne)
)

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
