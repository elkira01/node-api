import { CreateAuthorCommand } from '../../use-cases/command/CreateAuthorCommand'
import { IAuthorRepository } from '../../../core/repository/IAuthorRepository'
import { Author } from '../../../core/entity/Author'

export class CreateAuthorHandler {
    constructor(private repository: IAuthorRepository) {}

    async handle(command: CreateAuthorCommand): Promise<any> {
        const author = new Author(
            null,
            command.type,
            command.firstName,
            command.lastName,
            command.biography,
            command.email,
            command.profileImageUrl
        )
        await this.repository.save(author)

        return author.getId()
    }
}
