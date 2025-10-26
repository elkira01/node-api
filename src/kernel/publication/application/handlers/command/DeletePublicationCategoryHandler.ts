import { IPublicationCategoryRepository } from '@app/publication/domain/repository/IPublicationCategoryRepository'
import { DeletePublicationCategoryCommand } from '@app/publication/application/use-cases/command/DeletePublicationCategoryCommand'

export class DeletePublicationCategoryHandler {
    constructor(private repository: IPublicationCategoryRepository) {}

    async handle(command: DeletePublicationCategoryCommand): Promise<void> {
        await this.repository.delete(command.categoryId)
    }
}
