import { IPublicationCategoryRepository } from '@app/publication/domain/repository/IPublicationCategoryRepository'
import { GetPublicationCategoryCollectionQuery } from '@app/publication/application/use-cases/query/GetPublicationCategoryCollectionQuery'

export class GetPublicationCategoryCollectionHandler {
    constructor(private repository: IPublicationCategoryRepository) {}

    handle(query: GetPublicationCategoryCollectionQuery): Promise<any[]> {
        // return this.repository.collection(query.query)
        return Promise.resolve(['hello', 'ni hao', 'konnichiwa'])
    }
}
