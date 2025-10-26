import { AppAbstractController } from '@shared/user-interface/controller/AppAbstractController'
import { GetPublicationCategoryCollectionQuery } from '@app/publication/application/use-cases/query/GetPublicationCategoryCollectionQuery'
import { Request, Response } from 'express'
import { CreatePublicationCategoryCommand } from '@app/publication/application/use-cases/command/CreatePublicationCategoryCommand'

export class PublicationCategoryController extends AppAbstractController {
    constructor() {
        super()
    }

    getAll = this.asyncHandler(async (req: Request, res: Response) => {
        const categories = await this.handleQuery(
            new GetPublicationCategoryCollectionQuery({ page: 1, limit: 10 })
        )
        res.status(200).json(categories)
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
}
