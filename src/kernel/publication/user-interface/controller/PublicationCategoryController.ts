import { AppAbstractController } from '@shared/user-interface/controller/AppAbstractController'
import { GetPublicationCategoryCollectionQuery } from '@app/publication/application/use-cases/query/GetPublicationCategoryCollectionQuery'
import { Request, Response } from 'express'
import { CreatePublicationCategoryCommand } from '@app/publication/application/use-cases/command/CreatePublicationCategoryCommand'
import { UpdatePublicationCategoryCommand } from '@app/publication/application/use-cases/command/UpdatePublicationCategoryCommand'
import { DeletePublicationCategoryCommand } from '@app/publication/application/use-cases/command/DeletePublicationCategoryCommand'
import { GetPublicationCategoryQuery } from '@app/publication/application/use-cases/query/GetPublicationCategoryQuery'

export class PublicationCategoryController extends AppAbstractController {
    constructor() {
        super()
    }

    getAll = this.asyncHandler(async (req: Request, res: Response) => {
        const parsedQuery = this.parseCollectionQuery(req.query)
        const categories = await this.handleQuery(
            new GetPublicationCategoryCollectionQuery(
                parsedQuery.page,
                parsedQuery.limit,
                parsedQuery.q
            )
        )
        res.status(200).json(categories)
    })

    getOne = this.asyncHandler(async (req: Request, res: Response) => {
        const resourceId = req.params.id

        const category = await this.handleQuery(
            new GetPublicationCategoryQuery(resourceId)
        )

        res.status(200).json({
            id: category.getId(),
            designation: category.getDesignation(),
            imageUrl: category.getImageUrl(),
            description: category.getDescription(),
            createdAt: category.getCreatedAt(),
            updatedAt: category.getUpdatedAt(),
        })
    })

    create = this.asyncHandler(async (req: Request, res: Response) => {
        const data = req.body

        const resp = await this.handleCommand(
            new CreatePublicationCategoryCommand(
                data.designation,
                data.imageUrl,
                data.description
            )
        )
        res.status(201).json({ id: resp })
    })

    update = this.asyncHandler(async (req: Request, res: Response) => {
        const data = req.body
        const resourceId = req.params.id

        await this.handleCommand(
            new UpdatePublicationCategoryCommand(
                resourceId,
                data.designation,
                data.imageUrl,
                data.description
            )
        )

        res.status(204).json()
    })

    delete = this.asyncHandler(async (req: Request, res: Response) => {
        const resourceId = req.params.id

        await this.handleCommand(
            new DeletePublicationCategoryCommand(resourceId)
        )

        res.status(204).json()
    })
}
