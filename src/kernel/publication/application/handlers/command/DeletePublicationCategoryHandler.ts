import { IPublicationCategoryRepository } from '@app/publication/domain/repository/IPublicationCategoryRepository'
import { DeletePublicationCategoryCommand } from '@app/publication/application/use-cases/command/DeletePublicationCategoryCommand'

export class DeletePublicationCategoryHandler {
    constructor(private repository: IPublicationCategoryRepository) {}

    handle(command: DeletePublicationCategoryCommand): Promise<any> {
        return this.repository.delete(command.categoryId)
    }
}
