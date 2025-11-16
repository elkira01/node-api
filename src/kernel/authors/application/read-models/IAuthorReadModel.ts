import { GetAuthorQuery } from '../use-cases/query/GetAuthorQuery'
import { AuthorViewModel } from '../view-models/AuthorViewModel'

export interface IAuthorReadModel {
    viewAuthor(query: GetAuthorQuery): Promise<AuthorViewModel | null>
}
