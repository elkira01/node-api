import { IPublicationCategoryRepository } from '../../../../domain/repository/IPublicationCategoryRepository'
import { DeletePublicationCategoryCommand } from '../../../use-cases/command/category/DeletePublicationCategoryCommand'

export class DeletePublicationCategoryHandler {
    constructor(private repository: IPublicationCategoryRepository) {}

    async handle(command: DeletePublicationCategoryCommand): Promise<void> {
        await this.repository.delete(command.categoryId)
    }
}
