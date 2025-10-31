import { GetAuthorQuery } from '../../use-cases/query/GetAuthorQuery'
import { IAuthorRepository } from '../../../core/repository/IAuthorRepository'
import { Author } from '../../../core/entity/Author'

export class GetAuthorHandler {
    constructor(private repository: IAuthorRepository) {}

    handle(query: GetAuthorQuery): Promise<Author | null> {
        return this.repository.findById(query.authorId)
    }
}
