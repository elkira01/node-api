import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { AuthorController } from '../controller/AuthorController'
import { servicesBindings } from '../../../../infrastructure/config/services-bindings'

const authorController = new AuthorController(
    servicesBindings.author.get('IPublicationCollection'),
    servicesBindings.author.get('IPublicationReadModel')
)

const authorRouter = express.Router()

authorRouter.get('/collection', expressAsyncHandler(authorController.getAll))

authorRouter.post('/create', expressAsyncHandler(authorController.create))

authorRouter.get('/:id', expressAsyncHandler(authorController.getOne))

authorRouter.get(
    '/email/:email',
    expressAsyncHandler(authorController.getByEmail)
)

authorRouter.patch('/:id/update', expressAsyncHandler(authorController.update))

authorRouter.delete('/:id/delete', expressAsyncHandler(authorController.delete))

export default authorRouter
