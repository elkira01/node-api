import express from 'express'
import expressAsyncHandler from 'express-async-handler'

import { AuthorController } from '@app/authors/user-interface/controller/AuthorController'

const categoryController = new AuthorController()

const authorRouter = express.Router()

authorRouter.get('/collection', expressAsyncHandler(categoryController.getAll))

authorRouter.post('/create', expressAsyncHandler(categoryController.create))

authorRouter.get('/:id', expressAsyncHandler(categoryController.getOne))

authorRouter.patch(
    '/:id/update',
    expressAsyncHandler(categoryController.update)
)

authorRouter.delete(
    '/:id/delete',
    expressAsyncHandler(categoryController.delete)
)

export default authorRouter
