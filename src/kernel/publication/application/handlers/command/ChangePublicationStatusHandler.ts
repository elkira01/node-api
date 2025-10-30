import { IPublicationRepository } from '@app/publication/core/repository/IPublicationRepository'
import { Publication } from '@app/publication/core/entity/Publication'
import { ChangePublicationStatusCommand } from '../../use-cases/command/ChangePublicationStatusCommand'

export class ChangePublicationStatusHandler {
    constructor(private repository: IPublicationRepository) {}

    async handle(command: ChangePublicationStatusCommand): Promise<void> {
        const publication = await this.repository.findById(
            command.publicationId
        )

        if (!(publication instanceof Publication)) {
            throw new Error(
                `Publication with id ${command.publicationId} not found`
            )
        }

        publication.setStatus(command.status)

        await this.repository.update(publication)
    }
}
