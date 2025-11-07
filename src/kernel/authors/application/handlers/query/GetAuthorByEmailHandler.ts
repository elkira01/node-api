import { IAuthorRepository } from '../../../core/repository/IAuthorRepository'
import { Author } from '../../../core/entity/Author'
import { GetAuthorByEmailQuery } from '../../use-cases/query/GetAuthorByEmailQuery'

export class GetAuthorByEmailHandler {
    constructor(private repository: IAuthorRepository) {}

    handle(query: GetAuthorByEmailQuery): Promise<Author | null> {
        return this.repository.find('email', query.authorEmail)
    }
}
