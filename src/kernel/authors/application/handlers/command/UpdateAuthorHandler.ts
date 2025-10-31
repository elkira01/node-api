import { UpdateAuthorCommand } from '../../use-cases/command/UpdateAuthorCommand'
import { IAuthorRepository } from '../../../core/repository/IAuthorRepository'
import { Author } from '../../../core/entity/Author'

export class UpdateAuthorHandler {
    constructor(private repository: IAuthorRepository) {}

    async handle(command: UpdateAuthorCommand): Promise<void> {
        const author = await this.repository.findById(command.authorId)

        if (!(author instanceof Author)) {
            throw Error(`Category with id ${command.authorId} not found`)
        }

        author.setFirstName(command.firstName)
        author.setLastName(command.lastName)
        author.setBiography(command.biography)
        author.setEmail(command.email)
        author.setProfileImageUrl(command.profileImageUrl)
        author.setType(command.type)

        await this.repository.update(author)
    }
}
