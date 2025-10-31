import { GetAuthorCollectionQuery } from '../../use-cases/query/GetAuthorCollectionQuery'
import { IAuthorRepository } from '../../../core/repository/IAuthorRepository'

export class GetAuthorCollectionHandler {
    constructor(private repository: IAuthorRepository) {}

    handle(query: GetAuthorCollectionQuery): Promise<any[]> {
        return this.repository.collection(query)
    }
}
