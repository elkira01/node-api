import { IAuthorRepository } from '@app/authors/core/repository/IAuthorRepository'
import { Author } from '@app/authors/core/entity/Author'
import { CreateAuthorCommand } from '../../use-cases/command/CreateAuthorCommand'

export class CreateAuthorHandler {
    constructor(private repository: IAuthorRepository) {}

    handle(command: CreateAuthorCommand): Promise<any> {
        const author = new Author(
            null,
            command.type,
            command.firstName,
            command.lastName,
            command.biography,
            command.email,
            command.profileImageUrl
        )
        return this.repository.create(author)
    }
}
