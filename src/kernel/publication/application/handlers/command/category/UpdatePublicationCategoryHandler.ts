import { IPublicationCategoryRepository } from '../../../../domain/repository/IPublicationCategoryRepository'
import { UpdatePublicationCategoryCommand } from '../../../use-cases/command/category/UpdatePublicationCategoryCommand'
import { PublicationCategory } from '../../../../domain/entity/PublicationCategory'

export class UpdatePublicationCategoryHandler {
    constructor(private repository: IPublicationCategoryRepository) {}

    async handle(command: UpdatePublicationCategoryCommand): Promise<void> {
        const publicationCategory = await this.repository.findById(
            command.categoryId
        )

        if (!(publicationCategory instanceof PublicationCategory)) {
            throw Error(`Category with id ${command.categoryId} not found`)
        }

        publicationCategory.setDesignation(command.designation)
        publicationCategory.setImageUrl(command.imageUrl)
        publicationCategory.setDescription(command.description)

        await this.repository.save(publicationCategory)
    }
}
