import { GetAuthorCollectionQuery } from '../../use-cases/query/GetAuthorCollectionQuery'
import { AuthorEntityRepositoryImpl } from '../../../infrastructure/persistence/AuthorEntityRepositoryImpl'

export class GetAuthorCollectionHandler {
    constructor(private repository: any) {
        this.repository = new AuthorEntityRepositoryImpl()
    }

    handle(query: GetAuthorCollectionQuery): Promise<any[]> {
        return this.repository.collection(query)
    }
}
