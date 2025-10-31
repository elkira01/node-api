import { Request, Response } from 'express'
import { AppAbstractController } from '../../../../shared-kernel/user-interface/controller/AppAbstractController'
import { GetAuthorCollectionQuery } from '../../application/use-cases/query/GetAuthorCollectionQuery'
import { GetAuthorQuery } from '../../application/use-cases/query/GetAuthorQuery'
import { CreateAuthorCommand } from '../../application/use-cases/command/CreateAuthorCommand'
import { UpdateAuthorCommand } from '../../application/use-cases/command/UpdateAuthorCommand'
import { DeleteAuthorCommand } from '../../application/use-cases/command/DeleteAuthorCommand'

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

        const author = await this.handleQuery(new GetAuthorQuery(resourceId))

        res.status(200).json({
            id: author.getId(),
            firstName: author.getFirstName(),
            lastName: author.getLastName(),
            biography: author.getBiography(),
            profileImage: author.getProfileImageUrl(),
            email: author.getEmail(),
            createdAt: author.getCreatedAt(),
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
