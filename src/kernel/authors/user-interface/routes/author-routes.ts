import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { AuthorController } from '../controller/AuthorController'
import { ControllerBuilderFactory } from '../../../../shared-kernel/user-interface/controller/ControllerBuilderFactory'
import { BuildType } from '../../../../core/types/utilities'
import { IAuthorCollection } from '../../application/collection/IAuthorCollection'
import { IAuthorReadModel } from '../../application/read-models/IAuthorReadModel'

const authorController =
    ControllerBuilderFactory.build<
        BuildType<IAuthorCollection, BuildType<IAuthorReadModel>>
    >(AuthorController)

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
