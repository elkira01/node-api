import { CreatePublicationCommand } from '../../use-cases/command/CreatePublicationCommand'
import { IPublicationRepository } from '../../../core/repository/IPublicationRepository'
import { Publication } from '../../../core/entity/Publication'

export class CreatePublicationHandler {
    constructor(private repository: IPublicationRepository) {}

    handle(command: CreatePublicationCommand): Promise<any> {
        const publication = new Publication(
            null,
            command.title,
            command.authorId,
            command.categoryId,
            command.publicationType,
            command.resume,
            command.coverImageUrl,
            command.contentFileUrl,
            command.sellingPrice,
            command.rentalPrice,
            command.rentalDuration
        )
        return this.repository.create(publication)
    }
}
