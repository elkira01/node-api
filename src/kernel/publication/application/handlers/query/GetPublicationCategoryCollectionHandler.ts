import { IPublicationCategoryRepository } from '../../../domain/repository/IPublicationCategoryRepository'
import { GetPublicationCategoryCollectionQuery } from '../../use-cases/query/GetPublicationCategoryCollectionQuery'

export class GetPublicationCategoryCollectionHandler {
    constructor(private repository: IPublicationCategoryRepository) {}

    handle(query: GetPublicationCategoryCollectionQuery): Promise<any[]> {
        return Promise.resolve([])
    }
}
