import { GetAuthorQuery } from '../use-cases/query/GetAuthorQuery'
import { AuthorViewModel } from '../view-models/AuthorViewModel'

export interface IAuthorReadModel {
    getAuthor(query: GetAuthorQuery): Promise<AuthorViewModel | null>
}
