import { IPublicationCategoryRepository } from '@app/publication/domain/repository/IPublicationCategoryRepository'
import { PublicationCategory } from '@app/publication/domain/entity/PublicationCategory'
import { UpdatePublicationCategoryCommand } from '@app/publication/application/use-cases/command/UpdatePublicationCategoryCommand'

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

        await this.repository.update(publicationCategory)
    }
}
