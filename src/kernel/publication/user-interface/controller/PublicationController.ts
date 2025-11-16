import { Request, Response } from 'express'
import { AppAbstractController } from '../../../../shared-kernel/user-interface/controller/AppAbstractController'
import { GetPublicationCollectionQuery } from '../../application/use-cases/query/GetPublicationCollectionQuery'
import { GetPublicationQuery } from '../../application/use-cases/query/GetPublicationQuery'
import { CreatePublicationCommand } from '../../application/use-cases/command/CreatePublicationCommand'
import { UpdatePublicationCommand } from '../../application/use-cases/command/UpdatePublicationCommand'
import { ChangePublicationStatusCommand } from '../../application/use-cases/command/ChangePublicationStatusCommand'
import { DeletePublicationCommand } from '../../application/use-cases/command/DeletePublicationCommand'
import { IPublicationCollection } from '../../application/collection/IPublicationCollection'
import { PublicationReadModelRepositoryImpl } from '../../infrastructure/persistence/PublicationReadModelRepositoryImpl'
import { PublicationType } from '../../domain/type/PublicationType'
import { GetPublicationCollectionByCategoryQuery } from '../../application/use-cases/query/GetPublicationCollectionByCategoryQuery'

export class PublicationController extends AppAbstractController {
    constructor(
        private publicationCollection: IPublicationCollection,
        private publicationReadModel: PublicationReadModelRepositoryImpl
    ) {
        super()
    }

    getAll = this.asyncHandler(async (req: Request, res: Response) => {
        const parsedQuery = this.parseCollectionQuery(req.query)
        const publication = await this.publicationCollection.collection(
            new GetPublicationCollectionQuery(
                parsedQuery.page,
                parsedQuery.limit,
                parsedQuery.q
            )
        )
        res.status(200).json(publication)
    })

    getByCategory = this.asyncHandler(async (req: Request, res: Response) => {
        const parsedQuery = this.parseCollectionQuery(req.query)
        const params = req.params

        const publication =
            await this.publicationCollection.collectionByCategory(
                new GetPublicationCollectionByCategoryQuery(
                    params?.categoryId,
                    parsedQuery.page,
                    parsedQuery.limit,
                    parsedQuery.q
                )
            )
        res.status(200).json(publication)
    })

    getAllForSelect = this.asyncHandler(async (req: Request, res: Response) => {
        const parsedQuery = this.parseCollectionQuery(req.query)
        const publication =
            await this.publicationCollection.collectionForSelect(
                new GetPublicationCollectionQuery(
                    parsedQuery.page,
                    parsedQuery.limit,
                    parsedQuery.q
                )
            )
        res.status(200).json(publication)
    })

    getOne = this.asyncHandler(async (req: Request, res: Response) => {
        const resourceId = req.params.id
        const resourceType = req.params.publicationType

        const publication =
            resourceType.toUpperCase() == PublicationType.BOOK
                ? await this.publicationReadModel.viewBook(
                      new GetPublicationQuery(resourceId)
                  )
                : await this.publicationReadModel.viewMagazine(
                      new GetPublicationQuery(resourceId)
                  )

        res.status(200).json(publication)
    })

    create = this.asyncHandler(async (req: Request, res: Response) => {
        const data = req.body

        const resp = await this.handleCommand(
            new CreatePublicationCommand(
                data.type,
                data.title,
                data.authorId,
                data.categoryId,
                data.resume,
                data.coverImageUrl,
                data.contentFileUrl,
                data.sellingPrice,
                data.rentalPrice,
                data.rentalPeriod
            )
        )
        res.status(201).json({ id: resp })
    })

    update = this.asyncHandler(async (req: Request, res: Response) => {
        const data = req.body
        const resourceId = req.params.id

        await this.handleCommand(
            new UpdatePublicationCommand(
                resourceId,
                data.title,
                data.authorId,
                data.categoryId,
                data.resume,
                data.coverImageUrl,
                data.contentFileUrl,
                data.sellingPrice,
                data.rentalPrice,
                data.rentalPeriod
            )
        )

        res.status(204).json()
    })

    updateStatus = this.asyncHandler(async (req: Request, res: Response) => {
        const data = req.body
        const resourceId = req.params.id

        await this.handleCommand(
            new ChangePublicationStatusCommand(resourceId, data.status)
        )

        res.status(204).json()
    })

    delete = this.asyncHandler(async (req: Request, res: Response) => {
        const resourceId = req.params.id

        await this.handleCommand(new DeletePublicationCommand(resourceId))

        res.status(204).json()
    })
}
