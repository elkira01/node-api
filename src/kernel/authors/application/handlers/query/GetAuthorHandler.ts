import { IAuthorRepository } from '@app/authors/core/repository/IAuthorRepository'
import { GetAuthorQuery } from '../../use-cases/query/GetAuthorQuery'
import { Author } from '@app/authors/core/entity/Author'

export class GetAuthorHandler {
    constructor(private repository: IAuthorRepository) {}

    handle(query: GetAuthorQuery): Promise<Author | null> {
        return this.repository.findById(query.authorId)
    }
}
