import { AppAbstractController } from '@shared/user-interface/controller/AppAbstractController'
import { GetPublicationCollectionQuery } from '@app/publication/application/use-cases/query/GetPublicationCollectionQuery'
import { Request, Response } from 'express'
import { CreatePublicationCommand } from '@app/publication/application/use-cases/command//CreatePublicationCommand'
import { UpdatePublicationCommand } from '@app/publication/application/use-cases/command//UpdatePublicationCommand'
import { DeletePublicationCommand } from '@app/publication/application/use-cases/command//DeletePublicationCommand'
import { GetPublicationQuery } from '@app/publication/application/use-cases/query/GetPublicationQuery'
import { ChangePublicationStatusCommand } from '@app/publication/application/use-cases/command/ChangePublicationStatusCommand'

export class PublicationController extends AppAbstractController {
    constructor() {
        super()
    }

    getAll = this.asyncHandler(async (req: Request, res: Response) => {
        const parsedQuery = this.parseCollectionQuery(req.query)
        const categories = await this.handleQuery(
            new GetPublicationCollectionQuery(
                parsedQuery.page,
                parsedQuery.limit,
                parsedQuery.q
            )
        )
        res.status(200).json(categories)
    })

    getOne = this.asyncHandler(async (req: Request, res: Response) => {
        const resourceId = req.params.id

        const publication = await this.handleQuery(
            new GetPublicationQuery(resourceId)
        )

        res.status(200).json({
            id: publication.getId(),
            title: publication.getTitle(),
            authorId: publication.getAuthorId(),
            categoryId: publication.getCategoryId(),
            type: publication.getPublicationType(),
            resume: publication.getResume(),
            coverImageUrl: publication.getCoverImageUrl(),
            contentFileUrl: publication.getContentFileUrl(),
            sellingPrice: publication.getSellingPrice(),
            rentalPrice: publication.getRentalPrice(),
            rentalPeriod: publication.getRentalPeriod(),
        })
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
