import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { AuthorController } from '../controller/AuthorController'

const authorController = new AuthorController()

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
