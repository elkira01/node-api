import { IPublicationCategoryRepository } from '@app/publication/core/repository/IPublicationCategoryRepository'
import { GetPublicationCategoryCollectionQuery } from '@app/publication/application/use-cases/query/GetPublicationCategoryCollectionQuery'

export class GetPublicationCategoryCollectionHandler {
    constructor(private repository: IPublicationCategoryRepository) {}

    handle(query: GetPublicationCategoryCollectionQuery): Promise<any[]> {
        return this.repository.collection(query)
    }
}
