import { IPublicationCategoryRepository } from '../../../core/repository/IPublicationCategoryRepository'
import { GetPublicationCategoryQuery } from '../../use-cases/query/GetPublicationCategoryQuery'
import { PublicationCategory } from '../../../core/entity/PublicationCategory'

export class GetPublicationCategoryHandler {
    constructor(private repository: IPublicationCategoryRepository) {}

    handle(
        query: GetPublicationCategoryQuery
    ): Promise<PublicationCategory | null> {
        return this.repository.findById(query.categoryId)
    }
}
