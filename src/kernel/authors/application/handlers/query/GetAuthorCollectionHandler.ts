import { IAuthorRepository } from '@app/authors/core/repository/IAuthorRepository'
import { GetAuthorCollectionQuery } from '../../use-cases/query/GetAuthorCollectionQuery'

export class GetAuthorCollectionHandler {
    constructor(private repository: IAuthorRepository) {}

    handle(query: GetAuthorCollectionQuery): Promise<any[]> {
        return this.repository.collection(query)
    }
}
