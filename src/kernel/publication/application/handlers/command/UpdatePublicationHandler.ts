import { IPublicationRepository } from '../../../core/repository/IPublicationRepository'
import { UpdatePublicationCommand } from '../../use-cases/command/UpdatePublicationCommand'
import { Publication } from '../../../core/entity/Publication'

export class UpdatePublicationHandler {
    constructor(private repository: IPublicationRepository) {}

    async handle(command: UpdatePublicationCommand): Promise<void> {
        const publication = await this.repository.findById(
            command.publicationId
        )

        if (!(publication instanceof Publication)) {
            throw new Error(
                `Publication with id ${command.publicationId} not found`
            )
        }

        const updated = new Publication(
            publication.getId(),
            command.title,
            command.authorId,
            command.categoryId,
            publication.getPublicationType(),
            command.resume,
            command.coverImageUrl,
            command.contentFileUrl,
            command.sellingPrice,
            command.rentalPrice,
            command.rentalDuration
        )

        await this.repository.update(updated)
    }
}
