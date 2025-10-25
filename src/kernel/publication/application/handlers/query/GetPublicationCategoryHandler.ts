import { IPublicationCategoryRepository } from '@app/publication/domain/repository/IPublicationCategoryRepository'
import { GetPublicationCategoryQuery } from '@app/publication/application/use-cases/query/GetPublicationCategoryQuery'
import { PublicationCategory } from '@app/publication/domain/entity/PublicationCategory'

export class GetPublicationCategoryHandler {
    constructor(private repository: IPublicationCategoryRepository) {}

    handle(
        query: GetPublicationCategoryQuery
    ): Promise<PublicationCategory | null> {
        return this.repository.findById(query.categoryId)
    }
}
