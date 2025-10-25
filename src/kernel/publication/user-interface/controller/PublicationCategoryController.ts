import { AppAbstractController } from '@shared/user-interface/controller/AppAbstractController'
import { GetPublicationCategoryCollectionQuery } from '@app/publication/application/use-cases/query/GetPublicationCategoryCollectionQuery'
import { Request, Response } from 'express'

export class PublicationCategoryController extends AppAbstractController {
    constructor() {
        super()
    }

    getAll = this.asyncHandler(async (req: Request, res: Response) => {
        const categories = await this.handleQuery(
            new GetPublicationCategoryCollectionQuery({ page: 1, limit: 10 })
        )
        res.json(categories)
    })
}
