import { IAuthorRepository } from '@app/authors/core/repository/IAuthorRepository'
import { DeleteAuthorCommand } from '../../use-cases/command/DeleteAuthorCommand'

export class DeleteAuthorHandler {
    constructor(private repository: IAuthorRepository) {}

    async handle(command: DeleteAuthorCommand): Promise<void> {
        await this.repository.delete(command.authorId)
    }
}
