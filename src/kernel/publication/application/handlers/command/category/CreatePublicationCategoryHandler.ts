import { IPublicationCategoryRepository } from '../../../../domain/repository/IPublicationCategoryRepository'
import { CreatePublicationCategoryCommand } from '../../../use-cases/command/category/CreatePublicationCategoryCommand'
import { PublicationCategory } from '../../../../domain/entity/PublicationCategory'

export class CreatePublicationCategoryHandler {
    constructor(private repository: IPublicationCategoryRepository) {}

    handle(command: CreatePublicationCategoryCommand): Promise<any> {
        const publicationCategory = new PublicationCategory(
            null,
            command.designation,
            command.imageUrl,
            command.description
        )
        return this.repository.save(publicationCategory)
    }
}
