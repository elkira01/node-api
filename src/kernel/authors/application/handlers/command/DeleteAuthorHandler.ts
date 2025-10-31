import { DeleteAuthorCommand } from '../../use-cases/command/DeleteAuthorCommand'
import { IAuthorRepository } from '../../../core/repository/IAuthorRepository'

export class DeleteAuthorHandler {
    constructor(private repository: IAuthorRepository) {}

    async handle(command: DeleteAuthorCommand): Promise<void> {
        await this.repository.delete(command.authorId)
    }
}
