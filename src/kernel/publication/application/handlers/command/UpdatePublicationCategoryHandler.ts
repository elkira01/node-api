import { IPublicationCategoryRepository } from '@app/publication/domain/repository/IPublicationCategoryRepository'
import { PublicationCategory } from '@app/publication/domain/entity/PublicationCategory'
import { UpdatePublicationCategoryCommand } from '@app/publication/application/use-cases/command/UpdatePublicationCategoryCommand'

export class UpdatePublicationCategoryHandler {
    constructor(private repository: IPublicationCategoryRepository) {}

    handle(command: UpdatePublicationCategoryCommand): Promise<void> {
        const publicationCategory = new PublicationCategory(
            command.categoryId,
            command.designation,
            command.imageUrl,
            command.description
        )
        return this.repository.update(publicationCategory)
    }
}
