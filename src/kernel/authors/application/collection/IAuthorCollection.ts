import { GetAuthorCollectionQuery } from '../use-cases/query/GetAuthorCollectionQuery'
import { AuthorSelectViewModel } from '../view-models/AuthorSelectViewModel'
import { AuthorCollectionViewModel } from '../view-models/AuthorCollectionViewModel'

export interface IAuthorCollection {
    collection(
        query: GetAuthorCollectionQuery
    ): Promise<AuthorCollectionViewModel[]>
    collectionForSelect(
        query: GetAuthorCollectionQuery
    ): Promise<AuthorSelectViewModel[]>
}
