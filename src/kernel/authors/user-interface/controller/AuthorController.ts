import { AppAbstractController } from '@shared/user-interface/controller/AppAbstractController'
import { Request, Response } from 'express'
import { GetAuthorCollectionQuery } from '@app/authors/application/use-cases/query/GetAuthorCollectionQuery'
import { GetAuthorQuery } from '@app/authors/application/use-cases/query/GetAuthorQuery'
import { CreateAuthorCommand } from '@app/authors/application/use-cases/command/CreateAuthorCommand'
import { UpdateAuthorCommand } from '@app/authors/application/use-cases/command/UpdateAuthorCommand'
import { DeleteAuthorCommand } from '@app/authors/application/use-cases/command/DeleteAuthorCommand'

export class AuthorController extends AppAbstractController {
    constructor() {
        super()
    }

    getAll = this.asyncHandler(async (req: Request, res: Response) => {
        const parsedQuery = this.parseCollectionQuery(req.query)
        const categories = await this.handleQuery(
            new GetAuthorCollectionQuery(
                parsedQuery.page,
                parsedQuery.limit,
                parsedQuery.q
            )
        )
        res.status(200).json(categories)
    })

    getOne = this.asyncHandler(async (req: Request, res: Response) => {
        const resourceId = req.params.id

        const category = await this.handleQuery(new GetAuthorQuery(resourceId))

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
            new CreateAuthorCommand(
                data.firstName,
                data.lastName,
                data.type,
                data.biography,
                data.profileImageUrl,
                data.email
            )
        )
        res.status(201).json({ id: resp })
    })

    update = this.asyncHandler(async (req: Request, res: Response) => {
        const data = req.body
        const resourceId = req.params.id

        await this.handleCommand(
            new UpdateAuthorCommand(
                resourceId,
                data.firstName,
                data.lastName,
                data.type,
                data.biography,
                data.profileImageUrl,
                data.email
            )
        )

        res.status(204).json()
    })

    delete = this.asyncHandler(async (req: Request, res: Response) => {
        const resourceId = req.params.id

        await this.handleCommand(new DeleteAuthorCommand(resourceId))

        res.status(204).json()
    })
}
