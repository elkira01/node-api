import { IPublicationCategoryRepository } from '@app/publication/core/repository/IPublicationCategoryRepository'
import { CreatePublicationCategoryCommand } from '@app/publication/application/use-cases/command/CreatePublicationCategoryCommand'
import { PublicationCategory } from '@app/publication/core/entity/PublicationCategory'

export class CreatePublicationCategoryHandler {
    constructor(private repository: IPublicationCategoryRepository) {}

    handle(command: CreatePublicationCategoryCommand): Promise<any> {
        const publicationCategory = new PublicationCategory(
            null,
            command.designation,
            command.imageUrl,
            command.description
        )
        return this.repository.create(publicationCategory)
    }
}
